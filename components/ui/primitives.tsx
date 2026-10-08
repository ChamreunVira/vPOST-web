"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Icon, type IconName } from "./icons";
import { money } from "@/lib/format";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <div className="text-xs font-bold tracking-wider uppercase text-[#07885f] mb-1">
          {eyebrow ?? "ការងាររបស់អ្នក"}
        </div>
        <h1 className="text-2xl font-bold text-[#0f172a] m-0">{title}</h1>
        {description && <p className="text-sm text-[#64748b] mt-1 m-0">{description}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}

const quickActionRoutes: Record<string, string> = {
  បន្ថែមប្រភេទ: "/categories/new",
  បន្ថែមអ្នកផ្គត់ផ្គង់: "/suppliers/new",
  បន្ថែមអតិថិជន: "/customers/new",
  អញ្ជើញអ្នកប្រើប្រាស់: "/users/new",
};

export function Button({
  children,
  variant = "primary",
  icon,
  className = "",
  type = "button",
  onClick,
  disabled = false,
  href,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  icon?: IconName;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
}) {
  const content = (
    <>
      {icon && <Icon name={icon} size={16} />}
      {children}
    </>
  );

  const variantStyles = {
    primary: "bg-[#07885f] hover:bg-[#056447] text-white shadow-xs",
    secondary: "bg-white hover:bg-[#f8fafc] text-[#334155] border border-[#cbd5e1] shadow-2xs",
    ghost: "bg-transparent hover:bg-[#f1f5f9] text-[#475569]",
    danger: "bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-xs",
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2 h-9 px-3.5 text-sm font-medium rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

  const resolvedHref = href ?? (typeof children === "string" ? quickActionRoutes[children] : undefined);

  if (resolvedHref) {
    return (
      <Link href={resolvedHref} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {content}
    </button>
  );
}

export function SearchInput({
  placeholder = "ស្វែងរក...",
  value,
  onChange,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 border border-[#cbd5e1] rounded-md h-9.5 px-3 bg-white text-[#64748b] focus-within:border-[#07885f] focus-within:ring-1 focus-within:ring-[#07885f] min-w-[220px]">
      <Icon name="search" size={17} />
      <input
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full bg-transparent border-0 outline-none text-sm text-[#1e293b] placeholder-[#94a3b8]"
      />
    </label>
  );
}

export function Select({
  label,
  children,
  value,
  onChange,
}: {
  label?: string;
  children: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="relative inline-flex items-center border border-[#cbd5e1] rounded-md h-9.5 bg-white text-[#334155] text-sm">
      {label && (
        <span className="absolute -top-2 left-2 bg-white text-[11px] text-[#64748b] px-1 font-medium">
          {label}
        </span>
      )}
      <select
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className="appearance-none bg-transparent h-full pl-3 pr-8 text-sm outline-none cursor-pointer text-[#1e293b]"
      >
        {children}
      </select>
      <Icon name="chevron-down" size={15} className="absolute right-2.5 pointer-events-none text-[#64748b]" />
    </label>
  );
}

const statusLabels: Record<string, string> = {
  Active: "កំពុងប្រើ",
  Inactive: "មិនដំណើរការ",
  Completed: "បានបញ្ចប់",
  Refunded: "បានសងប្រាក់",
  Pending: "កំពុងរង់ចាំ",
  Received: "បានទទួល",
  Cancelled: "បានបោះបង់",
  "In stock": "មានក្នុងស្តុក",
  "Low stock": "ស្តុកជិតអស់",
  "Out of stock": "អស់ពីស្តុក",
  Cash: "សាច់ប្រាក់",
  Card: "កាតធនាគារ",
  QR: "ទូទាត់ QR",
  Purchase: "ទិញចូល",
  Sale: "លក់ចេញ",
  Return: "បង្វិលទំនិញ",
  Adjustment: "កែតម្រូវ",
  "Live data": "ទិន្នន័យបច្ចុប្បន្ន",
  "Live ledger": "បញ្ជីបច្ចុប្បន្ន",
};

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  const isSuccess =
    normalized.includes("active") ||
    normalized.includes("completed") ||
    normalized.includes("received") ||
    normalized.includes("in stock");
  const isWarning = normalized.includes("low") || normalized.includes("pending");
  const isDanger =
    normalized.includes("out") ||
    normalized.includes("inactive") ||
    normalized.includes("cancel") ||
    normalized.includes("refund");

  const badgeColor = isSuccess
    ? "bg-[#e6f4ef] text-[#056447]"
    : isWarning
    ? "bg-[#fef3c7] text-[#92400e]"
    : isDanger
    ? "bg-[#fee2e2] text-[#991b1b]"
    : "bg-[#e0f2fe] text-[#075985]";

  const dotColor = isSuccess
    ? "bg-[#056447]"
    : isWarning
    ? "bg-[#d97706]"
    : isDanger
    ? "bg-[#dc2626]"
    : "bg-[#0284c7]";

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeColor}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {statusLabels[status] ?? status}
    </span>
  );
}

export function Avatar({ name, size = "normal" }: { name: string; size?: "small" | "normal" }) {
  const sizeClasses = size === "small" ? "w-6.5 h-6.5 text-xs" : "w-8 h-8 text-xs";
  return (
    <span
      className={`inline-grid place-items-center rounded-full bg-[#d7f0e7] text-[#056447] font-bold shrink-0 ${sizeClasses}`}
    >
      {name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)}
    </span>
  );
}

export function Price({ value, muted = false }: { value: number; muted?: boolean }) {
  return <span className={muted ? "text-[#64748b]" : "font-semibold text-[#0f172a]"}>{money(value)}</span>;
}

export function StatCard({
  label,
  value,
  change,
  icon,
  tone = "indigo",
}: {
  label: string;
  value: string;
  change: string;
  icon: IconName;
  tone?: string;
}) {
  const isNegative = change.startsWith("-");
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-md p-4 flex flex-col justify-between shadow-2xs">
      <div className="flex items-center justify-between text-xs text-[#64748b]">
        <span>{label}</span>
        <span className="w-7 h-7 rounded-md bg-[#e6f4ef] text-[#056447] inline-grid place-items-center">
          <Icon name={icon} size={16} />
        </span>
      </div>
      <strong className="text-xl font-bold text-[#0f172a] my-2">{value}</strong>
      <div className={`text-xs flex items-center gap-1 ${isNegative ? "text-[#dc2626]" : "text-[#056447]"}`}>
        <Icon name={isNegative ? "arrow-down" : "arrow-up"} size={13} />
        {change}
        <span className="text-[#94a3b8] ml-1">ធៀបនឹងរយៈពេលមុន</span>
      </div>
    </div>
  );
}

export function EmptyState({ title, message, action }: { title: string; message: string; action?: ReactNode }) {
  return (
    <div className="p-10 flex flex-col items-center justify-center text-center text-[#64748b]">
      <span className="w-11 h-11 rounded-full bg-[#e6f4ef] text-[#056447] grid place-items-center mb-3">
        <Icon name="box" size={20} />
      </span>
      <strong className="text-base font-semibold text-[#1e293b]">{title}</strong>
      <p className="max-w-xs text-sm mt-1 mb-4 leading-relaxed">{message}</p>
      {action}
    </div>
  );
}

export function Pagination({ total = 128 }: { total?: number }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white border border-[#e2e8f0] rounded-b-md text-xs text-[#64748b]">
      <span>
        បង្ហាញ <strong className="text-[#1e293b]">១–៨</strong> ក្នុងចំណោម <strong className="text-[#1e293b]">{total}</strong>
      </span>
      <div className="flex items-center gap-1">
        <button
          className="w-7 h-7 border border-[#cbd5e1] rounded bg-white hover:bg-[#f8fafc] grid place-items-center text-[#475569]"
          aria-label="ទំព័រមុន"
        >
          <Icon name="chevron-left" size={15} />
        </button>
        <button className="w-7 h-7 border border-[#07885f] rounded bg-[#e6f4ef] text-[#056447] font-semibold grid place-items-center">
          ១
        </button>
        <button className="w-7 h-7 border border-[#cbd5e1] rounded bg-white hover:bg-[#f8fafc] grid place-items-center text-[#475569]">
          ២
        </button>
        <button className="w-7 h-7 border border-[#cbd5e1] rounded bg-white hover:bg-[#f8fafc] grid place-items-center text-[#475569]">
          ៣
        </button>
        <span className="px-1 text-[#94a3b8]">...</span>
        <button className="w-7 h-7 border border-[#cbd5e1] rounded bg-white hover:bg-[#f8fafc] grid place-items-center text-[#475569]">
          ១២
        </button>
        <button
          className="w-7 h-7 border border-[#cbd5e1] rounded bg-white hover:bg-[#f8fafc] grid place-items-center text-[#475569]"
          aria-label="ទំព័របន្ទាប់"
        >
          <Icon name="chevron-right" size={15} />
        </button>
      </div>
    </div>
  );
}

export function Toolbar({
  search,
  filters = true,
  action,
}: {
  search: ReactNode;
  filters?: boolean;
  action?: ReactNode;
}) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-t-md p-3 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2 flex-wrap">
        {search}
        {filters && (
          <>
            <Select>
              <option>គ្រប់ប្រភេទ</option>
              <option>ភេសជ្ជៈ</option>
              <option>អាហារសម្រន់</option>
            </Select>
            <Button variant="secondary" icon="filter">
              តម្រង
            </Button>
          </>
        )}
      </div>
      {action}
    </div>
  );
}
