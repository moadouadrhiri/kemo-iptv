import uiTranslationsData from '../config/ui-translations';

export const LANGUAGES = {
  "en": {
    "name": "English",
    "flag": "🇺🇸",
    "dir": "ltr"
  },
  "es": {
    "name": "Español",
    "flag": "🇪🇸",
    "dir": "ltr"
  },
  "fr": {
    "name": "Français",
    "flag": "🇫🇷",
    "dir": "ltr"
  }
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

export const defaultLanguage: LanguageCode = 'en';

export function getLanguageFromURL(pathname: string): LanguageCode {
  const langMatch = pathname.match(/^\/([a-z]{2})\//);
  const lang = langMatch ? langMatch[1] : defaultLanguage;
  return (lang in LANGUAGES ? lang : defaultLanguage) as LanguageCode;
}

export function getLocalizedPath(path: string, lang: string): string {
  const cleanPath = path.replace(/^\/[a-z]{2}\//, '/');
  if (lang === defaultLanguage) return cleanPath;
  return `/${lang}${cleanPath}`;
}

export function getAllLanguageVariants(
  path: string,
  baseUrl: string,
  enabledLanguages: LanguageCode[] = Object.keys(LANGUAGES) as LanguageCode[]
): Record<string, string> {
  const variants: Record<string, string> = {};
  const cleanPath = path.replace(/^\/[a-z]{2}\//, '/');
  
  enabledLanguages.forEach(lang => {
    const localizedPath = lang === defaultLanguage ? cleanPath : `/${lang}${cleanPath}`;
    variants[lang] = `${baseUrl}${localizedPath}`;
  });
  
  return variants;
}

export function getLanguageInfo(lang: LanguageCode) {
  return LANGUAGES[lang] || LANGUAGES[defaultLanguage];
}

export function isRTL(lang: LanguageCode): boolean {
  return LANGUAGES[lang]?.dir === 'rtl';
}

type UITranslations = typeof uiTranslationsData;

function deepMerge<T extends Record<string, any>>(target: T, source: T): T {
  const result = { ...source };
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      if (typeof target[key] === 'object' && target[key] !== null && !Array.isArray(target[key])) {
        result[key] = deepMerge(target[key], (source[key] || {}) as any);
      } else {
        result[key] = target[key] !== undefined ? target[key] : source[key];
      }
    }
  }
  return result;
}

export function getUITranslations(lang: LanguageCode) {
  const langData = (uiTranslationsData as any)[lang];
  const englishData = uiTranslationsData['en'];
  
  if (!langData || lang === 'en') {
    return englishData;
  }
  
  return deepMerge(langData, englishData);
}

export function t(key: string, lang: LanguageCode = 'en'): string {
  const translations = getUITranslations(lang);
  const parts = key.split('.');
  let result: any = translations;
  for (const part of parts) {
    result = result?.[part];
    if (result === undefined) break;
  }
  return typeof result === 'string' ? result : key;
}

export function translateUI(key: string, lang: LanguageCode = 'en', replacements?: Record<string, string>): string {
  const parts = key.split('.');
  let result: any = (uiTranslationsData as any)[lang] || uiTranslationsData['en'];
  
  for (const part of parts) {
    if (result && typeof result === 'object' && part in result) {
      result = result[part as keyof typeof result];
    } else {
      const fallback: any = uiTranslationsData['en'];
      let fallbackResult = fallback;
      for (const p of parts) {
        if (fallbackResult && typeof fallbackResult === 'object' && p in fallbackResult) {
          fallbackResult = fallbackResult[p as keyof typeof fallbackResult];
        }
      }
      result = fallbackResult;
      break;
    }
  }
  
  if (typeof result !== 'string') {
    return key;
  }
  
  if (replacements) {
    for (const [placeholder, value] of Object.entries(replacements)) {
      result = result.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), value);
    }
  }
  
  return result;
}