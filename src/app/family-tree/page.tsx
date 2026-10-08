import type { Metadata } from "next";
import { Crumb } from "@/components/Crumb";
import { FamilyTreeView } from "@/components/FamilyTreeView";
import { CAVEATS, DYNASTIES, relationsOf, type Dynasty, type RelationPerson } from "@/data/family-tree";
import { rulerBySlug } from "@/data/rulers";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const description =
  "고조선·고구려·백제·신라·고려·조선의 가족관계도. 금색 선은 부모와 자식, 붉은 선은 부부, 보라 점선은 전승·이설·양자입니다. 조선 27왕의 실제 아버지를 구분합니다.";

export const metadata: Metadata = {
  title: "가족관계도",
  description,
  keywords: ["가족관계도", "조선 왕계", "고구려 왕계", "백제 왕계", "신라 왕계", "고려 왕계", "세종", "고종", "Family Tree"],
  alternates: { canonical: "/family-tree" },
  openGraph: {
    title: `가족관계도 · ${SITE_NAME}`,
    description,
    url: "/family-tree",
  },
};

for (const dynasty of DYNASTIES) {
  for (const node of dynasty.tree.nodes) {
    if (node.slug && !rulerBySlug(node.slug)) {
      throw new Error(`가족관계도 slug에 해당하는 인물 페이지가 없습니다: ${node.slug}`);
    }
  }
}

export default function FamilyTreePage() {
  const joseon = DYNASTIES.find((item) => item.id === "joseon")!;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "가족관계도", item: `${SITE_URL}/family-tree` },
        ],
      },
      {
        "@type": "WebPage",
        name: "가족관계도",
        description,
        inLanguage: "ko",
        url: `${SITE_URL}/family-tree`,
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      },
      {
        "@type": "ItemList",
        name: "조선 27왕",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: 27,
        itemListElement: joseon.succession!.map((item, index) => {
          const node = joseon.tree.byId.get(item.id)!;
          return {
            "@type": "ListItem",
            position: index + 1,
            name: `${node.ko} (${node.dates})`,
            url: node.href ? `${SITE_URL}${node.href}` : `${SITE_URL}/family-tree?dynasty=joseon&focus=${node.id}`,
          };
        }),
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Crumb items={[{ href: "/", label: "홈" }, { label: "가족관계도" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">FAMILY TREE</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">가족관계도</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
        왕조를 나누어, 누가 누구의 자녀인지 세대별로 그린 그림입니다. 예를 들어 세종은 태종의 아들이고, 선조는 명종의
        아들이 아니라 덕흥대원군의 아들입니다. 칸을 누르면 부모·배우자·자녀·형제가 밝아지고, 이 사이트에 글이 있으면
        그 페이지로 갑니다.
      </p>
      <FamilyTreeView />

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-ink">글로 읽는 가족관계</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
          그림과 같은 관계입니다. 이름을 누르면 그 사람으로 이동합니다. 형제는 아버지나 어머니 중 한 사람이 같아도
          묶입니다. 이복형제입니다. … 는 왕을 뺀 자리이지 부자 관계가 아닙니다.
        </p>
        {DYNASTIES.map((item) => (
          <DynastyProse key={item.id} dynasty={item} />
        ))}
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-ink">읽을 때 구분할 것</h2>
        <ul className="mt-4 space-y-4">
          {CAVEATS.map((item) => (
            <li key={item.id} className="rounded-md border border-line bg-card p-4 text-sm leading-7">
              <h3 className="font-serif text-lg text-ink">{item.title}</h3>
              <p className="mt-1 text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-7 text-muted">
          부모와 재위는 삼국사기, 삼국유사, 고려사, 조선왕조실록과 광개토왕릉비·무령왕릉 지석의 통설을 기준으로
          골랐습니다. 문장은 그대로 베끼지 않았습니다.{" "}
          <a className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" href="/sources">
            출처
          </a>
        </p>
      </section>
    </div>
  );
}

function DynastyProse({ dynasty }: { dynasty: Dynasty }) {
  return (
    <section id={`dynasty-${dynasty.id}`} className="mt-10 scroll-mt-28">
      <h3 className="font-serif text-2xl text-ink">
        {dynasty.ko} <span className="text-sm font-sans tracking-wide text-terra">{dynasty.en}</span>
      </h3>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">{dynasty.lede}</p>
      {dynasty.succession ? (
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm leading-7 text-ink">
          {dynasty.succession.map((item) => {
            const node = dynasty.tree.byId.get(item.id)!;
            return (
              <li key={item.id}>
                <a className="font-serif hover:text-terra" href={`/family-tree?dynasty=${dynasty.id}&focus=${node.id}`}>
                  {node.ko}
                </a>
                <span className="text-muted"> · {node.dates}. {item.note}</span>
              </li>
            );
          })}
        </ol>
      ) : null}
      {dynasty.tree.bands.map((band) => (
        <section key={band.id} className="mt-6">
          <h4 className="font-serif text-lg" style={{ color: band.color }}>
            {band.ko} <span className="text-xs font-sans tracking-wide text-terra">{band.en}</span>
          </h4>
          <p className="mt-1 text-sm leading-6 text-muted">{band.hint}</p>
          <ul className="mt-3 space-y-3">
            {band.nodeIds.map((id) => {
              const node = dynasty.tree.byId.get(id)!;
              if (node.marker === "gap") {
                return (
                  <li key={id} className="text-sm leading-7 text-muted">
                    … {node.summary}
                  </li>
                );
              }
              const rel = relationsOf(dynasty.id, id);
              return (
                <li key={id} className="border-b border-line/80 pb-3 text-sm leading-7">
                  <a href={`/family-tree?dynasty=${dynasty.id}&focus=${node.id}`} className="font-serif text-base text-ink hover:text-terra">
                    {node.ko}
                  </a>
                  <span className="text-muted"> / {node.english}</span>
                  <span className="ml-2 text-xs text-terra">{node.dates}</span>
                  {node.href ? (
                    <a href={node.href} className="ml-2 text-laurel">
                      인물 페이지
                    </a>
                  ) : null}
                  <span className="mt-0.5 block text-ink">{node.summary}</span>
                  {node.note ? <span className="mt-0.5 block text-xs leading-5 text-terra">점선: {node.note}</span> : null}
                  <span className="mt-1 block text-xs leading-5 text-muted">
                    <Kin dynastyId={dynasty.id} label="부모" people={rel.parents} />
                    <Kin dynastyId={dynasty.id} label="전승·이설" people={rel.variantParents} />
                    <Kin dynastyId={dynasty.id} label="양자" people={rel.adoptiveParents} />
                    <Kin dynastyId={dynasty.id} label="배우자" people={rel.spouses} />
                    <Kin dynastyId={dynasty.id} label="자녀" people={rel.children} />
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </section>
  );
}

function Kin({
  dynastyId,
  label,
  people,
}: {
  dynastyId: Dynasty["id"];
  label: string;
  people: RelationPerson[];
}) {
  if (!people.length) return null;
  return (
    <span className="mr-3 inline">
      {label}{" "}
      {people.map((person, index) => (
        <span key={person.id}>
          {index > 0 ? ", " : null}
          <a href={`/family-tree?dynasty=${dynastyId}&focus=${person.id}`} className="text-laurel underline decoration-line underline-offset-2 hover:text-terra">
            {person.ko}
          </a>
        </span>
      ))}
    </span>
  );
}
