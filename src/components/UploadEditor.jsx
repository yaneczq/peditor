/* eslint-disable react/prop-types */
import { EditorDropzone } from './EditorDropzone/EditorDropzone';
import { EditorSummary } from './EditorSummary/EditorSummary';
import { EditorControllers } from './EditorControllers/EditorControllers';
import "./styles.scss";

const UploadEditor = ({
  file,
  filters,
  canvasRef,
  onDrop,
  onDownload,
  onSliderChange,
}) => {
  return (
    <div className="master">
      <EditorDropzone onDrop={onDrop} />
      {file && (
        <div className="editor-section">
          <EditorSummary
            file={file}
            filters={filters}
            canvasRef={canvasRef}
          />
          <EditorControllers
            file={file}
            filters={filters}
            canvasRef={canvasRef}
            onDownload={onDownload}
            onSliderChange={onSliderChange}
          />
        </div>
      )}
    </div>
  );
};

export default UploadEditor;
