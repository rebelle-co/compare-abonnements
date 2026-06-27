import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data } = await supabase.from("services").select("*");

  return (
    <div>
      <h1>Abonnements</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}