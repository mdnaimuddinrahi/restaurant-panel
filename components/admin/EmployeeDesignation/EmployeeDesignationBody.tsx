import TableBody from '@/components/ui/table/TableBody'
import TableCell from '@/components/ui/table/TableCell'
import TableEmpty from '@/components/ui/table/TableEmpty'
import TableRow from '@/components/ui/table/TableRow'
import { EmployeeDesignationBodyProps } from '@/features/employee_designation/employeeDesignationType.types'
import { STATUS_ACTIVE, STATUS_INACTIVE } from '@/store/commonConstants'
import { useTranslation } from 'react-i18next'
import { motion } from "framer-motion";
import TableActions from '@/components/ui/table/TableActions'
import { EMPLOYEE_DESIGNATION_DELETE_MODAL, EMPLOYEE_DESIGNATION_UPDATE_MODAL } from '@/features/employee_designation/employeeDesignationConstant'

export default function EmployeeDesignationBody<T>({
    dataList,
    columns,
}: EmployeeDesignationBodyProps<T>) {
    const {t} = useTranslation("main")
    return (
        <TableBody resource="employee-designation">
            <TableEmpty
                totalItems={dataList.length}
                colSpan={6}
                message={t("content.employee_designations.no_employee_designation_found")}
            />
            {dataList.map((eachData, index) => {
                const payLoadData = { employeeDesignationId: eachData.id }
                return <TableRow>
                    <TableCell className='border-left-1 border-r border-gray-200 dark:border-gray-900'>{eachData.id}</TableCell>
                    {columns.map((column, keyIndex) => {
                        if (!column.isVisible) return null;
                        
                        if (column.key == 'name') {
                            return (<TableCell key={column.key}>{eachData.name}</TableCell>)
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
                        editModalType={EMPLOYEE_DESIGNATION_UPDATE_MODAL}
                        editPayload={payLoadData}
                        deleteModalType={EMPLOYEE_DESIGNATION_DELETE_MODAL}
                        deletePayload={payLoadData}
                        allowEdit={true}
                        allowDelete={eachData.status == STATUS_INACTIVE}
                    />
                </TableRow>}
            
            )}
        </TableBody>
    )
}
