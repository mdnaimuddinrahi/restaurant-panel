import AppCustomButton from '@/components/ui/button/AppCustomButton';
import { Employee } from '@/features/employee/employeeInterface';
import { ResourceOption, TableColumn } from '@/store/commonInterface';
import { hexToRgba, useTheme } from '@/theme';
import React, { useState } from 'react'
import { BiEditAlt } from 'react-icons/bi';
import { IoMdCopy } from 'react-icons/io';
import { IoCheckmarkDone } from 'react-icons/io5';
import { RxTrash } from 'react-icons/rx';

interface Props<T> {
//   open: boolean;
//   onClose: () => void;
    columns: TableColumn<T>[];
    employees: Employee[],
    bloodGroupOption: ResourceOption[],
    employeeDesignationOption: ResourceOption[],
    employeeTypeOption: ResourceOption[],
    genderOption: ResourceOption[],
    maritalStatusOption: ResourceOption[],
//   setColumns: React.Dispatch<
//     React.SetStateAction<TableColumn<T>[]>
//   >;
}

export default function EmployeeTableBody<T>({
    employees, 
    columns,
    bloodGroupOption,
    employeeDesignationOption,
    employeeTypeOption,
    genderOption,
    maritalStatusOption
    }: Props<T>) {
    const initials = (n: string) => n.split(' ').map(p => p[0]).join('');
    const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
    
    const handleCopy = async (email: string) => {
        await navigator.clipboard.writeText(email);
    
        setCopiedEmail(email);
    
        setTimeout(() => {
            setCopiedEmail(null);
        }, 1500);
    };
    const { accentColor } = useTheme();

    const rowHoverStyle = { "--row-hover": hexToRgba(accentColor, 0.08) } as React.CSSProperties;
    return (
        <tbody id="employee-table-body">
            {employees.map((employee, index) => (
                <tr 
                    key={index} 
                    style={rowHoverStyle}
                    className="
                        border-t border-slate-100 dark:border-slate-900
                        
                        transition-colors
                        hover:bg-[var(--row-hover)]
                    "
                >
                    <td className='px-4 py-3 text-slate-500 border-left-1 border-r border-gray-200 dark:border-gray-900'>{employee.id}</td>
                    {columns.map(column => {
                        if (!column.isVisible) return null;
                        
                        if (column.key === 'name') {
                            return (
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2.5">
                                <div 
                                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" 
                                    style={{ background: hexToRgba(accentColor, 0.8) }}
                                    // style={}
                                >
                                    {initials(employee.name)}
                                </div>
                                <span className="font-medium">{employee.name}</span>
                                </div>
                            </td>
                        )}

                        if (column.key === 'email') {
                            return (
                                <td className="px-4 py-3 text-slate-500">
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

                                                <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-green-600 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:opacity-100">
                                                Copied!
                                                </div>
                                            </>
                                            ) : (
                                            <>
                                                <IoMdCopy
                                                className="cursor-pointer text-base transition-all duration-200 hover:scale-110"
                                                onClick={() => handleCopy(employee.email)}
                                                />

                                                <div 
                                                    className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded  px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:opacity-100"
                                                    style={{ background: hexToRgba(accentColor, 0.9) }}
                                                    >
                                                    Copy email
                                                </div>
                                            </>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            )
                        }

                        if (column.key === 'phone') {
                            return (
                                <td className="px-4 py-3 text-slate-500">{employee.phone}</td>
                            )
                        }

                        if (column.key === 'blood_group') {
                            return (
                                <td className="px-4 py-3 text-slate-500">
                                    {
                                    bloodGroupOption?.find(
                                        option => Number(option.value) === Number(employee.blood_group)
                                    )?.label ?? employee.blood_group
                                    }
                                </td>
                            )
                        }

                        if (column.key === 'date_of_joining') {
                            return (
                                <td className="px-4 py-3 text-slate-500">{employee.date_of_joining}</td>
                            )
                        }

                        if (column.key === 'employee_designation_id') {
                            return (
                                <td className="px-4 py-3 text-slate-500">
                                    {
                                        employeeDesignationOption?.find(
                                            option => Number(option.value) === Number(employee.employee_designation_id)
                                        )?.label ?? employee.employee_designation_id
                                    }
                                </td>
                            )
                        }

                        if (column.key === 'employee_type_id') {
                            return (
                                <td className="px-4 py-3 text-slate-500">
                                    {
                                        employeeTypeOption?.find(
                                            option => Number(option.value) === Number(employee.employee_type_id)
                                        )?.label ?? employee.employee_type_id
                                    }
                                </td>
                            )
                        }

                        if (column.key === 'gender') {
                            return (
                                <td className="px-4 py-3 text-slate-500">
                                    {
                                        genderOption?.find(
                                            option => Number(option.value) === Number(employee.gender)
                                        )?.label ?? employee.gender
                                    }
                                </td>
                            )
                        }

                        if (column.key === 'marital_status') {
                            return (
                                <td className="px-4 py-3 text-slate-500">
                                    {
                                        maritalStatusOption?.find(
                                            option => Number(option.value) === Number(employee.marital_status)
                                        )?.label ?? employee.marital_status
                                    }
                                </td>
                            )
                        }

                        if (column.key === 'emergency_contact_name') {
                            return (
                                <td className="px-4 py-3 text-slate-500">{employee.emergency_contact_name}</td>
                            )
                        }
                        
                        if (column.key === 'emergency_contact_phone') {
                            return (
                                <td className="px-4 py-3 text-slate-500">{employee.emergency_contact_phone}</td>
                            )
                        }
                        
                        if (column.key === 'emergency_contact_relation') {
                            return (
                                <td className="px-4 py-3 text-slate-500">{employee.emergency_contact_relation}</td>
                            )
                        }
                        
                        if (column.key === 'shift_start') {
                            return (
                                <td className="px-4 py-3 text-slate-500">{employee.shift_start}</td>
                            )
                        }
                        
                        if (column.key === 'shift_end') {
                            return (
                                <td className="px-4 py-3 text-slate-500">{employee.shift_end}</td>
                            )
                        }
                    })}
                    <td className="px-4 py-3 text-slate-500">
                        <div className="flex items-center gap-1.5">

                            {/* Edit */}
                            <div className="relative group">
                                <AppCustomButton
                                    variant="outline"
                                    className="!p-1.5 transition-transform duration-200 hover:scale-110"
                                >
                                    <BiEditAlt className="text-base text-blue-900 dark:text-blue-400" />
                                </AppCustomButton>

                                <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded  px-2 py-1 text-xs text-white opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none whitespace-nowrap"
                                    style={{ background: hexToRgba(accentColor, 0.9) }}>
                                    Edit
                                </div>
                            </div>

                            {/* Delete */}
                            <div className="relative group">
                                <AppCustomButton
                                    variant="ghost"
                                    className="!p-1.5 transition-transform duration-200 hover:scale-110"
                                >
                                    <RxTrash className="text-base text-red-700"/>
                                </AppCustomButton>

                                <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded  px-2 py-1 text-xs text-white opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none whitespace-nowrap"
                                style={{ background: hexToRgba(accentColor, 0.9) }}
                                >
                                    Delete
                                </div>
                            </div>

                        </div>
                    </td>
                </tr>
            ))}
            {employees.length === 0 && (
                <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-400 text-sm">No employees found</td>
                </tr>
            )}
        </tbody>
    )
}
