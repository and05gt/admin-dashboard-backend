const parseString = (value) => {
  const isString = typeof value === 'string';
  if (!isString) return;

  return value.trim();
};

// const parseNumber = (number) => {
//   const isString = typeof number === 'string';
//   if (!isString) return;

//   const parsedNumber = parseInt(number);
//   if (Number.isNaN(parsedNumber)) {
//     return;
//   }

//   return parsedNumber;
// };

export const parseFilterParams = (query) => {
  const { name } = query;

  const parsedName = parseString(name);

  return {
    name: parsedName,
  };
};
