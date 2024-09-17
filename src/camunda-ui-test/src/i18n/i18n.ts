import i18n, { Resource } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const ns = ['translation'] as const;
const supportedLngs = ['de', 'en', 'hu', 'zh'] as const;
const fallbackLng = 'en' as const;

const i18nResources: Resource = supportedLngs.reduce((acc, languageCode) => {
  const resources = ns.reduce((acc, ns) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const module = require(`./locales/${languageCode}/${ns}.json`);
    return { ...acc, [ns]: module };
  }, {});
  return {
    ...acc,
    [languageCode]: {
      ...resources,
    },
  };
}, {});

const i18nInstance = i18n.createInstance();
i18nInstance
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng,
    supportedLngs,
    defaultNS: 'translation',
    resources: i18nResources,
  });

export default i18nInstance;