import { getContentMetrics } from "@/lib/content/metrics";
import { collections } from "@/lib/content/collections";
import { BarList, Card, PageTitle, StatTile, StatusPill } from "./_components/ui";
import AdminLink from "./_components/AdminLink";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default async function DashboardPage() {
  const m = await getContentMetrics();
  const missingActive = m.assets.missing.filter((x) => x.active);

  return (
    <>
      <PageTitle
        title="Dashboard"
        description="Everything on the site at a glance. Inactive records are hidden from visitors; featured ones appear on the homepage."
        actions={
          <AdminLink path="/report" className="primary">
            Report & PDF export
          </AdminLink>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatTile label="Total records" value={m.totals.records} hint={`${m.collections.length} collections`} />
        <StatTile label="Live on site" value={m.totals.active} hint={`${m.totals.featured} featured on homepage`} />
        <StatTile label="Inactive" value={m.totals.inactive} hint="Hidden from visitors" />
        <StatTile label="Images in public/assets" value={m.assets.onDisk} hint={`${m.assets.referenced} referenced by records`} />
        <StatTile
          label="Missing images"
          value={m.assets.missing.length}
          tone={missingActive.length ? "warn" : "default"}
          hint={missingActive.length ? `${missingActive.length} on active records` : "None on active records"}
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {m.collections.map((c) => (
          <Card key={c.key}>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-manrope text-[17px] font-bold text-dark">{c.label}</h2>
              <AdminLink path={`/${c.key}`} className="link">
                Manage
              </AdminLink>
            </div>
            <dl className="grid grid-cols-3 gap-2 font-inter">
              {[
                ["Total", c.total],
                ["Active", c.active],
                ["Featured", c.featuredLimit ? `${c.featured}/${c.featuredLimit}` : c.featured],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <dt className="text-[12px] text-body/60">{label}</dt>
                  <dd className="font-manrope text-[22px] font-bold tabular-nums text-dark">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 font-inter text-[12px] text-body/60">{collections[c.key].description}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Images by folder">
          <BarList rows={m.assets.byFolder.map((f) => ({ label: f.folder, value: f.count }))} unit="images" />
          <p className="mt-4 font-inter text-[12px] text-body/60">
            {m.assets.unused.length} image{m.assets.unused.length === 1 ? "" : "s"} not used by any record (footer excluded).
            {m.assets.source === "manifest" && " Listing comes from the build-time manifest."}
          </p>
        </Card>

        <Card title="Missing images">
          {m.assets.missing.length === 0 ? (
            <p className="font-inter text-[14px] text-body/70">Every referenced image exists in public/assets.</p>
          ) : (
            <ul className="divide-y divide-border">
              {m.assets.missing.map((x) => (
                <li key={`${x.collection}-${x.id}-${x.path}`} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <AdminLink path={`/${x.collection}/${x.id}`} className="link">
                      {x.title}
                    </AdminLink>
                    <p className="truncate font-mono text-[12px] text-body/60" title={x.path}>
                      {x.path}
                    </p>
                  </div>
                  <StatusPill active={x.active} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Recently updated" className="lg:col-span-2">
          <ul className="divide-y divide-border">
            {m.recent.map((r) => (
              <li key={`${r.collection}-${r.id}`} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                <div>
                  <AdminLink path={`/${r.collection}/${r.id}`} className="link">
                    {r.title}
                  </AdminLink>
                  <span className="ml-2 font-inter text-[12px] text-body/60">{collections[r.collection].singular}</span>
                </div>
                <div className="flex items-center gap-3">
                  <time dateTime={r.updatedAt} className="font-inter text-[12px] text-body/60">
                    {formatDate(r.updatedAt)}
                  </time>
                  <StatusPill active={r.active} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
