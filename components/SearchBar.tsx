"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }: any) {
  const [value, setValue] = useState("");

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Rechercher un abonnement..."
        className="border p-2 w-full"
      />

      <button
        onClick={() => onSearch(value)}
        className="mt-2 bg-black text-white px-4 py-2"
      >
        Rechercher
      </button>
    </div>
  );
}