//Backendden gelen UserId gibi camelCase olmayan keyleri camelCase'e çevirir -> userId
export default function camelCaseKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelCaseKeys(v));
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const camelKey = key.charAt(0).toLowerCase() + key.slice(1);

      acc[camelKey] = camelCaseKeys(value);

      return acc;
    }, {} as any);
  }

  return obj;
}
