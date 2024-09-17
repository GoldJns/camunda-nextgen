import { PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

/**
 * A provider that sets the language of the application based on the language changed event.
 */
export function TranslationProvider({ children }: PropsWithChildren) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
