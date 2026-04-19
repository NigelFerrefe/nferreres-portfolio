import { redirect } from "@/i18n/routing";

export function redirectToHome(locale: string) {
	redirect({ href: "/", locale });
}