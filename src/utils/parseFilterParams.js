const parseString = (value) => {
  const isString = typeof value === 'string';
  if (!isString) return;

  return value.trim();
};

export const parseFilterParams = (query) => {
  const { name } = query;

  const parsedName = parseString(name);

  return {
    name: parsedName,
  };
};
