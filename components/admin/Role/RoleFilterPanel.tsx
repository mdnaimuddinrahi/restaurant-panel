import AppButton from '@/components/ui/button/AppButton';
import FilterSkeleton from '@/components/ui/skeleton/SkeletonFilter';
import AppInput from '@/components/ui/input/AppInput';
import { RoleFilterPanelProps } from '@/features/rolepermission/rolepermission.types';
import { hexToRgba, useTheme } from '@/theme';
import { t } from 'i18next';
import React, { useState } from 'react'
import AppSelect from '@/components/ui/input/AppSelect';
import AppSearchInput from '@/components/ui/input/AppSearchInput';
import { SingleValue } from 'react-select';
import { ResourceOption } from '@/store/common.types';
import { DEFAULT_SEARCH } from '@/store/commonConstants';

export default function RoleFilterPanel({
  searchFields,
  searchTerm,
  setSearchTerm,
  searchStatus,
  setSearchStatus,
}: RoleFilterPanelProps) {
  const [showSearchHint, setShowSearchHint] = useState(false)
  const { accentColor } = useTheme();
  const statusOption = [{'value': 1, 'label': 'Assgined'}, {'value': 2, 'label': 'Not Assigned'}]
    
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-3 mt-1 p-3">
      <AppSelect
        options={statusOption}
        value={statusOption?.find(o => o.value === searchStatus)}
        onChange={(option: SingleValue<ResourceOption>) => {
          setSearchStatus(option?.value ?? DEFAULT_SEARCH.NUMBER)
        }}
        isClearable
      />
      <AppSearchInput
        setSearchTerm={setSearchTerm}
        searchFields={searchFields}
      />
      {/* <AppButton onClick={onSearch}>
          {t('main:button.search')}
      </AppButton> */}
    </div>
  )
}
