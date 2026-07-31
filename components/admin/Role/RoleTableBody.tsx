import { RoleTableBodyProps } from '@/features/rolepermission/rolepermission.types'
import React from 'react'

export default function RoleTableBody<T>({
  roleList,
  columns,
}: RoleTableBodyProps<T>) {
  return (
    <tbody id="role-table-body">
      {roleList.map((role, index) => (
        <tr
          key={index}
          
        >

        </tr>
      ))}
    </tbody>
  )
}
