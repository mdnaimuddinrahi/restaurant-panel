import TableBody from '@/components/ui/table/TableBody'
import TableCell from '@/components/ui/table/TableCell'
import TableEmpty from '@/components/ui/table/TableEmpty'
import TableRow from '@/components/ui/table/TableRow'
import { RoleTableBodyProps } from '@/features/rolepermission/rolepermission.types'
import { t } from 'i18next'

export default function RoleTableBody<T>({
  roleList,
  columns,
}: RoleTableBodyProps<T>) {
  return (
    <TableBody resource="role">
      <TableEmpty
          totalItems={roleList.length}
          colSpan={6}
          message={t("main:content.roles.no_role_found")}
      />
      {roleList.map((role, index) => (
        <TableRow >
            <TableCell className='border-left-1 border-r border-gray-200 dark:border-gray-900'>{role.id}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
