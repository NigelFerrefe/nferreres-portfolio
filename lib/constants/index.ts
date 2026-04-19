

export const languages = [
	{ code: "es", label: "Español" },
	{ code: "en", label: "English" },
];

export const languagesPreferences = [{ code: "es" }, { code: "en" }] as const;

export type LanguageCode = (typeof languagesPreferences)[number]["code"];

export const isValidLanguageCode = (code: string): code is LanguageCode => {
	return languagesPreferences.some((lang) => lang.code === code);
};

export const normalizeLanguageCode = (code: string): LanguageCode => {
	const normalized = code.toLowerCase();
	return isValidLanguageCode(normalized) ? normalized : "es";
};