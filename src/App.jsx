import { useState, useRef } from "react";

import UploadEditor from "./components/UploadEditor"

const App = () => {
  const [file, setFile] = useState(null);
  const [filters, setFilters] = useState({
    blur: 0,
    saturation: 100,
    brightness: 100,
    contrast: 100,
    sepia: 0,
  });

  const canvasRef = useRef(null);

  const onDrop = (newFile) => {
    setFile(newFile);
  };

  const onSliderChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const onDownload = async (blob) => {
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

  return (
    <UploadEditor
      file={file}
      filters={filters}
      canvasRef={canvasRef}
      onDrop={onDrop}
      onDownload={onDownload}
      onSliderChange={onSliderChange}
    />
  )
}

export default App;
