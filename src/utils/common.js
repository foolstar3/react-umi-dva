export const DateFormat = (date) => {
  if (date instanceof Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  } else {
    return date.replace(/T/, ' ').substring(0, date.indexOf('.'));
  }
};

export const DataType = (data) => {
  let type = Object.prototype.toString.call(data);
  if (type.substring(8, type.length - 1) == 'Number') {
    type = data % 1 == 0 ? 'Int' : 'Float';
  } else {
    type = type.substring(8, type.length - 1);
  }
  return type;
};
