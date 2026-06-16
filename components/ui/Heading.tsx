import React from 'react'

export default function Heading({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <>
        <div className="mb-6">
            <h1 className="font-display text-2xl font-700 tracking-tight">{title}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{subtitle}</p>
        </div>
    </>
  )
}
