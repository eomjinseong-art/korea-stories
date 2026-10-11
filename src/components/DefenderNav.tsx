const links = [
  { href: "/defenders", label: "두 갈래" },
  { href: "/defenders/timeline", label: "연표" },
  { href: "/defenders/quiz", label: "퀴즈" },
  { href: "/defenders#battles", label: "전투" },
  { href: "/defenders#films", label: "영화" },
];

export function DefenderNav({ current }: { current?: "home" | "timeline" | "quiz" }) {
  return (
    <nav aria-label="나라를 지킨 사람들" className="mt-4 flex flex-wrap gap-2 text-sm">
      {links.map((item) => {
        const here =
          (current === "home" && item.href === "/defenders") ||
          (current === "timeline" && item.href === "/defenders/timeline") ||
          (current === "quiz" && item.href === "/defenders/quiz");
        return here ? (
          <span key={item.href} aria-current="page" className="rounded-full bg-terra px-3 py-1 text-white">
            {item.label}
          </span>
        ) : (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full border border-line bg-card px-3 py-1 text-ink hover:border-terra"
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
