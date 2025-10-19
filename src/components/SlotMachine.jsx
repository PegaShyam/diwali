import React, { useState } from "react";

/*
  Simple slot machine component.
  - onWin(): called after showing 7-7-7 result
  - disabled: if true, spin is disabled
*/
export default function SlotMachine({ onWin, disabled }) {
  const [reels, setReels] = useState(["❓", "❓", "❓"]);
  const [spinning, setSpinning] = useState(false);

  const spin = async () => {
    if (disabled || spinning) return;
    setSpinning(true);
    const symbols = ["7", "🍒", "🔔", "⭐"];
    const steps = 18;
    for (let i = 0; i < steps; i++) {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
      await new Promise((r) => setTimeout(r, 50 + i * 12));
    }
    setReels(["7", "7", "7"]);
    setSpinning(false);
    setTimeout(() => onWin && onWin(), 350); // little delay to feel real
  };

  return (
    <div className="flex items-center gap-6 justify-center flex-col md:flex-row">
      <div className="bg-black/85 text-white px-6 py-4 rounded-lg flex gap-4 items-center">
        {reels.map((r, idx) => (
          <div key={idx} className="w-20 h-20 bg-white/5 border border-white/10 rounded-md flex items-center justify-center text-3xl font-bold">
            {r}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={spin}
          disabled={disabled}
          className={`cursor-pointer bg-black mt-3 transform ${spinning ? "scale-95" : "hover:-translate-y-0.5"} bg-funky-500 text-white px-5 py-2 rounded-md shadow-lg disabled:opacity-40`}
          aria-label="Nin Luck Test Maadu"
        >
          {spinning ? "Spinning..." : "Nin luck test maadoke, Click here"}
        </button>
        <div className="mt-2 text-xs text-gray-500">Pull to roll the jackpot</div>
      </div>
    </div>
  );
}
