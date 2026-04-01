import { useEffect, useRef, useState } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import PreviewModal from "./PreviewModal";
import ImageCard from "./ImageCard";
import { getImages, saveImages } from "../utils/indexedDB"; 

export default function Gallery() {

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selected, setSelected] = useState([]);
  const [isDownloadingSelected, setIsDownloadingSelected] = useState(false);
  const [gridWidth, setGridWidth] = useState(0);

  const [source, setSource] = useState("network"); 

  const gridContainerRef = useRef(null);

  const COLUMN_COUNT = gridWidth < 640 ? 1 : gridWidth < 1024 ? 2 : 3;
  const CARD_WIDTH = Math.max(1, Math.floor(gridWidth / COLUMN_COUNT));
  const CARD_HEIGHT = 260;
  const GRID_HEIGHT = 600;

  // ✅ UPDATED: IndexedDB + API fallback
  useEffect(() => {
    const loadImages = async () => {
      try {
        const cached = await getImages();

        if (cached && cached.length > 0) {
          console.log("Loaded from IndexedDB");
          setImages(cached);
          setSource("cache");
        } else {
          console.log("Fetching from API");

          const res = await fetch("https://picsum.photos/v2/list?page=1&limit=100");
          const data = await res.json();

          setImages(data);
          setSource("network");

          await saveImages(data);
        }
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadImages();
  }, []);

  // Resize observer (unchanged)
  useEffect(() => {
    if (!gridContainerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const nextWidth = Math.floor(entries[0].contentRect.width);
      setGridWidth(nextWidth);
    });

    observer.observe(gridContainerRef.current);
    return () => observer.disconnect();
  }, []);

  const rowCount = Math.ceil(images.length / COLUMN_COUNT);
  const allSelected = images.length > 0 && selected.length === images.length;

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelected((prev) =>
      prev.length === images.length ? [] : images.map((img) => img.id)
    );
  };

  const downloadWithWorker = (url, fileName) => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(
        new URL("../worker/imageWorker.js", import.meta.url),
        { type: "module" }
      );

      worker.onmessage = (event) => {
        const objectUrl = event.data;
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = fileName;
        link.click();
        setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
        worker.terminate();
        resolve();
      };

      worker.onerror = (error) => {
        worker.terminate();
        reject(error);
      };

      worker.postMessage(url);
    });
  };

  const handleSingleDownload = (img) =>
    downloadWithWorker(img.download_url, `image-${img.id}.png`);

  const handleDownloadSelected = async () => {
    const selectedImages = images.filter((img) =>
      selected.includes(img.id)
    );

    if (selectedImages.length === 0) return;

    setIsDownloadingSelected(true);
    try {
      for (const img of selectedImages) {
        await downloadWithWorker(
          img.download_url,
          `image-${img.id}.png`
        );
      }
    } finally {
      setIsDownloadingSelected(false);
    }
  };

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * COLUMN_COUNT + columnIndex;
    const img = images[index];

    return (
      <div style={style} className="p-2">
        {img ? (
          <ImageCard
            img={img}
            onClick={() => setSelectedImage(img)}
            onSelect={() => toggleSelect(img.id)}
            onDownload={() => handleSingleDownload(img)}
            selected={selected.includes(img.id)}
          />
        ) : null}
      </div>
    );
  };

  return (
    <div className="p-4">

      <h1 className="text-2xl font-bold mb-4 text-center">
        Image Gallery
      </h1>

      <label className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={toggleSelectAll}
        />
        Select All
      </label>

      <div
        ref={gridContainerRef}
        className="border rounded overflow-hidden w-full"
      >
        {gridWidth > 0 && (
          <Grid
            columnCount={COLUMN_COUNT}
            columnWidth={CARD_WIDTH}
            height={GRID_HEIGHT}
            rowCount={rowCount}
            rowHeight={CARD_HEIGHT}
            width={gridWidth}
          >
            {Cell}
          </Grid>
        )}
      </div>

      <PreviewModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />

      {selected.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow flex justify-between">
          <span>{selected.length} selected</span>
          <button
            onClick={handleDownloadSelected}
            disabled={isDownloadingSelected}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            {isDownloadingSelected
              ? "Downloading..."
              : "Download Selected"}
          </button>
        </div>
      )}
    </div>
  );
}