import FormModal from '@/components/ui/FormModal'
import AppInput from '@/components/ui/input/AppInput';
import AppReactSelect from '@/components/ui/select/AppReactSelect';
import { useGetEmployeeResourcesQuery } from '@/features/employee/employeeApi';
import { ResourceOption } from '@/store/commonInterface';
import React, { useState } from 'react'
import EmployeeFormLayout from './EmployeeFormLayout';
import { useTranslation } from 'react-i18next';
import FormSelect from '@/components/ui/input/FormSelect';
import AppSelect from '@/components/ui/input/AppSelect';
import AppModal from '@/components/ui/AppModal';

type EmployeeCreateProps = {
  onClose: () => void;
};

interface EmployeeForm {
    name: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    dateOfJoining: string;

    employeeType: number | null;
    employeeDesignation: number | null;
    gender: number | null;
    bloodGroup: number | null;
    maritalStatus: number | null;

    basicSalary: string;
    nationalId: string;
    passportNumber: string;

    shiftStart: string;
    shiftEnd: string;

    emergencyContactName: string;
    emergencyContactPhone: string;
    emergencyContactRelation: string;

    isActive: boolean;

    profileImg: File | null;
    documents: File[];
    terminationDate: string;
}
export default function EmployeeCreate({onClose}: EmployeeCreateProps) {
    const {data: resourceResponse, 
              isLoading: resourceIsLoading} = useGetEmployeeResourcesQuery()
    const bloodGroupOption = resourceResponse?.data?.blood_groups;
    const employeeDesignationOption = resourceResponse?.data?.employee_designations;
    const employeeTypeOption = resourceResponse?.data?.employee_types;
    const genderOption = resourceResponse?.data?.genders;
    const maritalStatusOption = resourceResponse?.data?.marital_status;

    // const [form, setForm] = useState<EmployeeForm>({
    //     name: "",
    //     email: "",
    //     phone: "",
    //     address: "",
    //     dateOfBirth: "",
    //     dateOfJoining: "",

    //     employeeType: null,
    //     employeeDesignation: null,
    //     gender: null,
    //     bloodGroup: null,
    //     maritalStatus: null,

    //     basicSalary: "",
    //     nationalId: "",
    //     passportNumber: "",

    //     shiftStart: "",
    //     shiftEnd: "",

    //     emergencyContactName: "",
    //     emergencyContactPhone: "",
    //     emergencyContactRelation: "",

    //     isActive: true,

    //     profileImg: null,
    //     documents: [],
    //     terminationDate: "",
    // });
    // // Personal Information
    // const [name, setName] = useState<string>("");
    // const [email, setEmail] = useState<string>("");
    // const [phone, setPhone] = useState<string>("");
    // const [address, setAddress] = useState<string>("");
    // const [dateOfBirth, setDateOfBirth] = useState<string>("");

    // // Employment Information
    // const [employeeType, setEmployeeType] = useState<number | null>(null);
    // const [employeeDesignation, setEmployeeDesignation] = useState<number | null>(null);
    // const [dateOfJoining, setDateOfJoining] = useState<string>("");
    // const [basicSalary, setBasicSalary] = useState<string>("");


    // // Profile Information
    // const [gender, setGender] = useState<number | null>(null);
    // const [bloodGroup, setBloodGroup] = useState<number | null>(null);
    // const [maritalStatus, setMaritalStatus] = useState<number | null>(null);
    // const [isActive, setIsActive] = useState<boolean>(true);

    // // Identification
    // const [nationalId, setNationalId] = useState<string>("");
    // const [passportNumber, setPassportNumber] = useState<string>("");

    // // Shift Information
    // const [shiftStart, setShiftStart] = useState<string>("");
    // const [shiftEnd, setShiftEnd] = useState<string>("");

    // // Emergency Contact
    // const [emergencyContactName, setEmergencyContactName] = useState<string>("");
    // const [emergencyContactPhone, setEmergencyContactPhone] = useState<string>("");
    // const [emergencyContactRelation, setEmergencyContactRelation] = useState<string>("");

    // // Optional Fields
    // const [profileImg, setProfileImg] = useState<File | null>(null);
    // const [terminationDate, setTerminationDate] = useState<string>("");

    // // Documents
    // const [documents, setDocuments] = useState<File[]>([]);
    
    const { t } = useTranslation("employee");
    console.log('genderOption', genderOption)
    const [open, setOpen] = useState(false);

    return (
        <>
        <button onClick={() => setOpen(true)}>
            Open
        </button>
        <AppModal
            onClose={onClose}
            modalTitle={t("add_new_employee")} 
            size='full'
        >
            <EmployeeFormLayout/>
        </AppModal>
       
    </>
    )
}
