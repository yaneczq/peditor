/* eslint-disable react/prop-types */
import { useState } from "react";
import Dropzone from "react-dropzone";

export const EditorDropzone = ({ onDrop }) => {
  const [error, setError] = useState("");

  const onDropHandler = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError("Unsupported file format. Please upload an image.");
      return;
    }
    
    setError("");
    onDrop(acceptedFiles[0]);
  };

  return (
    <Dropzone
      onDrop={onDropHandler}
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
  );
};
