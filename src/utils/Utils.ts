// import moment from 'moment';
// import { ElLoading } from 'element-plus';
// import download from 'downloadjs';
// import { mockRequest } from '../request';

export default class Utils {
  // 列表为空则修改为--
  static placeholder = data => {
    if (data) {
      data.forEach(item => {
        const arr = [null, '', '1900-0-01', -1, undefined];
        const reg = /^[1900]*-[01]*-[01]+.*$/;
        for (const key in item) {
          if (arr.includes(item[key]) || reg.test(item[key])) {
            item[key] = '--';
          }
        }
      });
      return data;
    }
    return [];
  };

  static dateFormat = (date, fmt: any) => {
    date = new Date(date);
    const a = ['日', '一', '二', '三', '四', '五', '六'];
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
      w: date.getDay(), // 周
      W: a[date.getDay()], // 大写周
      T: 'T'
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
      }
    }
    return fmt;
  };
}
