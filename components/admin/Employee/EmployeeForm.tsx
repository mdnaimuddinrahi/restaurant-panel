"use client"
import {useEffect, useState } from 'react'
import {  FieldValues, FormProvider } from 'react-hook-form'
import EmployeeSectionNav from './EmployeeSectionNav'
import EmployeeSection from './EmployeeSection'
import FormInput from '@/components/ui/form/FormInput'
import FormDatePicker from '@/components/ui/form/FormDatePicker'
import FormSelect from '@/components/ui/form/FormSelect'
import FormTextArea from '@/components/ui/form/FormTextArea'
import FormTimePicker from '@/components/ui/form/FormTimePicker'
import FormFileUpload from '@/components/ui/form/FormFileUpload'
import AppCustomButton from '@/components/ui/button/AppCustomButton'
import { EmployeeFormProps } from '@/features/employee/employee.types'
import { useGetEmployeeResourcesQuery } from '@/features/employee/employeeApi'
import { useTranslation } from 'react-i18next';
import { EMPLOYEE_SECTIONS } from '@/features/employee/employeeConstant'
import AppForm from '@/components/ui/AppForm'

export default function EmployeeForm<T extends FieldValues>({
    methods,
    mode,
    onSubmit,
    loading,
    oldData,
    hasError=false,
    setHasError,
    buttonText,
}: EmployeeFormProps<T>) {
    const {data: resourceResponse, 
                isLoading: resourceIsLoading} = useGetEmployeeResourcesQuery()
    const bloodGroupOption = resourceResponse?.data?.blood_groups;
    const employeeDesignationOption = resourceResponse?.data?.employee_designations;
    const employeeTypeOption = resourceResponse?.data?.employee_types;
    const genderOption = resourceResponse?.data?.genders;
    const maritalStatusOption = resourceResponse?.data?.marital_status;
    const { t } = useTranslation("main");

    const [activeSection, setActiveSection] = useState("personal");
    const scrollToSection = (id: string) => {
        setActiveSection(id);

        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
    
    const {
            setError,
            formState: { errors },
        } = methods;
    // console.log('errors', errors)
    const values = methods.watch();
    
    // console.log("Current values:", values);
    // console.log('errors', errors)
    
    useEffect(() => {
        setHasError(Object.keys(errors).length > 0);
    }, [errors]);

    const [existingDocs, setExistingDocs] = useState<string[]>(oldData?.documents ?? []);
    
    return (   
        <FormProvider {...methods}>
            {/* <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="grid h-[calc(100vh-120px)] grid-cols-1 gap-1 lg:grid-cols-[320px_1fr]"
            > */}
            <AppForm className='
                    grid
                    h-[calc(100vh-120px)]
                    grid-cols-1
                    lg:grid-cols-[320px_1fr]
                    gap-4' onSubmit={methods.handleSubmit(onSubmit)}>
                {/* LEFT */}
                <div className="sticky top-0 hidden overflow-hidden 
                rounded-lg border border-slate-200 bg-white 
                p-4 dark:border-slate-700 dark:bg-slate-800 lg:block">
                    <EmployeeSectionNav
                        sectionIds={EMPLOYEE_SECTIONS}
                        activeSection={activeSection}
                        onNavigate={scrollToSection}
                    />
                </div>
                {/* RIGHT */}
                <div className="mb-3 overflow-y-auto space-y-3 pr-2">
                    <EmployeeSection
                        id="personal"
                        title={t("title.personal_information")}
                    >
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <FormInput
                                name="name"
                                label={t("label.employee.employee_name")}
                                placeholder={t("placeholder.employee.employee_name")}
                                required
                            />

                            <FormInput
                                name="email"
                                label={t("label.employee.email_address")}
                                type="email"
                                placeholder={t("placeholder.employee.email_address")}
                                required
                            />

                            <FormInput
                                name="phone"
                                label={t("label.employee.phone_number")}
                                type="tel"
                                placeholder={t("placeholder.employee.phone_number")}
                            />

                            <FormDatePicker
                                name="date_of_birth"
                                label={t("label.employee.date_of_birth")}
                                required
                            />

                            <FormSelect
                                name="gender"
                                label={t("label.employee.gender")}
                                placeholder={t("placeholder.employee.gender")}
                                required
                                options={genderOption ?? []}
                            />
                    
                            <FormSelect
                                name="blood_group"
                                label={t("label.employee.blood_group")}
                                placeholder={t("placeholder.employee.blood_group")}
                                required
                                options={bloodGroupOption ?? []}
                            />

                            <FormSelect
                                name="marital_status"
                                label={t("label.employee.marital_status")}
                                placeholder={t("placeholder.employee.marital_status")}
                                required
                                options={maritalStatusOption ?? []}
                            />

                            <div className="md:col-span-2">
                                <FormTextArea
                                    name="address"
                                    label={t("label.employee.address")}
                                    placeholder={t("placeholder.employee.address")}
                                />
                            </div>
                        </div>
                    </EmployeeSection>
                    
                    <EmployeeSection id="employment" title={t('title.employement_information')} > 
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <FormInput
                                name="basic_salary"
                                label={t("label.employee.basic_salary")}
                                type="number"
                                placeholder="0.00"
                                
                            /> 
                            <FormDatePicker
                                name="date_of_joining"
                                label={t("label.employee.date_of_joining")}
                                required
                            />
                            <FormSelect
                                name="employee_designation_id"
                                label={t("label.employee.employee_designation")}
                                placeholder={t("placeholder.employee.employee_designation")}
                                required
                                options={employeeDesignationOption ?? []}
                            />
                            <FormSelect
                                name="employee_type_id"
                                label={t("label.employee.employee_type")}
                                placeholder={t("placeholder.employee.employee_type")}
                                required
                                options={employeeTypeOption ?? []}
                            />

                            <FormTimePicker
                                name="shift_start"
                                label={t("label.employee.start_time")}
                                required
                            />
                            
                            <FormTimePicker
                                name="shift_end"
                                label={t("label.employee.end_time")}
                                required
                            />
                        </div>
                    </EmployeeSection> 

                    <EmployeeSection id="identity" title={t('title.identity_information')} >    
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <FormInput
                                name="national_id"
                                label={t("label.employee.national_id")}
                                placeholder={t("placeholder.employee.national_id")}
                            />

                            <FormInput
                                name="passport_number"
                                required
                                label={t("label.employee.passport_number")}
                                placeholder={t("placeholder.employee.passport_number")}
                            /> 
                        </div>
                    </EmployeeSection> 
                    
                    <EmployeeSection id="emergency" title={t("title.emergency_contact")} > 
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <FormInput
                                name="emergency_contact_name"
                                label={t("label.employee.contact_person_name")}
                                placeholder={t("placeholder.employee.contact_person_name")}
                                required
                            /> 
                            <FormInput
                                type="tel"
                                name="emergency_contact_phone"
                                label={t("label.employee.contact_person_phone")}
                                required
                                placeholder={t("placeholder.employee.enter_contact_person_phone")}
                            /> 
                            <FormInput
                                type="email"
                                name="emergency_contact_email"
                                label={t("label.employee.contact_person_email")}
                                placeholder={t("placeholder.employee.contact_person_email")}
                            />
                            <FormInput
                                name="emergency_contact_relation"
                                label={t("label.employee.contact_person_relation")}
                                placeholder={t("placeholder.employee.contact_person_relation")}
                            />  
                        </div>
                    </EmployeeSection> 
                    
                    <EmployeeSection id="documents" title={t("title.documents")} > 
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <FormFileUpload
                                name="documents"
                                label={t("label.employee.employee_documents")}
                                multiple
                                required
                                accept="application/pdf,image/*"
                                existingFiles={oldData?.documents ?? []}
                                onRemoveExistingFile={(url) =>
                                    setExistingDocs((prev) => prev.filter((u) => u !== url))
                                }
                            />
                            <FormFileUpload
                                name="profile_img"
                                required
                                label={t("label.employee.profile_img")}
                                accept='image/*'
                                existingFile={oldData?.profile_img ?? ''}
                            />
                            <FormFileUpload
                                name="resume"
                                label={t("label.employee.resume")}
                                accept='.pdf'
                                existingFile={oldData?.resume ?? ''}
                            />
                        </div>
                    </EmployeeSection> 
                    <div className="sticky bottom-0 flex justify-end gap-3 border-t-2 border-t-gray-100 bg-white py-2 px-4 dark:bg-slate-800">
                        <AppCustomButton 
                            variant="outline"
                            type="button"
                            onClick={() => {
                                    methods.reset()
                                }
                            }
                            className="rounded-xl border border-slate-300 px-5 py-2.5"
                        >
                            {t("main:button.reset")}
                        </AppCustomButton>
                        <AppCustomButton
                            variant={hasError ? "danger" : "solid"}
                            type="submit"
                            disabled={loading}
                            className=" rounded-xl px-5 py-2.5 text-white disabled:opacity-50"
                        >
                            {buttonText}
                        </AppCustomButton>
                    </div>
                </div>
            </AppForm>
        </FormProvider>
    )
}
