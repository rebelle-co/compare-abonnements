import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default async function ServicePage({
  params,
}: {
  params: { id: string };
}) {

  const [maxPrice, setMaxPrice] = useState("");
  const [onlyNoAds, setOnlyNoAds] = useState(false);

  const { data: service } = await supabase
    .from("services")
    .select("*")
    .ilike("name", params.id)
    .single();

  if (!service) return <div>Service introuvable</div>;

  const { data: plans } = await supabase
    .from("plans")
    .select("*")
    .eq("service_id", service.id);

  return (
    <div style={{
      padding: 40,
      fontFamily: "Arial",
      background: "#0f172a",
      minHeight: "100vh",
      color: "white"
    }}>
      <h1>{service.name}</h1>

      <table style={{
        width: "100%",
        marginTop: 20,
        background: "#1e293b",
        borderCollapse: "collapse"
      }}>
        <div>
          <input
            placeholder="Prix max"
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <label>
            <input
              type="checkbox"
              onChange={(e) => setOnlyNoAds(e.target.checked)}
            />
            Sans pubs
          </label>
        </div>
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
          {plans
            ?.filter((p: any) => {
              return (
                (!maxPrice || p.price <= maxPrice) &&
                (!onlyNoAds || p.ads === false)
              );
            })
            .map((p: any) => (
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

export async function generateMetadata({ params }: any) {
  return {
    title: `${params.id} - comparateur abonnements`,
    description: `Compare ${params.id} : prix, qualité, options et abonnements.`,
  };
}