import ServiceClient from "./service-client";

import { supabase } from "@/lib/supabase";

export async function generateMetadata({ params }: any) {
  return {
    title: `${params.id} - comparateur abonnements`,
    description: `Compare ${params.id} : prix, qualité, options et abonnements.`,
  };
}

export default async function ServicePage({
  params,
}: {
  params: { id: string };
}) {
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
    <ServiceClient service={service} plans={plans || []} />
  );
}