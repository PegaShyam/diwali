import React, { useEffect } from "react";
import AudioController from "./AudioController";

export default function Lightbox({ items, startIndex = 0, onClose }) {
  const [index, setIndex] = React.useState(startIndex);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + items.length) % items.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length, onClose]);

  if (!items || !items.length) return null;
  const cur = items[index];

  const isVideo = cur.src.endsWith(".mp4") || cur.src.endsWith(".mov") || cur.src.endsWith(".webm");

  return (
    <div className="absolute inset-0 z-50 bg-gradient flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3 right-3 bg-black/50 text-white rounded-full flex items-center justify-center w-10 p-2"
        >
          <p className="w-full h-full">✕</p>
        </button>

        <div className="flex flex-col md:flex-row items-center gap-4 bg-transparent">
          <div className="flex-1 flex items-center justify-center">
            {isVideo ? (
              <video
                src={cur.src}
                controls
                autoPlay
                className="max-h-[80vh] object-contain rounded-md shadow-2xl"
              ></video>
            ) : (
              <img
                src={cur.src}
                alt={cur.caption}
                className="max-h-[80vh] object-contain rounded-md shadow-2xl"
              />
            )}
          </div>

          <div className="w-full md:w-80 lg:w-80 bg-black/80 p-4 rounded-md">
            <h3 className="text-white font-bold text-lg lg:text-2xl tracking-wider">{cur.caption}</h3>
            <p className="text-sm lg:text-xl text-white/80 mt-2">{cur.description || ""}</p>

            <div className="mt-4 space-x-2">
              <button onClick={() => setIndex((index - 1 + items.length) % items.length)} className="cursor-pointer px-3 py-2 bg-white/10 text-white rounded">Prev</button>
              <button onClick={() => setIndex((index + 1) % items.length)} className="cursor-pointer px-3 py-2 bg-white/10 text-white rounded">Next</button>
            </div>

            <div className="mt-4">
              {cur.audio && <AudioController src={cur.audio} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
