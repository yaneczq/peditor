import { useState, useRef } from "react";
import Dropzone from "react-dropzone";
import "./styles.scss";

const UploadEditor = () => {
  const [file, setFile] = useState(null);
  const [filters, setFilters] = useState({
    blur: 0,
    saturation: 100,
    brightness: 100,
    contrast: 100,
    sepia: 0,
  });
  
  const canvasRef = useRef(null);

  const handleUpload = (acceptedFiles) => {
    console.log("logging drop/selected file", acceptedFiles);
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
      
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));

      const handle = await window.showSaveFilePicker({
        suggestedName: "edited-image.png",
        types: [
          {
            description: "PNG files",
            accept: { "image/png": [".png"] },
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
      <Dropzone onDrop={handleUpload} accept="image/*" minSize={1024} maxSize={3072000}>
        {({ getRootProps, getInputProps, isDragAccept, isDragReject }) => {
          const additionalClass = isDragAccept ? "accept" : isDragReject ? "reject" : "";

          return (
            <div className="dropfield">
              <div className="header">
                <h1>Upload Image</h1>
                <p>Available formats: jpg, png, tiff...</p>
              </div>

              <h2>Drag & Drop</h2>
              <div
                {...getRootProps({
                  className: `dropzone ${additionalClass}`,
                })}
              >
                <input {...getInputProps()} />
                <div className="upload-area">Drop Files Here...</div>
              </div>
              <p>Some example message maybe a credit to the Author</p>
            </div>
          );
        }}
      </Dropzone>
      {file && (
        <>
          <div className="editor-section">
            <div className="editor-display">
              <div className="info">
                <h4>File Uploaded Successfully</h4>
                <p>Edit your photo using controls on the right side</p>
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
            <div>
              <div className="slider-container">
                {/* BLUR */}
                <label htmlFor="blur-slider">Blur Amount: {filters.blur}px</label>
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
                <label htmlFor="saturation-slider">Saturation Amount: {filters.saturation}%</label>
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
                <label htmlFor="brightness-slider">Brightness Amount: {filters.brightness}%</label>
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
                <label htmlFor="contrast-slider">Contrast Amount: {filters.contrast}%</label>
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
                <label htmlFor="sepia-slider">Sepia Amount: {filters.sepia}%</label>
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
              <button onClick={handleDownload}>Download Edited Image</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UploadEditor;
