/**
 * i18n
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import { DEFAULT_LOCALE } from '../actions/i18n';

import enLocaleData from 'react-intl/locale-data/en';
import koLocaleData from 'react-intl/locale-data/ko';

addLocaleData(enLocaleData);
addLocaleData(koLocaleData);

export const appLocales = [
  'en',
  'ko',
];

import enTranslationMessages from '../i18n/en.json';
import koTranslationMessages from '../i18n/ko.json';

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages) : {};
  const formattedMessages = {};
  const messageKeys = Object.keys(messages);
  for (const messageKey of messageKeys) {
    if (locale === DEFAULT_LOCALE) {
      formattedMessages[messageKey] = messages[messageKey];
    } else {
      formattedMessages[messageKey] = messages[messageKey] || defaultFormattedMessages[messageKey];
    }
  }

  return formattedMessages;
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  ko: formatTranslationMessages('ko', koTranslationMessages),
};
