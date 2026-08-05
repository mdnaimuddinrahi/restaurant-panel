import AppButton from '@/components/ui/button/AppButton';
import FilterSkeleton from '@/components/ui/skeleton/SkeletonFilter';
import AppInput from '@/components/ui/input/AppInput';
import { RoleFilterPanelProps } from '@/features/rolepermission/rolepermission.types';
import { hexToRgba, useTheme } from '@/theme';
import { t } from 'i18next';
import React, { useState } from 'react'
import AppSelect from '@/components/ui/input/AppSelect';
import AppSearchInput from '@/components/ui/input/AppSearchInput';

export default function RoleFilterPanel({
  searchFields,
  onSearch,
  searchTerm,
  setSearchTerm,
}: RoleFilterPanelProps) {
  const [showSearchHint, setShowSearchHint] = useState(false)
  const { accentColor } = useTheme();
    
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-3 mt-1 p-3">
      <AppSelect
        options={[{'value': 'assigned', 'label': 'Assgined'}, {'value': 'not_assigned', 'label': 'Not Assigned'}]}
      />
      <AppSearchInput
        setSearchTerm={setSearchTerm}
        searchFields={searchFields}
      />
      <AppButton onClick={onSearch}>
          {t('main:button.search')}
      </AppButton>
    </div>
  )
}
