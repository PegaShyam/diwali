import React from "react";

/*
  Balloon visual component.
  Props:
    - color, onPop, style (for left/delay)
*/
export default function Balloon({ color = "#FF5C8A", onPop, style = {} }) {
  return (
    <div
      onClick={onPop}
      className="absolute bottom-0 w-12 h-16 rounded-xl flex items-center justify-center cursor-pointer"
      style={style}
    >
      <div
        style={{
          width: 46,
          height: 60,
          borderRadius: "50% 50% 45% 45% / 55% 55% 45% 45%",
          background: color,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        }}
      >
        <div style={{ width: 2, height: 40, background: "#333", marginBottom: -6 }} />
      </div>
    </div>
  );
}
