/* eslint-disable react/prop-types */
import { convertFiltersToString } from "../../utils/convertFiltersToString";

export const EditorSummary = ({
  file,
  filters,
  canvasRef,
}) => {
  return (
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
          filter: convertFiltersToString(filters),
        }}
      />
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};
