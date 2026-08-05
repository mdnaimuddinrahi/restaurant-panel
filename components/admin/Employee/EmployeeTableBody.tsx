import { EMPLOYEE_DELETE_MODAL, EMPLOYEE_UPDATE_MODAL } from '@/features/employee/employeeConstant';
import { EmployeeTableBodyProps } from '@/features/employee/employee.types';
import { hexToRgba, useTheme } from '@/theme';
import { t } from 'i18next';
import { CSSProperties, useState } from 'react'
import { IoMdCopy } from 'react-icons/io';
import { IoCheckmarkDone } from 'react-icons/io5';
import TableRow from '@/components/ui/table/TableRow';
import TableActions from '@/components/ui/table/TableActions';
import TableEmpty from '@/components/ui/table/TableEmpty';
import TableCell from '@/components/ui/table/TableCell';
import { HiOutlineBriefcase, HiOutlineUsers } from 'react-icons/hi';
import { motion } from "framer-motion";
import TableBody from '@/components/ui/table/TableBody';

export default function EmployeeTableBody<T>({
    employees, 
    columns,
    bloodGroupOption,
    employeeDesignationOption,
    employeeTypeOption,
    genderOption,
    maritalStatusOption,
    }: EmployeeTableBodyProps<T>) {
    
    const initials = 
        (name: string) => 
            name?.trim()
                .split(/\s+/)
                .slice(0, 2)
                .map((word) => 
                    word[0]?.
                    toUpperCase()
                )
                .join("");
    const [copiedEmail, 
            setCopiedEmail] = useState<string | null>(null);
    
    const handleCopy = async (email: string) => {
        await navigator.clipboard.writeText(email);
    
        setCopiedEmail(email);
    
        setTimeout(() => {
            setCopiedEmail(null);
        }, 1500);
    };
    const { accentColor } = useTheme();

    return (
        <TableBody resource="employee">
            <TableEmpty
                totalItems={employees.length}
                colSpan={6}
                message={t("main:content.employees.no_employee_found")}
                adjustMessage={t('main:content.employees.try_adjusting_filter_a_new_message')}
                // icon={HiOutlineBriefcase}
            />
            {employees.map((employee, index) => (
                <TableRow
                    key={index}
                >
                    <TableCell className='border-left-1 border-r border-gray-200 dark:border-gray-900'>{employee.id}</TableCell>
                    {columns.map(column => {
                        if (!column.isVisible) return null;
                        
                        if (column.key === 'name') {
                            return (
                                <TableCell key={column.key}>
                                    <div className="flex items-center gap-2.5">
                                        <div className="relative inline-block group">
                                            {employee.profile_img ? (
                                                <>
                                                {/* Avatar */}
                                                <img
                                                    src={employee.profile_img}
                                                    alt={employee.name}
                                                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                                />

                                                </>
                                            ) : (
                                                <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center
                                                            text-white text-xs font-semibold select-none"
                                                style={{
                                                    background: hexToRgba(accentColor, 0.8),
                                                }}
                                                >
                                                {initials(employee.name)}
                                                </div>
                                            )}
                                        </div>
                                        <span className="font-medium">{employee.name}</span>
                                    </div>
                                </TableCell>
                            )
                        }

                        if (column.key === 'email') {
                            return (
                                <TableCell key={column.key}>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={`mailto:${employee.email}`}
                                            className="
                                                inline-flex items-center
                                                px-2 py-1
                                                rounded-full
                                                bg-slate-100 dark:bg-slate-700
                                                text-slate-600 dark:text-slate-200
                                                text-xs
                                                hover:bg-slate-200 dark:hover:bg-slate-600
                                                transition-all
                                            "
                                        >
                                            {employee.email}
                                        </a>

                                        {/* Copy Icon */}
                                        <div className="relative group">
                                            {copiedEmail === employee.email ? (
                                            <>
                                                <IoCheckmarkDone className="text-green-500 text-lg animate-bounce" />

                                                <div className="absolute bottom-full left-1/2 
                                                                    mb-2 -translate-x-1/2 whitespace-nowrap 
                                                                    rounded bg-green-600 px-2 py-1 text-xs 
                                                                    text-white opacity-0 transition-all 
                                                                    duration-200 group-hover:opacity-100">
                                                    {t('main:tooltip.copied')}
                                                </div>
                                            </>
                                            ) : (
                                            <>
                                                <IoMdCopy
                                                className="cursor-pointer text-base transition-all duration-200 hover:scale-110"
                                                onClick={() => handleCopy(employee.email)}
                                                />

                                                <div 
                                                    className="absolute bottom-full left-1/2 mb-2 
                                                                -translate-x-1/2 whitespace-nowrap 
                                                                rounded  px-2 py-1 text-xs text-white 
                                                                opacity-0 transition-all duration-200 
                                                                group-hover:opacity-100"
                                                    style={{ background: hexToRgba(accentColor, 0.9) }}
                                                    >
                                                    {t("main:tooltip.copy_email")}
                                                </div>
                                            </>
                                            )}
                                        </div>
                                    </div>
                                </TableCell>
                            )
                        }

                        if (column.key === 'phone') {
                            return (<TableCell key={column.key}>{employee.phone}</TableCell>)
                        }

                        if (column.key === 'blood_group') {
                            return (
                                <TableCell key={column.key}>
                                    {
                                        bloodGroupOption?.find(
                                            option => Number(option.value) === Number(employee.blood_group)
                                        )?.label ?? employee.blood_group
                                    }
                                </TableCell>
                            )
                        }

                        if (column.key === 'date_of_joining') {
                            return (
                                <TableCell key={column.key}>
                                    {employee.date_of_joining}
                                </TableCell>
                            )
                        }

                        if (column.key === 'employee_designation_id') {
                            return (
                                <TableCell key={column.key} >
                                    {
                                        employeeDesignationOption?.find(
                                            option => Number(option.value) === Number(employee.employee_designation_id)
                                        )?.label ?? employee.employee_designation_id
                                    }
                                </TableCell>
                            )
                        }

                        if (column.key === 'employee_type_id') {
                            return (
                                <TableCell key={column.key}>
                                    {
                                        employeeTypeOption?.find(
                                            option => Number(option.value) === Number(employee.employee_type_id)
                                        )?.label ?? employee.employee_type_id
                                    }
                                </TableCell>
                            )
                        }

                        if (column.key === 'gender') {
                            return (
                                <TableCell key={column.key} >
                                    {
                                        genderOption?.find(
                                            option => Number(option.value) === Number(employee.gender)
                                        )?.label ?? employee.gender
                                    }
                                </TableCell>
                            )
                        }

                        if (column.key === 'marital_status') {
                            return (
                                <TableCell key={column.key} >
                                    {
                                        maritalStatusOption?.find(
                                            option => Number(option.value) === Number(employee.marital_status)
                                        )?.label ?? employee.marital_status
                                    }
                                </TableCell>
                            )
                        }

                        if (column.key === 'emergency_contact_name') {
                            return <TableCell key={column.key}>{employee.emergency_contact_name}</TableCell>
                        }
                        
                        if (column.key === 'emergency_contact_phone') {
                            return (
                                <TableCell key={column.key}>{employee.emergency_contact_phone}</TableCell>
                            )
                        }
                        
                        if (column.key === 'emergency_contact_relation') {
                            return (
                                <TableCell key={column.key}>
                                        {employee.emergency_contact_relation}
                                </TableCell>
                            )
                        }
                        
                        if (column.key === 'shift_start') {
                            return (
                                <TableCell key={column.key}>{employee.shift_start}</TableCell>
                            )
                        }
                        
                        if (column.key === 'shift_end') {
                            return (
                                <TableCell key={column.key}>{employee.shift_end}</TableCell>
                            )
                        }
                    })}
                    <TableActions
                        editModalType={EMPLOYEE_UPDATE_MODAL}
                        editPayload={{ employeeId: employee.id }}
                        deleteModalType={EMPLOYEE_DELETE_MODAL}
                        deletePayload={{ employeeId: employee.id }}
                        allowEdit
                        allowDelete
                    />
                </TableRow>
            ))}
        </TableBody>
    )
}
