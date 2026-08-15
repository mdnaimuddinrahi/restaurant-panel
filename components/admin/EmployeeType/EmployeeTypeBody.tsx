import TableBody from '@/components/ui/table/TableBody'
import TableCell from '@/components/ui/table/TableCell'
import TableEmpty from '@/components/ui/table/TableEmpty'
import TableRow from '@/components/ui/table/TableRow'
import { EmployeeTypeBodyProps } from '@/features/employee_type/employeeType.types'
import { t } from 'i18next'
import { motion } from "framer-motion";
import { STATUS_ACTIVE, STATUS_INACTIVE } from '@/store/commonConstants'
import TableActions from '@/components/ui/table/TableActions'
import { EMPLOYEE_TYPE_DELETE_MODAL, EMPLOYEE_TYPE_UPDATE_MODAL } from '@/features/employee_type/employeeTypeConstant'


export default function EmployeeTypeBody<T>({
  dataList,
  columns,
}: EmployeeTypeBodyProps<T>) {
  
  return (
    <TableBody resource="employee-type">
      <TableEmpty
        totalItems={dataList.length}
        colSpan={6}
        message={t("main:content.employee_types.no_employee_type_found")}
      />
      {dataList.map((eachData, index) => (
        <TableRow>
          <TableCell className='border-left-1 border-r border-gray-200 dark:border-gray-900'>{eachData.id}</TableCell>
          {columns.map((column, keyIndex) => {
            if (!column.isVisible) return null;
            
            if (column.key == 'name') {
              return (<TableCell key={column.key}>{eachData.name}</TableCell>)
            }

            if (column.key == 'code') {
              return (<TableCell key={column.key}>{eachData.code}</TableCell>)
            }

            if (column.key == 'status') {
              const isActive = eachData.status == STATUS_ACTIVE;
              
              return (
                 <TableCell key={column.key}>
                    <motion.span
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                            isActive
                                ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                        }`}
                    >
                        <motion.span
                            animate={isActive ? { scale: [1, 1.3, 1] } : {}}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 2,
                            }}
                            className={`h-1.5 w-1.5 rounded-full ${
                                isActive ? "bg-green-500" : "bg-red-500"
                            }`}
                        />

                        {isActive ? t("main:status.active") : t("main:status.inactive")}
                    </motion.span>
                </TableCell>
              )
            }

            if(column.key == 'created_at') {
              return (
                <TableCell key={column.key}>
                  {eachData.created_at}
                </TableCell>
              )
            }
            
            if(column.key == 'updated_at') {
              return (
                <TableCell key={column.key}>
                  {eachData.updated_at}
                </TableCell>
              )
            }
          })}
          <TableActions
            editModalType={EMPLOYEE_TYPE_UPDATE_MODAL}
            editPayload={{ employeeTypeId: eachData.id }}
            deleteModalType={EMPLOYEE_TYPE_DELETE_MODAL}
            deletePayload={{ employeeTypeId: eachData.id }}
            allowEdit={true}
            allowDelete={eachData.status == STATUS_INACTIVE}
          />
        </TableRow>
      ))}
      
    </TableBody>
  )
}
