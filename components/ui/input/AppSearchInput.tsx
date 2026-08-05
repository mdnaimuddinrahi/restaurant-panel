import React, { useState } from 'react'
import AppInput from './AppInput';
import { t } from 'i18next';
import { hexToRgba, useTheme } from '@/theme';

type AppSearchInputProps = {
    setSearchTerm: (searchTerm: string) => void;
    searchFields: string[];
}
export default function AppSearchInput({
    setSearchTerm,
    searchFields,
}: AppSearchInputProps) {
    const [showSearchHint, setShowSearchHint] = useState(false)
    const { accentColor } = useTheme();
    return (
        <div
            className="relative w-full"
            onMouseEnter={() => setShowSearchHint(true)}
            onMouseLeave={() => setShowSearchHint(false)}
        >
            <AppInput
                placeholder={t('main:placeholder.search')}
                onFocus={() => setShowSearchHint(true)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />

            <div
            
                style={{ background: hexToRgba(accentColor, 0.9) }}
                className={`
                    absolute left-0 top-full mt-2
                    z-50
                    w-max max-w-xs
                    rounded-lg
                    text-white text-xs
                    px-3 py-3
                    shadow-xl
                    transition-all duration-200
                    ${showSearchHint ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                    pointer-events-none
                `}
            >
                <div className="font-medium mb-1">{t('main:content.search_enable_for')}:</div>

                <div className="flex flex-wrap gap-1 text-slate-300">
                    {searchFields.map((field: string) => (
                        <span
                            key={field}
                            className="text-white px-2 py-0.5 rounded-md border border-gray-300"
                            style={{ backgroundColor: accentColor }}
                        >
                            {t(`main:content.${field}`)}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
