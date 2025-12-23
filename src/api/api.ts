"use client"

export async function loginAdmin(data: { email: string; password: string }) {
  // Use fetch directly to call our local Route Handler
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    // 1. Route Handler'dan dönen JSON hatasını al
    const errorData = await res.json();

    // 2. Mesajı "Error" objesine fırlat (LoginForm bunu yakalayacak)
    throw new Error(errorData.message || "Login failed");
  }

  return res.json();
}