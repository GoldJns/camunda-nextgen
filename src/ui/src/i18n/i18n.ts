import i18n, { Resource } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const ns = ['Login'] as const;
const supportedLngs = ['de', 'en'] as const;
const fallbackLng = 'en' as const;

// Function to load resources asynchronously
const loadResources = async (): Promise<Resource> => {
  const resources: Resource = {};

  for (const languageCode of supportedLngs) {
    const languageResources: Record<string, any> = {};

    for (const namespace of ns) {
      const module = await import(`./locales/${languageCode}/${namespace}.json`);
      console.log(module);
      languageResources[namespace] = module.default;
    }

    resources[languageCode] = languageResources;
  }

  return resources;
};

const i18nInstance = i18n.createInstance();
const initializeI18n = async () => {
  const resources = await loadResources();

  i18nInstance
    // detect user language
    .use(LanguageDetector)
    .use(initReactI18next)
    // init i18next
    .init({
      fallbackLng,
      supportedLngs,
      defaultNS: ns,
      resources,
    });
};

// Initialize i18n
initializeI18n().catch((error) => {
  console.error('Error initializing i18n:', error);
});

export default i18nInstance;
