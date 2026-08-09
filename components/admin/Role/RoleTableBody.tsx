import TableActions from '@/components/ui/table/TableActions'
import TableBody from '@/components/ui/table/TableBody'
import TableCell from '@/components/ui/table/TableCell'
import TableEmpty from '@/components/ui/table/TableEmpty'
import TableRow from '@/components/ui/table/TableRow'
import { RoleTableBodyProps } from '@/features/rolepermission/rolepermission.types'
import { ROLE_DELETE_MODAL, ROLE_UPDATE_MODAL } from '@/features/rolepermission/rolePermissionConstant'
import { cn } from '@/lib/utils'
import { t } from 'i18next'

export default function RoleTableBody<T>({
  roleList,
  columns,
}: RoleTableBodyProps<T>) {
  // console.log('roleList', roleList)
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
            {columns.map(column => {
              if (!column.isVisible) return null;
              
              if(column.key == 'name') {
                return(<TableCell key={column.key}>{role.name}</TableCell>)
              }

              if(column.key == 'status') {
                return (
                  <TableCell key={column.key}> <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                        role.status == "assigned"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      )}
                    >
                      <span
                        className={cn(
                          "mr-1.5 h-1.5 w-1.5 rounded-full",
                          role.status == "assigned" ? "bg-green-500" : "bg-gray-500"
                        )}
                      />
                      {role.status == "assigned" ? "Assigned" : "Not Assigned"}
                    </span>
                  </TableCell>
                )
              }

              if(column.key == 'created_at') {
                return (
                  <TableCell key={column.key}>
                    {role.created_at}
                  </TableCell>
                )
              }
              
              if(column.key == 'updated_at') {
                return (
                  <TableCell key={column.key}>
                    {role.updated_at}
                  </TableCell>
                )
              }
              
            })}
            <TableActions
                  editModalType={ROLE_UPDATE_MODAL}
                  editPayload={{ roleId: role.id }}
                  deleteModalType={ROLE_DELETE_MODAL}
                  deletePayload={{ roleId: role.id }}
                  allowEdit={role.status != "assigned"}
                  allowDelete={role.status != "assigned"}
              />
        </TableRow>
      ))}
    </TableBody>
  )
}
