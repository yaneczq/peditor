/* eslint-disable react/prop-types */
import { InputWithLabel } from './InputWithLabel/InputWithLabel';
import { convertFiltersToString } from "../../utils/convertFiltersToString";

export const EditorControllers = ({ file, filters, canvasRef, onSliderChange, onDownload }) => {
  const onDownloadHandler = async () => {
    if (!file) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();

    image.src = URL.createObjectURL(file);
    image.onload = async () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.filter = convertFiltersToString(filters);

      ctx.drawImage(image, 0, 0);

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpg"));

      onDownload(blob);
    };
  };

  return (
    <div className="slider-container">
      <InputWithLabel
        name="blur"
        unit="px"
        min="0"
        max="20"
        value={filters.blur}
        onChange={onSliderChange}
      />
      <InputWithLabel
        name="saturation"
        unit="%"
        min="0"
        max="200"
        value={filters.saturation}
        onChange={onSliderChange}
      />
      <InputWithLabel
        name="brightness"
        unit="%"
        min="0"
        max="200"
        value={filters.brightness}
        onChange={onSliderChange}
      />
      <InputWithLabel
        name="contrast"
        unit="%"
        min="0"
        max="200"
        value={filters.contrast}
        onChange={onSliderChange}
      />
      <InputWithLabel
        name="sepia"
        unit="%"
        min="0"
        max="200"
        value={filters.sepia}
        onChange={onSliderChange}
      />
    <button className="download-btn" onClick={onDownloadHandler}>Download</button>
  </div>
  );
};
