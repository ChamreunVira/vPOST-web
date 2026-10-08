import Link from "next/link";
import { Icon } from "@/components/ui/icons";
import { BrandSymbol } from "@/components/ui/brand-symbol";
import { legacy } from "@/components/ui/legacy";

export default function LoginPage() {
  return (
    <main className={legacy.loginPage}>
      <div className={legacy.loginCard}>
        <div className="mb-[42px] flex items-center gap-2.5 text-[#18233a]">
          <BrandSymbol className="h-9 w-9 shrink-0" />
          <span className="flex flex-col">
            <strong className="text-base font-bold">vPost</strong>
            <small className="text-xs text-[#9ba4b4]">ប្រព័ន្ធគ្រប់គ្រងហាង</small>
          </span>
        </div>
        <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#818b9d]">សូមស្វាគមន៍មកវិញ</div>
        <h1 className="m-0 text-2xl font-bold tracking-[-0.04em] text-[#172238]">ចូលប្រើប្រព័ន្ធហាង</h1>
        <p className={legacy.loginCopy}>ប្រើគណនី vPost ដើម្បីចូលទៅកាន់ប្រព័ន្ធគ្រប់គ្រងហាង។</p>
        <div className={legacy.loginForm}>
          <div className={legacy.formField}><label>អាសយដ្ឋានអ៊ីមែល</label><input type="email" defaultValue="malis@lotusmart.kh" /></div>
          <div className={legacy.formField}><label>ពាក្យសម្ងាត់</label><input type="password" defaultValue="password" /></div>
          <Link className={`${legacy.button} ${legacy.buttonPrimary}`} href="/dashboard">ចូលប្រើប្រព័ន្ធ <Icon name="chevron-right" size={15} /></Link>
        </div>
        <Link href="/dashboard" className={legacy.loginDemo}>បន្តទៅកាន់គណនីសាកល្បង →</Link>
      </div>
    </main>
  );
}
