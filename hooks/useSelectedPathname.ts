"use client";

import { usePathname } from "@/i18n/routing";

export function useSelectedPathname() {
	const pathname = usePathname();
	return pathname;
}