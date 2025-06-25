export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;
      const base64String = result.split(",")[1];

      resolve(base64String);
    };

    reader.onerror = () => {
      reject(new Error("Failed to convert file to base64"));
    };

    reader.readAsDataURL(file);
  });
}
