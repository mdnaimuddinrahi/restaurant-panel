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

export default function EmployeeFormLayout() {
  const [activeSection, setActiveSection] = useState("personal");

  const scrollToSection = (id: string) => {
    setActiveSection(id);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };


  const {
    data: resourceResponse,
    isLoading: resourceLoading,
  } = useGetEmployeeResourcesQuery();

  const [createEmployee, { isLoading }] =
    useCreateEmployeeMutation();

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


  return (
    <FormProvider {...methods}>
        <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid h-[calc(100vh-120px)] grid-cols-1 gap-1 lg:grid-cols-[320px_1fr]"
        >
            {/* LEFT */}
            <div className="sticky top-0 hidden overflow-hidden rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800 lg:block">
                <EmployeeSectionNav
                    sections={EMPLOYEE_SECTIONS}
                    activeSection={activeSection}
                    onNavigate={scrollToSection}
                />
            </div>
            {/* RIGHT */}
            <div className="mb-3 overflow-y-auto space-y-3 pr-2">
                <EmployeeSection
                    id="personal"
                    title="Personal Information"
                >
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <FormInput
                            name="name"
                            label="Employee Name"
                            placeholder="Enter employee name"
                            required
                        />

                        <FormInput
                            name="email"
                            label="Email Address"
                            type="email"
                            placeholder="Enter email address"
                            required
                        />

                        <FormInput
                            name="phone"
                            label="Phone Number"
                            type="tel"
                            placeholder="01XXXXXXXXX"
                        />

                        <FormDatePicker
                            name="date_of_birth"
                            label="Date of Birth"
                            required
                        />

                        <FormSelect
                            name="gender"
                            label="Gender"
                            placeholder="Select Gender"
                            required
                            options={resourceResponse?.data?.genders ?? []}
                        />

                        <FormInput
                            name="national_id"
                            label="National ID"
                            placeholder="Enter National ID"
                        />

                        <FormInput
                            name="passport_number"
                            label="Passport Number"
                            placeholder="Enter Passport Number"
                        />

                        <div className="md:col-span-2">
                            <FormTextArea
                                name="address"
                                label="Address"
                                placeholder="Enter full address"
                            />
                        </div>
                    </div>
                </EmployeeSection>

                <div className="sticky bottom-0 flex justify-end gap-3 border-t bg-white py-4 dark:bg-slate-900">

                    <button
                        type="button"
                        onClick={() => methods.reset()}
                        className="rounded-xl border border-slate-300 px-5 py-2.5"
                    >
                        Reset
                    </button>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="accent-bg rounded-xl px-5 py-2.5 text-white disabled:opacity-50"
                    >
                    {isLoading
                        ? "Creating..."
                        : "Create Employee"}
                    </button>

                </div>
            </div>
        </form>
    </FormProvider>
  );
}
// <EmployeeSection id="employment" title="Employment Information" > 
//                     YOUR INPUTS HERE 
//                 </EmployeeSection> 
//                 <EmployeeSection id="identity" title="Identity Information" > 
//                     YOUR INPUTS HERE 
//                 </EmployeeSection> 
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