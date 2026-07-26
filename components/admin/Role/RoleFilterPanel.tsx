import AppButton from '@/components/ui/button/AppButton';
import FilterSkeleton from '@/components/ui/skeleton/SkeletonFilter';
import AppInput from '@/components/ui/input/AppInput';
import { RoleFilterPanelProps } from '@/features/rolepermission/rolepermission.types';
import { hexToRgba, useTheme } from '@/theme';
import { t } from 'i18next';
import React, { useState } from 'react'

export default function RoleFilterPanel({
  searchFields,
  onSearch,
  searchTerm,
  setSearchTerm,
}: RoleFilterPanelProps) {
  const [showSearchHint, setShowSearchHint] = useState(false)
  const { accentColor } = useTheme();
    
  return (
    <FilterSkeleton
      fields={[
        { type: "input", count: 3 },
        { type: "select", count: 2 },
        { type: "input", count: 1 },
        { type: "select", count: 1 },
        { type: "button", count: 1},
      ]}
    />
    // <div id="filterPanel" className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-3 mt-1 p-3">
    //     <div
    //       className="relative w-full"
    //       onMouseEnter={() => setShowSearchHint(true)}
    //       onMouseLeave={() => setShowSearchHint(false)}
    //     >
    //         <AppInput
    //             placeholder={t('common:placeholder.search')}
    //             onFocus={() => setShowSearchHint(true)}
    //             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
    //         />

    //         {/* Tooltip */}
    //         <div
            
    //             style={{ background: hexToRgba(accentColor, 0.9) }}
    //             className={`
    //                 absolute left-0 top-full mt-2
    //                 z-50
    //                 w-max max-w-xs
    //                 rounded-lg
    //                 text-white text-xs
    //                 px-3 py-3
    //                 shadow-xl
    //                 transition-all duration-200
    //                 ${showSearchHint ? "opacity-100 scale-100" : "opacity-0 scale-95"}
    //                 pointer-events-none
    //             `}
    //         >
    //             <div className="font-medium mb-1">{t('common:search_enable_for')}:</div>

    //             <div className="flex flex-wrap gap-1 text-slate-300">
    //                 {searchFields.map((field) => (
    //                     <span
    //                         key={field}
    //                         className="text-white px-2 py-0.5 rounded-md border border-gray-300"
    //                         style={{ backgroundColor: accentColor }}
    //                     >
    //                         {t(field)}
    //                     </span>
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
    //     <AppButton onClick={onSearch}>
    //         {t('common:search')}
    //     </AppButton>
    // </div>
  )
}
