import { Suspense } from "react";
import { AppShell } from "@/components/layout/app-shell";

export default function DashboardLayout({ children }: LayoutProps<"/">) { return <Suspense fallback={<div className="min-h-screen" />}><AppShell>{children}</AppShell></Suspense>; }
