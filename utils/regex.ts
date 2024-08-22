// src/utils/regex.ts

// E-posta doğrulama regex'i
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Şifre doğrulama (En az bir büyük harf, bir küçük harf, bir rakam ve 8 karakter)
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

// URL doğrulama regex'i
export const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

// Telefon numarası (sadece rakamlar, isteğe bağlı olarak + ve boşluk)
export const phoneRegex = /^\+?\d[\d\s]{7,}$/;

// Sadece harfler (Türkçe karakterler dahil)
export const onlyLettersRegex = /^[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/;

// Sadece rakamlar
export const onlyNumbersRegex = /^\d+$/;
