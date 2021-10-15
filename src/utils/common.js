import { message } from 'antd';

export const DateFormat = (date) => {
  if (date instanceof Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  } else {
    return date.replace(/T/, ' ').substring(0, date.indexOf('.'));
  }
};

export const DateStringToNumber = (date) => {
  return date
    .replace(/-/g, '')
    .replace(/T/g, '')
    .replace(/:/g, '')
    .substring(0, 21);
};

export const DataType = (data) => {
  let type = Object.prototype.toString.call(data);
  if (type.substring(8, type.length - 1) == 'Number') {
    type = data % 1 == 0 ? 'Int' : 'Float';
  } else if (type.substring(8, type.length - 1) == 'Boolean') {
    type = 'Boolean';
  } else {
    type = 'String';
  }
  return type;
};

export const parseResponse = (response) => {
  if (response && response.code) {
    let success = true;
    const { code, message } = response;
    if (code !== 'U000000') {
      success = false;
      // message.error(message);
    } else {
      // message.success(message);
    }
    const result = { success, code, message };
    return result;
  } else if (
    response.status !== 200 &&
    response.statusText &&
    response.ok === false
  ) {
    return { success: false, data: response };
  } else if (response && Object.keys(response).indexOf('code') === -1) {
    return { success: true, data: response };
  }
  return { success: false };
};
