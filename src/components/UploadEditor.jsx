import { useState, useRef } from "react";
import Dropzone from "react-dropzone";
import "./styles.scss";

const UploadEditor = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    blur: 0,
    saturation: 100,
    brightness: 100,
    contrast: 100,
    sepia: 0,
  });

  const canvasRef = useRef(null);

  const handleUpload = (acceptedFiles, rejectedFiles) => {
    setError("");

    // alidate image format
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/tiff', 'image/bmp'];
    const invalidFiles = acceptedFiles.filter(file => !validImageTypes.includes(file.type));
    
    if (invalidFiles.length > 0 || rejectedFiles.length > 0) {
      setError("Unsupported file format. Please upload an image.");
      return;
    }

    setFile(acceptedFiles[0]);
  };

  const handleSliderChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleDownload = async () => {
    if (!file) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();

    image.src = URL.createObjectURL(file);
    image.onload = async () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.filter = `
        blur(${filters.blur}px)
        saturate(${filters.saturation}%)
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        sepia(${filters.sepia}%)
      `;

      ctx.drawImage(image, 0, 0);

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpg"));

      const handle = await window.showSaveFilePicker({
        suggestedName: "edited-image.jpg",
        types: [
          {
            description: "JPG files",
            accept: { "image/jpg": [".jpg"] },
          },
        ],
      });

      const writableStream = await handle.createWritable();
      await writableStream.write(blob);
      await writableStream.close();
    };
  };

  return (
    <div className="master">
      <Dropzone
        onDrop={handleUpload}
        accept=".jpg,.jpeg,.png,.gif,.tiff,.bmp"
        minSize={1024}
        maxSize={3072000}
      >
        {({ getRootProps, getInputProps, isDragAccept, isDragReject, isDragActive }) => {
          const additionalClass = isDragAccept ? "accept" : isDragReject ? "reject" : "";

          return (
            <div className="dropfield">
              <div className="header">
                <h1>Upload Image</h1>
                <p>Available formats: jpg, jpeg, png, gif, tiff, bmp...</p>
              </div>

              <h2>Drag & Drop</h2>
              <div
                {...getRootProps({
                  className: `dropzone ${additionalClass} ${isDragActive ? "highlight" : ""}`,
                  })}
                  >
                <input {...getInputProps()} />
                <p>Drop Files Here...</p>
              </div>
              {error && <p className="error">{error}</p>}
            </div>
          );
        }}
      </Dropzone>
      {file && (
        <>
          <div className="editor-section">
            <div className="editor-display">
              <div className="info">
                <h4>File Uploaded Successfully!</h4>
                <p>Edit your photo using controls below.</p>
              </div>
              <img
                src={URL.createObjectURL(file)}
                className="image-container"
                alt="Uploaded file"
                style={{
                  filter: `
                    blur(${filters.blur}px)
                    saturate(${filters.saturation}%)
                    brightness(${filters.brightness}%)
                    contrast(${filters.contrast}%)
                    sepia(${filters.sepia}%)
                  `,
                }}
              />
              <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            </div>
            <div className="slider-container">
              {/* BLUR */}
              <label htmlFor="blur-slider"><p>Blur:</p> {filters.blur}px</label>
              <input
                type="range"
                id="blur-slider"
                name="blur"
                min="0"
                max="20"
                value={filters.blur}
                onChange={handleSliderChange}
              />
              {/* SATURATION */}
              <label htmlFor="saturation-slider"><p>Saturation:</p> {filters.saturation}%</label>
              <input
                type="range"
                id="saturation-slider"
                name="saturation"
                min="0"
                max="200"
                value={filters.saturation}
                onChange={handleSliderChange}
              />
              {/* BRIGHTNESS */}
              <label htmlFor="brightness-slider"><p>Brigthness:</p> {filters.brightness}%</label>
              <input
                type="range"
                id="brightness-slider"
                name="brightness"
                min="0"
                max="200"
                value={filters.brightness}
                onChange={handleSliderChange}
              />
              {/* CONTRAST */}
              <label htmlFor="contrast-slider"><p>Contrast:</p> {filters.contrast}%</label>
              <input
                type="range"
                id="contrast-slider"
                name="contrast"
                min="0"
                max="200"
                value={filters.contrast}
                onChange={handleSliderChange}
              />
              {/* SEPIA */}
              <label htmlFor="sepia-slider"><p>Sepia:</p> {filters.sepia}%</label>
              <input
                type="range"
                id="sepia-slider"
                name="sepia"
                min="0"
                max="100"
                value={filters.sepia}
                onChange={handleSliderChange}
              />
            </div>
            <button className="download-btn" onClick={handleDownload}>Download</button>
          </div>
        </>
      )}
    </div>
  );
};

export default UploadEditor;
