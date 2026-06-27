"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import SearchBar from "@/components/SearchBar";
import ComparisonTable from "@/components/ComparisonTable";

export default function Home() {
  const [plans, setPlans] = useState<any[]>([]);

  const search = async (query: string) => {
    const { data: services } = await supabase
      .from("services")
      .select("*")
      .ilike("name", `%${query}%`)
      .single();

    if (!services) return;

    const { data: plans } = await supabase
      .from("plans")
      .select("*")
      .eq("service_id", services.id);

    setPlans(plans || []);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Comparateur d’abonnements
      </h1>

      <SearchBar onSearch={search} />

      <ComparisonTable plans={plans} />
    </div>
  );
}