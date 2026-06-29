"use client";
// import "react-day-picker/dist/style.css";
import { useState } from "react"; 
import EmployeeSection from "./EmployeeSection"; 
import EmployeeSectionNav from "./EmployeeSectionNav"; 
import { EMPLOYEE_SECTIONS } from "@/features/employee/employeeConstant";
import { FiSearch } from "react-icons/fi";
import { FaUserAstronaut } from "react-icons/fa6";
import Input from "@/components/ui/input/Input";
import TextArea from "@/components/ui/input/TextArea";
import Switch from "@/components/ui/input/Switch";
import AppDatePicker from "@/components/ui/input/DatePicker";
import AppReactSelect from "@/components/ui/select/AppReactSelect";
import Select from "react-select/base";
import FormSelect from "@/components/ui/input/AppSelect";
// import DatePicker from "@/components/ui/input/DatePicker";

export default function EmployeeFormLayout() { 
    const [activeSection, setActiveSection] = useState("personal"); 
    const scrollToSection = (id: string) => { setActiveSection(id); 
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start", }); }; 
    const [allowLogin, setAllowLogin] = useState<boolean>(false);
    const [accepted, setAccepted] = useState<boolean>(false);
    
    return ( 
        <div className="grid h-[calc(100vh-120px)] grid-cols-1 lg:grid-cols-[320px_1fr] gap-1">
            {/* LEFT SIDE */} 

            <div className="hidden lg:block sticky top-0 overflow-hidden rounded-lg  border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
                <EmployeeSectionNav sections={EMPLOYEE_SECTIONS} activeSection={activeSection} onNavigate={scrollToSection} /> 
            </div> 
            {/* RIGHT SIDE */} 
            <div className=" overflow-y-auto space-y-2 pr-2 mb-3"> 
                <EmployeeSection id="personal" title="Personal Information" > 
                    <div>
                        {/* <AppInput/> */}
                        <Input
                            label="Employee Name"
                            required
                            // icon={<FiSearch size={16} />}
                            placeholder="Enter employee name"
                        />
                        <AppDatePicker
                            label="Date of Birth"
                            required
                            //   value={employee.date_of_birth}
                            //   onChange={(e) =>
                            //     setEmployee({
                            //       ...employee,
                            //       date_of_birth: e.target.value,
                            //     })
                            //   }
                            />
                        <Input
                            label="Email Address"
                            required
                            type="email"
                            // value={email}
                            error="email is required"
                        />
                        

{/* <FormSelect
  isMulti
  isSearchable
//   closeMenuOnSelect={false}
  accentColor="#6366f1"
  options={[
    { value: 1, label: "React" },
    { value: 2, label: "Laravel" },
    { value: 3, label: "TypeScript" },
    { value: 4, label: "Next.js" },
  ]}
/> */}
{/* <FormSelect
  label="Department"
  required
  placeholder="Choose Department"
  options={[
    { value: "hr", label: "HR" },
    { value: "it", label: "IT" },
    { value: "sales", label: "Sales" },
  ]}
/> */}
<FormSelect
  label="Department"
  placeholder="Select Department"
  isSearchable
  isMulti
  options={[
    { value: "hr", label: "HR" },
    { value: "it", label: "IT" },
    { value: "sales", label: "Sales" },
  ]}
//   error={errors.department}
/>
                        <Input
                            label="Phone Number"
                            placeholder="01XXXXXXXXX"
                            type="number"
                            min={0}
                        />
                        <Input
                            label="Employee Name"
                            required
                            // icon={<FiSearch size={16} />}
                            icon={<FaUserAstronaut size={16}/>}
                            placeholder="Enter employee name"
                        />
                        <Switch
                            label="Accept Terms"
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                            // error={errors.acceptTerms}
                        />
                        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
  <Switch
    label="Allow Employee Login"
    checked={allowLogin}
    onChange={(e) => setAllowLogin(e.target.checked)}
  />
</div>
                        <TextArea
                            label="Present Address"
                            required
                            rows={4}
                            placeholder="Enter present address"
                            />
                    </div>
                </EmployeeSection> 
                <EmployeeSection id="employment" title="Employment Information" > 
                    YOUR INPUTS HERE 
                </EmployeeSection> 
                <EmployeeSection id="identity" title="Identity Information" > 
                    YOUR INPUTS HERE 
                </EmployeeSection> 
                <EmployeeSection id="emergency" title="Emergency Contact" > 
                    YOUR INPUTS HERE 
                </EmployeeSection> 
                <EmployeeSection id="bank" title="Bank Information" > 
                    YOUR INPUTS HERE 
                </EmployeeSection> 
                <EmployeeSection id="address" title="Address Information" > 
                    YOUR INPUTS HERE 
                </EmployeeSection> 
                <EmployeeSection id="documents" title="Documents" > 
                    YOUR INPUTS HERE 
                </EmployeeSection> 
                <EmployeeSection id="permissions" title="Permissions" > 
                    YOUR INPUTS HERE 
                </EmployeeSection>
                <EmployeeSection id="system" title="System Information" > 
                    YOUR INPUTS HERE
                </EmployeeSection> 
                <div className="sticky bottom-0 flex justify-end gap-3"> 
                    
                    <button className="accent-bg rounded-2xl px-6 py-3 text-white"> 
                        Create Employee 
                    </button> 
                </div>     
            </div> 
    </div>);
}

