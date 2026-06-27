export default function ComparisonTable({ plans }: any) {
  return (
    <table className="w-full mt-6 border">
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
        {plans.map((p: any) => (
          <tr key={p.id} className="text-center border-t">
            <td>
              <a href={`/service/${p.name.toLowerCase()}`}>
                {p.name}
              </a>
            </td>
            <td>{p.price} €</td>
            <td>{p.quality}</td>
            <td>{p.screens}</td>
            <td>{p.ads ? "Oui" : "Non"}</td>
            <td>{p.download ? "Oui" : "Non"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}