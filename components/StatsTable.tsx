import { countryCodeToFlagEmoji } from "@/utils/countryCodeFlag";

export function StatsTable({ stats }: {stats: unknown}) {
  return (
    <table
      border={1}
      cellPadding={5}
      style={{ borderCollapse: "collapse", width: "100%" }}
    >
      <thead>
        <tr>
          <th>Country</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/*@ts-expect-error*/}
      {Object.entries(stats).map(([code, count]) => (
          <tr key={code}>
            <td>
              {countryCodeToFlagEmoji(code)} {code.toUpperCase()}
            </td>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/*@ts-expect-error*/}
            <td>{count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
