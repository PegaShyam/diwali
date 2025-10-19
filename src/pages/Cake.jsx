import React, { useRef, useState, useEffect } from "react";
import Balloon from "../components/Balloon";
import celebrateAudio from "../assets/music/hbd.mp3";

export default function Cake() {
  const [blown, setBlown] = useState(false);
  const [balloons, setBalloons] = useState([]);
  const audioRef = useRef(null);

  // Mic references
  const [listening, setListening] = useState(false);
  const mediaRef = useRef(null);
  const analyserRef = useRef(null);
  const audioContextRef = useRef(null);
  const rafRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMic();
      if (audioRef.current) audioRef.current.pause();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Create balloons on blow
  const createBalloons = () => {
    const generated = Array.from({ length: 10 }).map((_, i) => ({
      id: `${Date.now()}-${i}`,
      left: `${Math.random() * 80 + 10}%`,
      delay: `${Math.random() * 1.5}s`,
      color: ["#FF5C8A", "#FFD56B", "#71FFC4", "#7AD0FF", "#CBA0FF"][i % 5],
    }));
    setBalloons(generated);
  };

  const blow = () => {
    if (blown) return;
    setBlown(true);
    createBalloons();
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  // Remove balloon when clicked
  const shootBalloon = (id) =>
    setBalloons((prev) => prev.filter((b) => b.id !== id));

  /** ✅ FIXED: Microphone blow detection **/
  const startMic = async () => {
    if (listening) return;
    try {
      // ✅ Must resume audio context after user action
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
      }
      await audioContextRef.current.resume();

      // ✅ Request audio stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRef.current = stream;

      const source = audioContextRef.current.createMediaStreamSource(stream);
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      analyserRef.current = analyser;
      setListening(true);

      const data = new Uint8Array(analyser.frequencyBinCount);

      // ✅ Pulse detection loop
      const detect = () => {
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          const v = data[i] - 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / data.length);

        // ✅ Lower threshold for better sensitivity
        if (rms > 8) {
          blow();
          stopMic();
          return;
        }

        rafRef.current = requestAnimationFrame(detect);
      };

      // ✅ Allow stabilization
      setTimeout(() => detect(), 300);
    } catch (err) {
      console.error("Mic access error:", err);
      alert("Microphone access denied or unavailable.");
    }
  };

  const stopMic = () => {
    setListening(false);
    if (mediaRef.current) {
      mediaRef.current.getTracks().forEach((track) => track.stop());
      mediaRef.current = null;
    }
    if (analyserRef.current) analyserRef.current.disconnect();
    cancelAnimationFrame(rafRef.current);
  };

  return (
    <div className="max-w-4xl mx-auto text-center relative overflow-hidden">
      <h2 className="text-3xl font-extrabold mb-2">🎂 Happy Blockbuster DIWALI Friends!</h2>
      <p className="text-gray-400 mb-6">
        Blow out the candle (or press the button) to reveal the surprise.
      </p>

      {/* 🎂 Cake */}
      <div className="relative inline-block mt-20">
        <div className="w-64 mx-auto">
          <div className="relative bg-pink-300 h-14 rounded-t-[50%]"></div>

          <div className="h-28 rounded-b-[50%] bg-gradient-to-b from-pink-300 to-pink-500 shadow-lg relative">
            {/* Candle */}
            <div className="rotate-180 absolute -top-22 left-1/2 -translate-x-1/2">
              <div className="w-6 h-12 bg-gradient-to-t from-blue-500 to-blue-900 rounded-[5px] shadow-2xl"></div>
              {!blown && (
                <div className="w-4 h-4 bg-gradient-to-t from-yellow-300 to-orange-500 rounded-full candle-flame mx-auto"></div>
              )}
            </div>

            {/* Name */}
            <div className="absolute left-1/2 top-1/2 -translate-1/2">
              <p className="font-bold text-3xl text-white tracking-widest uppercase">
                Gautami
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔘 Controls */}
      <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
        <button
          onClick={blow}
          className={`px-6 py-2 rounded ${
            blown ? "bg-gray-400" : "bg-fuchsia-600"
          } text-white shadow`}
        >
          {blown ? "Candles Blown!" : "Blow Out Candle"}
        </button>
        <button
          onClick={() => (listening ? stopMic() : startMic())}
          className="px-6 py-2 rounded bg-white/20 border border-gray-500 text-gray-600 backdrop-blur"
        >
          {listening ? "🎤 Listening... Click to Stop" : "🎙 Use Microphone"}
        </button>
      </div>

      {/* 🎁 Greeting Card */}
      {blown && (
        <div className="mt-6 greeting-card reveal">
          <div className="mx-auto bg-white text-black rounded-2xl p-6 shadow-lg max-w-md">
            <h3 className="text-2xl font-bold">
              🎉 Happy Belated Birthday!🎉 <br /> Chandrashekar M B
            </h3>
            <p className="mt-2 text-gray-700">
              May your 24th year be filled with joy, love, and some really good fried chicken 🍗 with watermelon🍉 🎈 - p.s. kunal is also racist 🙂 
            </p>
          </div>
        </div>
      )}

      {/* 🎈 Balloons */}
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon"
          style={{ left: b.left, animationDelay: b.delay, background: b.color }}
          onClick={() => shootBalloon(b.id)}
        ></div>
      ))}

      <audio ref={audioRef} src={celebrateAudio} />
    </div>
  );
}
