"use client";

import AppCustomButton from "@/components/ui/button/AppCustomButton";
import { hexToRgba, useTheme } from "@/theme";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiWorld } from "react-icons/bi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function NavbarLocalization() {
  const { i18n } = useTranslation();

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const languages = [
      {
        code: "en",
        label: "English",
        flag: "🇺🇸",
      },
      {
        code: "bd",
        label: "বাংলা",
        flag: "🇧🇩",
      },
    ] as const;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const savedLanguage =
      typeof window !== "undefined"
        ? localStorage.getItem("language") || "en"
        : "en";
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  const changeLanguage = (lng: (typeof languages)[number]["code"]) => {
    localStorage.setItem("language", lng);
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === i18n.language)?.label ?? "English";
  const { accentColor } = useTheme();
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      <AppCustomButton 
        variant="ghost"
        className="w-8 h-8"
        onClick={() => setOpen(!open)}
      >
        <BiWorld />
      </AppCustomButton>

      {open && (
              <div className="absolute right-0 top-11 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden z-50 animate-slideDown">

                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-sm font-semibold">Language</p>

                  <p className="mt-1 text-xs text-slate-500">
                    Current: {currentLanguage}
                  </p>
                </div>
                {languages.map((language) => {
                    const active = i18n.language === language.code;
                    const hovered = hoveredLanguage === language.code;

                  return (
                    <button
                      key={language.code}
                      onClick={() => changeLanguage(language.code)}
                      onMouseEnter={() => setHoveredLanguage(language.code)}
                      onMouseLeave={() => setHoveredLanguage(null)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                        active ? "font-semibold" : ""
                      }`}
                      style={{
                        color: active ? accentColor : undefined,
                        backgroundColor: hovered
                          ? hexToRgba(accentColor, 0.08)
                          : undefined,
                      }}
                    >
                      <span>
                        {language.flag} {language.label}
                      </span>

                      {active && (
                        <IoIosCheckmarkCircleOutline className="text-lg" />
                      )}
                    </button>
                  );
                })}
        </div>
      )}
    </div>
  );
}