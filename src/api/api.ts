import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Genel yapılandırma türü
type RequestOptions = {
  baseURL?: string; // Opsiyonel, farklı API'ler için temel URL
  url: string; // İstek yapılan endpoint
  method?: "GET" | "POST" | "PUT" | "DELETE"; // HTTP metodları
  data?: any; // Gönderilecek veri (POST, PUT için)
  headers?: Record<string, string>; // Özelleştirilebilir headers
  timeout?: number; // Zaman aşımı süresi
};

// Data Request (GET, POST, PUT, DELETE)
export const makeRequest = async ({
  baseURL = "http://localhost:4000/",
  url,
  method = "POST", // Varsayılan olarak POST
  data = {},
  headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout = 5000, // Varsayılan olarak 5 saniye
}: RequestOptions): Promise<any> => {
  const config: AxiosRequestConfig = {
    baseURL,
    url,
    method,
    headers,
    data,
    timeout,
  };

  try {
    const response: AxiosResponse<any> = await axios(config);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`HTTP Hatası: ${response.status}`);
    }
  } catch (error: any) {
    if (error.response) {
      throw error.response.data || error.message;
    } else if (error.request) {
      throw new Error(
        "Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.",
      );
    } else {
      throw new Error(`Bir hata oluştu: ${error.message}`);
    }
  }
};

// Kullanım örneği
// const sendRequest = async () => {
//     try {
//         const result = await makeRequest({
//             url: 'posts',
//             method: 'POST',
//             data: { id: '2', title: "Test2", author: "Taner" },
//         });
//         console.log('Yanıt:', result);
//     } catch (error) {
//         console.error('İstek sırasında bir hata oluştu:', error);
//     }
// };

// sendRequest();
