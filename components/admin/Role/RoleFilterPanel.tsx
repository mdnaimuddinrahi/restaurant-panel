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
        {type: "select", count: 1},
        { type: "input", count: 1 },
        { type: "button", count: 1},
      ]}
    />
  )
}
