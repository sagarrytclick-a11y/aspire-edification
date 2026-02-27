'use client'

import { useFormModal } from "@/context/FormModalContext";

export default function FreeAssessmentButton() {
  const { openModal } = useFormModal();

  return (
    <button className="bg-white border border-slate-200 text-[#1E293B] px-8 py-4 rounded-xl font-semibold hover:border-[#4A90E2] hover:text-[#4A90E2] transition-all">
      Free Assessment
    </button>
  )
}
