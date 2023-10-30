// index.ts 文件内容

import { createI18n } from 'vue-i18n';
import ZH from './zh-CN';
import RS from './rs'; // 俄语
import kh from './kh'; // 哈语

const message = {
  zh: {
    ...ZH
  },
  rs: {
    ...RS
  },
  kh: {
    ...kh
  }
};

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: (localStorage.getItem('lang') as string) || 'zh',
  messages: message
});

export default i18n;
