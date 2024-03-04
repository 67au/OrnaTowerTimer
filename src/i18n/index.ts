import { createI18n } from 'vue-i18n'
import { localStorage } from '@/plugins/storage'
import { Locale as ComponentsLocale } from '@varlet/ui'

import messages from './locale.json'

const browserLocale: string = navigator.language;

const langs: any = {
    'zh-CN': 'zh-hans',
    'zh-TW': 'zh-hant',
    'zh-HK': 'zh-hant',
    'en-US': 'en',
}

ComponentsLocale.add('zh-hans', ComponentsLocale.zhCN)
ComponentsLocale.add('zh-hant', ComponentsLocale.zhTW)
ComponentsLocale.add('en', ComponentsLocale.enUS)

export type Locale = 'zh-hans' | 'zh-hant' | 'en';

const storeLang = localStorage.get('locale');

const lang: string = Object.values(langs).includes(storeLang)?storeLang:undefined || langs[browserLocale] || 'en';

localStorage.set('locale', lang);

ComponentsLocale.use(lang);

export const i18n = createI18n<false>({
    legacy: false,
    locale: lang,
    fallbackLocale: 'en',
    messages: messages,
})

export function setLocale(locale: Locale) {
    localStorage.set('locale', locale);
    i18n.global.locale.value = locale;
    ComponentsLocale.use(locale);
}
