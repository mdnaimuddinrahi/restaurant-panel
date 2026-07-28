"use client"
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";
import { defaultLanguage } from "./config";

i18n
    .use(initReactI18next)
    .init({
        resources,

        fallbackLng: defaultLanguage,

        supportedLngs: ["en", "bd"],

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