"use client"
import { useEffect, useState } from 'react'
import AppModal from '@/components/ui/modal/AppModal';
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EmployeeSection from "./EmployeeSection";
import EmployeeSectionNav from "./EmployeeSectionNav";
import { useCreateEmployeeMutation, useGetEmployeeResourcesQuery } from "@/features/employee/employeeApi";
import { EMPLOYEE_SECTIONS, employeeSchema } from "@/features/employee/employeeConstant";
import FormSelect from "@/components/ui/form/FormSelect";
import FormInput from "@/components/ui/form/FormInput";
import FormTextArea from "@/components/ui/form/FormTextArea";
import FormDatePicker from "@/components/ui/form/FormDatePicker";
import AppCustomButton from "@/components/ui/button/AppCustomButton";
import { useTranslation } from "react-i18next";
import FormTimePicker from "@/components/ui/form/FormTimePicker";
import FormFileUpload from "@/components/ui/form/FormFileUpload";
import z from 'zod';
import { formatDate } from '@/store/commonFunction';
import { CreateEmployeeRequest } from '@/features/employee/employeeInterface';
import { toast } from "react-toastify";
import { appToast } from '@/utils/toastUtils';

type EmployeeCreateProps = {
  onClose: () => void;
};

export default function EmployeeCreate({onClose}: EmployeeCreateProps) {
    const [activeSection, setActiveSection] = useState("personal");
    const scrollToSection = (id: string) => {
        setActiveSection(id);

        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
    
    const {data: resourceResponse, 
            isLoading: resourceIsLoading} = useGetEmployeeResourcesQuery()
    const bloodGroupOption = resourceResponse?.data?.blood_groups;
    const employeeDesignationOption = resourceResponse?.data?.employee_designations;
    const employeeTypeOption = resourceResponse?.data?.employee_types;
    const genderOption = resourceResponse?.data?.genders;
    const maritalStatusOption = resourceResponse?.data?.marital_status;


    const { t } = useTranslation(["employee", "common"]);
    const schema = employeeSchema(t);
    const [hasError, setHasError] = useState(false);

    type EmployeeFormData = z.infer<typeof schema>;
    const methods = useForm<EmployeeFormData>({
        resolver: zodResolver(schema),
    });

    const {
        formState: { errors },
    } = methods;
    console.log('hasError', hasError)

    useEffect(() => {
        setHasError(Object.keys(errors).length > 0);
    }, [errors]);

    const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

    const onSubmit: SubmitHandler<EmployeeFormData> = async (data) => {
        try {
            
            const payload: CreateEmployeeRequest = {
                ...data,
                date_of_birth: formatDate(data.date_of_birth),
                date_of_joining: formatDate(data.date_of_joining),
            };
            
            const response = await createEmployee(payload).unwrap();
            appToast.success(t("employee:message.created"))

            methods.reset(); // Optional
            onClose();       // Close the modal
        } catch(error) {
            setHasError(true);
            console.log('error', error)
            // appToast.error(error)
        }
    };

    return (
        <>
        <AppModal
            onClose={onClose}
            modalTitle={t("add_new_employee")} 
            size='full'
        >
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="grid h-[calc(100vh-120px)] grid-cols-1 gap-1 lg:grid-cols-[320px_1fr]"
                >
                    {/* LEFT */}
                    <div className="sticky top-0 hidden overflow-hidden rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800 lg:block">
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
                            title={t("personal_information")}
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                <FormInput
                                    name="name"
                                    label={t("employee_name")}
                                    placeholder={t("placeholder.employee_name")}
                                    required
                                />

                                <FormInput
                                    name="email"
                                    label={t("email_address")}
                                    type="email"
                                    placeholder={t("placeholder.email_address")}
                                    required
                                />

                                <FormInput
                                    name="phone"
                                    label={t("phone_number")}
                                    type="tel"
                                    placeholder={t("placeholder.phone_number")}
                                />

                                <FormDatePicker
                                    name="date_of_birth"
                                    label={t("date_of_birth")}
                                    required
                                />

                                <FormSelect
                                    name="gender"
                                    label={t("gender")}
                                    placeholder={t("placeholder.gender")}
                                    required
                                    options={genderOption ?? []}
                                />
                        
                                <FormSelect
                                    name="blood_group"
                                    label={t("blood_group")}
                                    placeholder={t("placeholder.blood_group")}
                                    required
                                    options={bloodGroupOption ?? []}
                                />

                                <FormSelect
                                    name="marital_status"
                                    label={t("marital_status")}
                                    placeholder={t("placeholder.marital_status")}
                                    required
                                    options={maritalStatusOption ?? []}
                                />

                                <div className="md:col-span-2">
                                    <FormTextArea
                                        name="address"
                                        label={t("address")}
                                        placeholder={t("placeholder.address")}
                                    />
                                </div>
                            </div>
                        </EmployeeSection>
                        
                        <EmployeeSection id="employment" title={t('employement_information')} > 
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <FormInput
                                    name="basic_salary"
                                    label={t("basic_salary")}
                                    type="number"
                                    placeholder="0.00"
                                    
                                /> 
                                <FormDatePicker
                                    name="date_of_joining"
                                    label={t("date_of_joining")}
                                    required
                                />
                                <FormSelect
                                    name="employee_designation_id"
                                    label={t("employee_designation")}
                                    placeholder={t("placeholder.employee_designation")}
                                    required
                                    options={employeeDesignationOption ?? []}
                                />
                                <FormSelect
                                    name="employee_type_id"
                                    label={t("employee_type")}
                                    placeholder={t("placeholder.employee_type")}
                                    required
                                    options={employeeTypeOption ?? []}
                                />

                                <FormTimePicker
                                    name="shift_start"
                                    label={t("start_time")}
                                    required
                                />
                                
                                <FormTimePicker
                                    name="shift_end"
                                    label={t("end_time")}
                                    required
                                />
                            </div>
                        </EmployeeSection> 

                        <EmployeeSection id="identity" title={t('identity_information')} >    
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <FormInput
                                    name="national_id"
                                    label={t("national_id")}
                                    placeholder={t("placeholder.national_id")}
                                />

                                <FormInput
                                    name="passport_number"
                                    required
                                    label={t("passport_number")}
                                    placeholder={t("placeholder.passport_number")}
                                /> 
                            </div>
                        </EmployeeSection> 
                        
                        <EmployeeSection id="emergency" title={t("emergency_contact")} > 
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <FormInput
                                    name="emergency_contact_name"
                                    label={t("contact_person_name")}
                                    placeholder={t("placeholder.contact_person_name")}
                                    required
                                /> 
                                <FormInput
                                    type="tel"
                                    name="emergency_contact_phone"
                                    label={t("contact_person_phone")}
                                    required
                                    placeholder={t("placeholder.enter_contact_person_phone")}
                                /> 
                                <FormInput
                                    type="email"
                                    name="emergency_contact_email"
                                    label={t("contact_person_email")}
                                    placeholder={t("placeholder.contact_person_email")}
                                />
                                <FormInput
                                    name="emergency_contact_relation"
                                    label={t("contact_person_relation")}
                                    placeholder={t("placeholder.contact_person_relation")}
                                />  
                            </div>
                        </EmployeeSection> 
                        
                        <EmployeeSection id="documents" title={t("documents")} > 
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <FormFileUpload
                                    name="documents"
                                    label={t("employee_documents")}
                                    multiple
                                    required
                                />
                                <FormFileUpload
                                    name="profile_img"
                                    label={t("profile_img")}
                                />
                                <FormFileUpload
                                    name="resume"
                                    label={t("resume")}
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
                                {t("common:reset")}
                            </AppCustomButton>
                            <AppCustomButton
                                variant={hasError ? "danger" : "solid"}
                                type="submit"
                                disabled={isLoading}
                                className=" rounded-xl px-5 py-2.5 text-white disabled:opacity-50"
                            >
                                {isLoading ? t("common:creating") : t("create_employee")}
                            </AppCustomButton>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </AppModal>
       
    </>
    )
}
