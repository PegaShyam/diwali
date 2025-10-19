import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SlotMachine from "../components/SlotMachine";

export default function President() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [e, setE] = useState("");
  const [f, setF] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const navigate = useNavigate();

  const SECRET = { a: "Khalifa", b: "Rhoades", c: "Bhabhi", d:"Leone", e:"Sins" , f:"Boss"};

  const tryUnlock = () => {
    if (a.trim() === SECRET.a && b.trim() === SECRET.b && c.trim() === SECRET.c) {
      setUnlocked(true);
    } else {
      // fun shake animation could be added
      alert("Wrong combo — try again!");
    }
  };

  const onWin = () => {
    // little delay then navigate
    setTimeout(() => navigate("/gallery"), 600);
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-yellow-600 text-xl md:text-2xl font-extrabold mb-3">Welcome To</h2>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-3">🎰 Jackpot Hidi Illandre Maneg Nadi</h2>
      <p className="mb-6 text-gray-600">Enter the 6-part combo and pull the lever. Hit 7 7 7 to proceed.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input value={a} onChange={(e) => setA(e.target.value)} className="p-3 rounded-md border-2" placeholder="Fill in the blanks (Mia...)" />
        <input value={b} onChange={(e) => setB(e.target.value)} className="p-3 rounded-md border-2" placeholder="Fill in the blanks (Lana...)" />
        <input value={c} onChange={(e) => setC(e.target.value)} className="p-3 rounded-md border-2" placeholder="Fill in the blanks (Savita...)" />
        <input value={d} onChange={(e) => setD(e.target.value)} className="p-3 rounded-md border-2" placeholder="Fill in the blanks (Kunni...)" />
        <input value={e} onChange={(e) => setE(e.target.value)} className="p-3 rounded-md border-2" placeholder="Fill in the blanks (Jhonny...)" />
        <input value={f} onChange={(e) => setF(e.target.value)} className="p-3 rounded-md border-2" placeholder="Fill maado Jalgara! (D...)" />
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
        <button onClick={tryUnlock} className="cursor-pointer px-6 py-2 text-black bg-white/90 hover:text-white hover:bg-black border-2 border-white rounded shadow font-semibold transition-all duration-300">Unlock</button>
        <button onClick={() => { setA(""); setB(""); setC(""); setD(""); setE(""); setF(""); setUnlocked(false); }} className="cursor-pointer px-6 py-2 text-black bg-transparent hover:text-white hover:bg-black border-2 border-black rounded shadow font-semibold transition-all duration-300">Reset</button>
      </div>

      <div className="mt-6">
        {unlocked ? (
          <SlotMachine onWin={onWin} />
        ) : (
          <div className="text-sm text-gray-500">Unlock to reveal the slot machine lever</div>
        )}
      </div>

      <div className="mt-8 text-xs text-gray-400">
        Tip: correct combo is in code; replace secrets for production.
      </div>
    </div>
  );
}
