import { getContentMetrics } from "@/lib/content/metrics";
import { collectionKeys, collections, recordImages, recordTitle } from "@/lib/content/collections";
import { Card, PageTitle, StatTile } from "../_components/ui";
import ReportActions from "../_components/ReportActions";

export const dynamic = "force-dynamic";

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

/** Printable report. "Download PDF" opens the browser's print dialog with Save as PDF. */
export default async function ReportPage() {
  const m = await getContentMetrics();

  return (
    <div className="report">
      <PageTitle
        title="Content report"
        description={`Generated ${new Date(m.generatedAt).toLocaleString("en-GB")} · Storage: ${m.store.kind === "upstash" ? "Upstash Redis" : "local JSON files"}`}
        actions={<ReportActions records={m.records} />}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 print:grid-cols-4">
        <StatTile label="Total records" value={m.totals.records} />
        <StatTile label="Live on site" value={m.totals.active} />
        <StatTile label="Images on disk" value={m.assets.onDisk} hint={`${m.assets.referenced} referenced`} />
        <StatTile
          label="Missing images"
          value={m.assets.missing.length}
          tone={m.assets.missing.some((x) => x.active) ? "warn" : "default"}
          hint={`${m.assets.missing.filter((x) => x.active).length} on active records`}
        />
      </div>

      <div className="space-y-6">
        {collectionKeys.map((key) => {
          const def = collections[key];
          const stats = m.collections.find((c) => c.key === key)!;
          return (
            <Card key={key} title={`${def.label} · ${stats.active} active of ${stats.total}`}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse font-inter text-[13px]">
                  <caption className="sr-only">{def.label}</caption>
                  <thead>
                    <tr className="border-b border-border text-left text-body/60">
                      <th scope="col" className="py-2 pr-3 font-medium">#</th>
                      <th scope="col" className="py-2 pr-3 font-medium">Title</th>
                      <th scope="col" className="py-2 pr-3 font-medium">Slug</th>
                      <th scope="col" className="py-2 pr-3 font-medium">Status</th>
                      <th scope="col" className="py-2 pr-3 font-medium">Featured</th>
                      <th scope="col" className="py-2 pr-3 text-right font-medium">Images</th>
                      <th scope="col" className="py-2 font-medium">Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {m.records[key].map((r, i) => (
                      <tr key={r.id} className="border-b border-border last:border-0">
                        <td className="py-2 pr-3 tabular-nums text-body/60">{i + 1}</td>
                        <td className="py-2 pr-3 font-medium text-dark">{recordTitle(def, r)}</td>
                        <td className="py-2 pr-3 font-mono text-[12px] text-body/70">{r.slug}</td>
                        <td className="py-2 pr-3">{r.active ? "Active" : "Inactive"}</td>
                        <td className="py-2 pr-3">{r.featured ? "Yes" : "–"}</td>
                        <td className="py-2 pr-3 text-right tabular-nums">{recordImages(def, r).length}</td>
                        <td className="py-2 text-body/70">{fmt(r.updatedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          );
        })}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 print:grid-cols-2">
          <Card title="Images by folder">
            <table className="w-full font-inter text-[13px]">
              <tbody>
                {m.assets.byFolder.map((f) => (
                  <tr key={f.folder} className="border-b border-border last:border-0">
                    <th scope="row" className="py-1.5 text-left font-normal text-body/80">{f.folder}</th>
                    <td className="py-1.5 text-right tabular-nums">{f.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card title={`Missing images (${m.assets.missing.length})`}>
            {m.assets.missing.length === 0 ? (
              <p className="font-inter text-[13px] text-body/70">None.</p>
            ) : (
              <ul className="space-y-1.5 font-inter text-[12px]">
                {m.assets.missing.map((x) => (
                  <li key={`${x.collection}-${x.id}-${x.path}`}>
                    <span className="font-medium text-dark">{x.title}</span> {x.active ? "" : "(inactive)"}
                    <br />
                    <code className="break-all text-body/60">{x.path}</code>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
