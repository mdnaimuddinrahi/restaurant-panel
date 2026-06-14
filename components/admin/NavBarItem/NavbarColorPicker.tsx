import React, { useEffect, useState } from 'react'

export default function NavbarColorPicker() {
    const [accentColor, setAccentColor] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("accentColor") || "#6366f1";
    setAccentColor(saved);
    applyAccent(saved);
  }, []);

  function applyAccent(color: string) {
    setAccentColor(color);
    localStorage.setItem("accentColor", color);

    document.documentElement.style.setProperty("--accent", color);
    document.documentElement.style.setProperty("--accent-light", color + "cc");
    document.documentElement.style.setProperty("--accent-dark", color);

    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    document.documentElement.style.setProperty(
      "--accent-subtle",
      `rgba(${r},${g},${b},0.1)`
    );

    document.documentElement.style.setProperty(
      "--accent-subtle-dark",
      `rgba(${r},${g},${b},0.2)`
    );
  }

  const accentColors = [
    '#6366f1','#8b5cf6','#ec4899','#ef4444','#f97316',
    '#eab308','#22c55e','#10b981','#14b8a6','#06b6d4',
    '#3b82f6','#64748b'
  ];
  return (
    <div className="relative" id="color-picker-wrap">
        <button id="color-picker-btn" className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" data-tooltip="Accent color">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
        </button>
        <div id="color-picker-dropdown" className="hidden absolute right-0 top-11 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-3 w-44 animate-slideDown z-50">
          <p className="text-xs font-600 text-slate-500 dark:text-slate-400 mb-2 font-display">Accent Color</p>
          <div className="grid grid-cols-4 gap-1" id="swatches">
            {accentColors.map((c) => (
            <div
              key={c}
              className={`swatch ${c === accentColor ? "selected" : ""}`}
              style={{ background: c }}
              onClick={() => applyAccent(c)}
              title={c}
            />
          ))}
          </div>
        </div>
    </div>
  )
}
