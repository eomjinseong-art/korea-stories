import { palaceTimeline } from "@/data/palace-timeline";
import { palaces, type PalaceSlug } from "@/data/palaces";

const columns: { slug: PalaceSlug; label: string }[] = palaces.map((palace) => ({
  slug: palace.slug,
  label: palace.name,
}));

export function PalaceTimeline() {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <caption className="sr-only">1394년부터 2023년까지 다섯 궁의 건립, 화재, 중건, 훼손, 복원</caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="sticky left-0 z-10 bg-bg px-2 py-2 text-xs font-medium text-muted">
              해
            </th>
            {columns.map((column) => (
              <th key={column.slug} scope="col" className="px-2 py-2 font-serif text-base font-medium text-ink">
                <a className="underline decoration-line underline-offset-4 hover:text-terra" href={`/palaces/${column.slug}`}>
                  {column.label}
                </a>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {palaceTimeline.map((row) => (
            <tr key={row.year} className="border-b border-line align-top">
              <th scope="row" className="sticky left-0 z-10 bg-bg px-2 py-3 text-xs font-medium text-terra">
                {row.year}
              </th>
              {columns.map((column) => (
                <td key={column.slug} className="px-2 py-3 leading-6 text-ink">
                  {row.cells[column.slug] ?? <span className="text-muted">—</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
