"use client";

import { useState } from "react";

export default function ServiceClient({
  service,
  plans,
}: any) {
  const [maxPrice, setMaxPrice] = useState("");
  const [onlyNoAds, setOnlyNoAds] = useState(false);

  const filtered = plans.filter((p: any) => {
    return (
      (!maxPrice || p.price <= Number(maxPrice)) &&
      (!onlyNoAds || p.ads === false)
    );
  });

  return (
    <div style={{
      padding: 40,
      fontFamily: "Arial",
      background: "#0f172a",
      minHeight: "100vh",
      color: "white"
    }}>
      <h1>{service.name}</h1>

      {/* FILTRES */}
      <div style={{ marginTop: 20 }}>
        <input
          placeholder="Prix max"
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <label style={{ marginLeft: 10 }}>
          <input
            type="checkbox"
            onChange={(e) => setOnlyNoAds(e.target.checked)}
          />
          Sans pubs
        </label>
      </div>

      {/* TABLE */}
      <table style={{
        width: "100%",
        marginTop: 20,
        background: "#1e293b",
        borderCollapse: "collapse"
      }}>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Prix</th>
            <th>Qualité</th>
            <th>Écrans</th>
            <th>Ads</th>
            <th>Download</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((p: any) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}€</td>
              <td>{p.quality}</td>
              <td>{p.screens}</td>
              <td>{p.ads ? "Oui" : "Non"}</td>
              <td>{p.download ? "Oui" : "Non"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}