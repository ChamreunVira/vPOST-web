"use client";
import Link from "next/link";
import { useState } from "react";
import { Button, PageHeader } from "@/components/ui/primitives";
import { legacy } from "@/components/ui/legacy";

export function RecordForm({ kind, title, description, fields }: { kind: string; title: string; description: string; fields: { label: string; placeholder?: string; type?: string }[] }) {
  const [saved, setSaved] = useState(false);
  return <div><PageHeader eyebrow={`ការងារ / ${kind}`} title={title} description={description} action={<Link href="/dashboard" className={`${legacy.button} ${legacy.buttonSecondary}`}>ត្រឡប់ទៅផ្ទាំងគ្រប់គ្រង</Link>} /><form className={legacy.formLayout} onSubmit={(event) => { event.preventDefault(); setSaved(true); }}><div className={legacy.formCard}><section className={legacy.formSection}><h2>ព័ត៌មានលម្អិត</h2><p>បំពេញព័ត៌មានខាងក្រោម រួចចុចរក្សាទុក។</p><div className={legacy.formGrid}>{fields.map((field) => <div className={legacy.formField} key={field.label}><label>{field.label}</label><input required type={field.type ?? "text"} placeholder={field.placeholder} /></div>)}</div></section><section className={legacy.formSection}><div className={legacy.formActions}><Link href={kind === "ប្រភេទទំនិញ" ? "/categories" : kind === "អ្នកផ្គត់ផ្គង់" ? "/suppliers" : kind === "អតិថិជន" ? "/customers" : "/users"} className={`${legacy.button} ${legacy.buttonSecondary}`}>បោះបង់</Link><Button type="submit" icon="check">{saved ? "បានរក្សាទុក" : "រក្សាទុក"}</Button></div>{saved && <p className={legacy.saveMessage}>បានរក្សាទុកដោយជោគជ័យ។</p>}</section></div></form></div>;
}
