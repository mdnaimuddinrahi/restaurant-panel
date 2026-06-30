"use client"
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { resources } from "./resources";
import { defaultLanguage } from "./config";

console.log("🔥 i18n file loaded");
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,

        fallbackLng: defaultLanguage,

        supportedLngs: ["en", "bn"],

        defaultNS: "common",

        interpolation: {
            escapeValue: false
        },

        detection: {
            order: [
                "cookie",
                "localStorage",
                "navigator"
            ],

            caches: [
                "cookie",
                "localStorage"
            ]
        }
    });

export default i18n;