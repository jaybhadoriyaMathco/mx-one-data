import { designSpanishTranslations } from "./designTranslations";

export type Language = "en" | "es";

export const translations: Record<Language, Record<string, string>> = {
  en: {},
  es: designSpanishTranslations,
};
