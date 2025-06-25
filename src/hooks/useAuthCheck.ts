"use client";

import { useEffect } from "react";
import { getCookie } from "typescript-cookie";
import { jwtDecode } from "jwt-decode";

import { useAppDispatch } from "@/lib/hook";
import { setAuthControl } from "@/lib/features/user/userSessionSlice";
import { logoutUser } from "@/lib/features/user/actions/logoutUser";

interface DecodedToken {
  exp: number;
}

//Bu hook, kullanıcı oturumunu kontrol eder ve geçerli bir oturum yoksa kullanıcıyı çıkış yaptırır.
export const useAuthCheck = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getCookie("user-access");
    const userId = getCookie("user-id");

    if (!token || !userId) {
      dispatch(logoutUser());

      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        dispatch(logoutUser());
      } else {
        dispatch(setAuthControl(true));
        // dispatch(setUserId(userId)); // Eğer userId ayrı reducer’da tutulacaksa
      }
    } catch {
      dispatch(logoutUser());
    }
  }, [dispatch]);
};
