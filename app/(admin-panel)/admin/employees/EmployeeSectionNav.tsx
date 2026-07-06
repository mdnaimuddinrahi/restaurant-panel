"use client";

import { useTranslation } from "react-i18next";

interface Props {
    activeSection: string;
    onNavigate: (id: string) => void;
    sectionIds: readonly {
        id: string;
    }[];
}

export default function EmployeeSectionNav({
    activeSection,
    onNavigate,
    sectionIds,
}: Props) {
    const { t } = useTranslation("employee");

    const sections = sectionIds.map((section) => ({
        ...section,
        title: t(`section.${section.id}.title`),
        description: t(`section.${section.id}.description`),
    }));
    
    return (
        <div className="h-full overflow-y-auto pr-2 space-y-2">
            {sections.map((section, index) => (
                <button
                    type="button"
                    key={section.id}
                    onClick={() => onNavigate(section.id)}
                    className={`group w-full rounded-2xl border p-4 text-left transition-all duration-300 hover:border-(--accent) hover:bg-(--accent-subtle) ${
                        activeSection === section.id
                            ? "border-(--accent) bg-(--accent-subtle) shadow-lg"
                            : "border-slate-200 dark:border-slate-700"
                    }`}
                >
                    <div className="flex gap-3">
                        <div className="text-xs font-bold text-(--accent)">
                            {(index + 1).toString().padStart(2, "0")}
                        </div>
                        <div>
                            <h4 className="font-semibold">{section.title}</h4>
                            <p className="mt-1 text-xs text-slate-500">
                                {section.description}
                            </p>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}
