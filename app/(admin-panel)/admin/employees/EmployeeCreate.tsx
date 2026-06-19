import FormModal from '@/components/ui/FormModal'
import React from 'react'

type EmployeeCreateProps = {
  onClose: () => void;
};
export default function EmployeeCreate({onClose}: EmployeeCreateProps) {
  return (
    <FormModal 
          onClose={onClose}
          modalTitle="Add New Employee"
          buttonText="Add Employee"
        >
        <div className="space-y-3">
            <div>
                <label className="block text-xs font-600 text-slate-500 mb-1">Full Name</label>
                <input type="text" placeholder="Jane Smith" className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-transparent focus:border-transparent transition-all"/>
            </div>
            <div>
                <label className="block text-xs font-600 text-slate-500 mb-1">Email</label>
                <input type="email" placeholder="jane@example.com" className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-transparent focus:border-transparent transition-all"/>
            </div>
            <div>
                <label className="block text-xs font-600 text-slate-500 mb-1">Role</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 focus:border-transparent transition-all">
                    <option>Administrator</option><option>Editor</option><option>Viewer</option>
                </select>
            </div>
        </div>
    </FormModal>
  )
}
