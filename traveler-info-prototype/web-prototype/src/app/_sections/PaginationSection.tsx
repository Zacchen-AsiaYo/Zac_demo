"use client"

import { useState } from "react"
import { Pagination } from "@/components/ui/pagination"

export function PaginationSection() {
  const [paginationPage, setPaginationPage] = useState(5)

  return (
    <>
      <h1 className="h1-tw mt-6">Pagination</h1>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">First page (prev disabled)</h2>
        <Pagination page={1} totalPages={20} onPageChange={() => {}} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Middle pages (ellipsis both sides)</h2>
        <Pagination page={10} totalPages={20} onPageChange={() => {}} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Last page (next disabled)</h2>
        <Pagination page={20} totalPages={20} onPageChange={() => {}} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Few pages (no ellipsis)</h2>
        <Pagination page={3} totalPages={5} onPageChange={() => {}} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">With results text — interactive</h2>
        <Pagination
          page={paginationPage}
          totalPages={20}
          onPageChange={setPaginationPage}
          resultsText={`第 ${(paginationPage - 1) * 21 + 1}–${paginationPage * 21} 筆，共 420 筆住宿`}
        />
      </section>
    </>
  )
}
