import React from "react";

const DEFAULT_DOI = "10.5281/zenodo.17294918";
const DOI_BASE_URL = "https://doi.org/";

const STATUS_STYLES = {
  live: {
    label: "Live Authorship",
    gradient: "from-emerald-500/30 via-emerald-500/20 to-emerald-400/10 text-emerald-200",
  },
  archived: {
    label: "Archived Log",
    gradient: "from-cyan-500/30 via-cyan-500/20 to-cyan-400/10 text-cyan-200",
  },
  draft: {
    label: "Draft Record",
    gradient: "from-amber-500/30 via-amber-500/20 to-amber-400/10 text-amber-200",
  },
};

/**
 * Renders a cryptographically aware authorship badge used throughout
 * The Agent Family properties. The badge surfaces a DOI, verification state,
 * and optional checksum to communicate canonical authorship provenance.
 */
export default function AuthorshipBadge({
  doi = DEFAULT_DOI,
  status = "live",
  issuedAt = "",
  checksum,
  className = "",
}) {
  const normalizedStatus = typeof status === "string" ? status.toLowerCase() : "live";
  const { label, gradient } = STATUS_STYLES[normalizedStatus] ?? {
    label: "Authorship Record",
    gradient: STATUS_STYLES.live.gradient,
  };

  const doiUrl = `${DOI_BASE_URL}${doi}`;

  return (
    <div
      className={[
        "relative isolate overflow-hidden rounded-2xl border border-white/20 bg-black/60 p-[1px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={["rounded-[1.5rem] bg-gradient-to-br", gradient].join(" ")}>
        <div className="grid gap-3 rounded-[inherit] bg-black/80 p-4 text-xs uppercase tracking-[0.28em] text-white/70 md:flex md:items-center md:justify-between md:gap-6">
          <div className="space-y-1">
            <span className="font-semibold text-white/90">Authorship Badge</span>
            <div className="flex flex-wrap items-center gap-2 text-[0.68rem] tracking-[0.24em] text-white/60">
              <span className="rounded-full border border-white/20 px-2 py-1 font-medium text-[0.62rem] uppercase text-white/70">
                {label}
              </span>
              {issuedAt ? (
                <span className="rounded-full border border-white/10 px-2 py-1 font-medium text-[0.62rem] uppercase text-white/50">
                  Issued {issuedAt}
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 text-left md:items-end md:text-right">
            <a
              href={doiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-emerald-100 transition hover:border-emerald-300/40 hover:bg-emerald-400/10 hover:text-emerald-50"
            >
              <span>DOI</span>
              <span className="font-mono text-[0.7rem] normal-case tracking-[0.12em] text-white/90">{doi}</span>
            </a>

            {checksum ? (
              <div className="flex flex-col items-start gap-1 text-[0.56rem] uppercase tracking-[0.24em] text-white/40 md:items-end">
                <span className="font-semibold text-white/60">SHA-256 Checksum</span>
                <code className="inline-flex max-w-[20rem] items-center break-all rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-[0.58rem] normal-case tracking-[0.08em] text-white/80">
                  {checksum}
                </code>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
