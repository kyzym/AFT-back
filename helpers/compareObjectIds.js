export const compareObjectIds = (obj1, obj2) => {
  if (!obj1 || !obj2) return false;

  return obj1.toString() === obj2.toString();
};
