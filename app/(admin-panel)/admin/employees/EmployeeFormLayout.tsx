"use client";

import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EmployeeSection from "./EmployeeSection";
import EmployeeSectionNav from "./EmployeeSectionNav";
import { useCreateEmployeeMutation, useGetEmployeeResourcesQuery } from "@/features/employee/employeeApi";
import { EMPLOYEE_SECTIONS, EmployeeFormData, employeeSchema } from "@/features/employee/employeeConstant";
import FormSelect from "@/components/ui/input/FormSelect";
import FormInput from "@/components/ui/input/FormInput";
import FormTextArea from "@/components/ui/input/FormTextArea";
import FormDatePicker from "@/components/ui/input/FormDatePicker";
import AppCustomButton from "@/components/ui/button/AppCustomButton";
import { useTranslation } from "react-i18next";
import FormTimePicker from "@/components/ui/input/FormTimePicker";
import AppReactSelect from "@/components/ui/select/AppReactSelect";
import Select, {
  GroupBase,
  Props,
  components,
  DropdownIndicatorProps,
} from "react-select";
import AppTimePicker from "@/components/ui/input/AppTimePicker";

export default function EmployeeFormLayout() {
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

    const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

    const methods = useForm<EmployeeFormData>({
        resolver: zodResolver(employeeSchema),
    });

    const onSubmit: SubmitHandler<EmployeeFormData> = async (data) => {
        try {
            console.log('data', data);
        } catch(error) {
            console.log('error', error)
        }
    };

    const { t } = useTranslation(["employee", "common"]);

    return (
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
                                placeholder="01XXXXXXXXX"
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
                            <FormTimePicker
                                name="startTime"
                                label={t("start_time")}
                                required
                            />
                            
                            <FormTimePicker
                                name="endTime"
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
                                label={t("passport_number")}
                                placeholder={t("placeholder.passport_number")}
                            /> 
                        </div>
                    </EmployeeSection> 


                    <div className="sticky bottom-0 flex justify-end gap-3 border-t-2 border-t-gray-100 bg-white py-2 px-4 dark:bg-slate-800">
                        <AppCustomButton 
                            variant="outline"
                            type="button"
                            onClick={() => methods.reset()}
                            className="rounded-xl border border-slate-300 px-5 py-2.5"
                        >
                            {t("common:reset")}
                        </AppCustomButton>
                        <AppCustomButton
                            type="submit"
                            disabled={isLoading}
                            className="accent-bg rounded-xl px-5 py-2.5 text-white disabled:opacity-50"
                        >
                            {isLoading ? t("common:creating") : t("create_employee")}
                        </AppCustomButton>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}
//                 <EmployeeSection id="emergency" title="Emergency Contact" > 
//                     YOUR INPUTS HERE 
//                 </EmployeeSection> 
//                 <EmployeeSection id="bank" title="Bank Information" > 
//                     YOUR INPUTS HERE 
//                 </EmployeeSection> 
//                 <EmployeeSection id="address" title="Address Information" > 
//                     YOUR INPUTS HERE 
//                 </EmployeeSection> 
//                 <EmployeeSection id="documents" title="Documents" > 
//                     YOUR INPUTS HERE 
//                 </EmployeeSection> 
//                 <EmployeeSection id="permissions" title="Permissions" > 
//                     YOUR INPUTS HERE 
//                 </EmployeeSection>
//                 <EmployeeSection id="system" title="System Information" > 
//                     YOUR INPUTS HERE
//                 </EmployeeSection> 