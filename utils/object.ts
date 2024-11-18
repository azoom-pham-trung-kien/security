export const isObject = (value: any) =>
  value !== null &&
  typeof value === "object" &&
  value.toString() === "[object Object]";

export const omit = (obj: Record<string, any>, keys: string[]) => {
  if (!isObject(obj)) {
    return obj;
  }

  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });

  return result;
};
