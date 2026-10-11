import type { Paragraph } from "@/data/types";
import { externalAnchor } from "@/lib/site";

export function Prose({ paragraphs, className = "mt-3 space-y-3" }: { paragraphs: Paragraph[]; className?: string }) {
  return (
    <div className={className}>
      {paragraphs.map((parts, index) => (
        <p key={index} className="text-sm leading-7 text-ink">
          {parts.map((part, partIndex) =>
            typeof part === "string" ? (
              <span key={partIndex}>{part}</span>
            ) : (
              <a
                key={part.href}
                href={part.href}
                className="text-laurel underline decoration-line underline-offset-4 hover:text-terra"
                {...externalAnchor(part.href)}
              >
                {part.label}
              </a>
            ),
          )}
        </p>
      ))}
    </div>
  );
}
