export const DateFormat = (date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
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