"use client";
import React, { useState, FormEvent } from "react";

import { makeRequest } from "@/lib/api"; // makeRequest fonksiyonunun bulunduğu dosyayı import edin

export default function ApiPage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [id, setId] = useState<string>("");

  const handlePostSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Lütfen hem başlık hem de içerik alanlarını doldurun.");

      return;
    }

    const postData = { title, content };

    try {
      const result = await makeRequest({
        url: "posts",
        method: "POST",
        data: postData,
      });

      alert("Post başarıyla gönderildi! Yanıt: " + JSON.stringify(result));
    } catch (error) {
      alert("Bir hata oluştu: " + error);
    }
  };

  const handleGetAll = async () => {
    try {
      const result = await makeRequest({
        url: "posts",
        method: "GET",
      });

      alert("Tüm postlar alındı! Yanıt: " + JSON.stringify(result));
    } catch (error) {
      alert("Bir hata oluştu: " + error);
    }
  };

  const handleGetById = async (e: FormEvent) => {
    e.preventDefault();

    if (!id.trim()) {
      alert("Lütfen bir ID girin.");

      return;
    }

    try {
      const result = await makeRequest({
        url: `posts/${id}`,
        method: "GET",
      });

      alert("Post başarıyla alındı! Yanıt: " + JSON.stringify(result));
    } catch (error) {
      alert("Bir hata oluştu: " + error);
    }
  };

  const handlePutSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!id.trim() || !title.trim() || !content.trim()) {
      alert("Lütfen ID, başlık ve içerik alanlarını doldurun.");

      return;
    }

    const updateData = { title, content };

    try {
      const result = await makeRequest({
        url: `posts/${id}`,
        method: "PUT",
        data: updateData,
      });

      alert("Post başarıyla güncellendi! Yanıt: " + JSON.stringify(result));
    } catch (error) {
      alert("Bir hata oluştu: " + error);
    }
  };

  const handleDeleteSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!id.trim()) {
      alert("Lütfen bir ID girin.");

      return;
    }

    try {
      const result = await makeRequest({
        url: `posts/${id}`,
        method: "DELETE",
      });

      alert("Post başarıyla silindi! Yanıt: " + JSON.stringify(result));
    } catch (error) {
      alert("Bir hata oluştu: " + error);
    }
  };

  return (
    <div>
      <h1>API Page</h1>
      <div className="flex flex-col gap-4 items-start">
        {/* POST Form */}
        <div className="flex flex-col gap-2 p-4 border-2 border-gray-400 rounded-xl">
          <form
            className="flex flex-col gap-4 items-start"
            onSubmit={handlePostSubmit}
          >
            <h2>Yeni Post Oluştur</h2>
            <div className="flex gap-2">
              <label htmlFor="title">Başlık:</label>
              <input
                className="border"
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <label htmlFor="content">İçerik:</label>
              <textarea
                className="border"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button className="border rounded-md px-2 py-1" type="submit">
              Gönder
            </button>
          </form>

          {/* GET All Button */}
          <button
            className="border rounded-md px-2 py-1"
            onClick={handleGetAll}
          >
            Tüm Postları Al
          </button>
        </div>

        {/* GET by ID Form */}
        <div className="flex flex-col gap-2 p-4 border-2 border-gray-400 rounded-xl">
          <form
            className="flex flex-col gap-4 items-start"
            onSubmit={handleGetById}
          >
            <h2>ID ile Post Al</h2>
            <div className="flex gap-2">
              <label htmlFor="getId">ID:</label>
              <input
                className="border"
                id="getId"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <button className="border rounded-md px-2 py-1" type="submit">
              Al
            </button>
          </form>
        </div>

        {/* PUT by ID Form */}
        <div className="flex flex-col gap-2 p-4 border-2 border-gray-400 rounded-xl">
          <form
            className="flex flex-col gap-4 items-start"
            onSubmit={handlePutSubmit}
          >
            <h2>ID ile Post Güncelle</h2>
            <div className="flex gap-2">
              <label htmlFor="putId">ID:</label>
              <input
                className="border"
                id="putId"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <label htmlFor="putTitle">Yeni Başlık:</label>
              <input
                className="border"
                id="putTitle"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <label htmlFor="putContent">Yeni İçerik:</label>
              <textarea
                className="border"
                id="putContent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button className="border rounded-md px-2 py-1" type="submit">
              Güncelle
            </button>
          </form>
        </div>

        {/* DELETE by ID Form */}
        <div className="flex flex-col gap-2 p-4 border-2 border-gray-400 rounded-xl">
          <form
            className="flex flex-col gap-4 items-start"
            onSubmit={handleDeleteSubmit}
          >
            <h2>ID ile Post Sil</h2>
            <div className="flex gap-2">
              <label htmlFor="deleteId">ID:</label>
              <input
                className="border"
                id="deleteId"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <button className="border rounded-md px-2 py-1" type="submit">
              Sil
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
