import React, { useEffect, useRef, useState } from "react";

/*
  Simple audio controller that loads a source and allows play/pause.
  Each lightbox instance will mount this component and pass src.
*/
export default function AudioController({ src }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    setPlaying(false);
    if (src) a.src = src;
  }, [src]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        // playback prevented by browser autoplay rules
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button onClick={toggle} className="cursor-pointer px-3 py-2 rounded bg-funky-500 text-white">
        {playing ? "🔇 Stop Laughing" : "🔊 Laugh"}
      </button>
      <audio ref={audioRef} />
    </div>
  );
}
