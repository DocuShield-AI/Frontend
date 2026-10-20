"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  ArrowUpDown,
  Download,
  Eye,
  FilePlus2,
  Filter,
  Grid2X2,
  List,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Upload,
} from "lucide-react";
import { demoContracts, demoUser } from "@/features/dashboard/demo-data";
import type { Contract } from "@/types/api";

type ViewMode = "list" | "grid";
type ContractTab = "existing" | "suggested";
const categories = [
  "Commercial",
  "Legal & compliance",
  "Procurement",
  "Data privacy",
];

export function ContractsMain() {
  const [contracts, setContracts] = useState(demoContracts);
  const [tab, setTab] = useState<ContractTab>("existing");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [query, setQuery] = useState("");
  const [sortNewest, setSortNewest] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const canUpload = demoUser.role !== "viewer";
  const visibleContracts = useMemo(
    () =>
      contracts
        .filter((contract) =>
          contract.name.toLowerCase().includes(query.toLowerCase()),
        )
        .sort((a, b) =>
          sortNewest
            ? +new Date(b.uploadedAt) - +new Date(a.uploadedAt)
            : a.name.localeCompare(b.name),
        ),
    [contracts, query, sortNewest],
  );
  const summary = {
    total: contracts.length,
    active: contracts.filter((contract) => contract.status === "ready").length,
    processing: contracts.filter(
      (contract) => !["ready", "failed"].includes(contract.status),
    ).length,
    review: contracts.filter((contract) => (contract.riskCount ?? 0) > 0)
      .length,
  };
  function addDemoUpload(file: File) {
    setContracts((current) => [
      {
        id: `demo-upload-${Date.now()}`,
        name: file.name,
        status: "queued",
        uploadedAt: new Date().toISOString(),
        uploadedBy: "Zayyam Ahmed",
        size: file.size,
      },
      ...current,
    ]);
  }

  return (
    <section className="contracts-main">
      <header className="contracts-main__header">
        <div>
          <p className="contracts-main__eyebrow">
            Workspace / Contract library
          </p>
          <h1>Contracts</h1>
          <p>Organize, analyse, and review your workspace agreements.</p>
        </div>
        <div className="contracts-main__controls">
          <label className="contracts-main__search">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search contracts..."
            />
          </label>
          <button className="contracts-main__round" aria-label="Open filters">
            <SlidersHorizontal size={17} />
          </button>
          <div className="contracts-main__profile">ZA</div>
        </div>
      </header>
      <section className="contracts-summary" aria-label="Contract summary">
        <SummaryCard
          label="Total contracts"
          value={summary.total}
          caption="All workspace agreements"
        />
        <SummaryCard
          label="Ready"
          value={summary.active}
          caption="Analysis is complete"
          tone="success"
        />
        <SummaryCard
          label="Processing"
          value={summary.processing}
          caption="Currently being analysed"
          tone="accent"
        />
        <SummaryCard
          label="Need review"
          value={summary.review}
          caption="High-risk clauses found"
          tone="warning"
        />
      </section>
      <section className="contracts-table-card">
        <div className="contracts-table-card__toolbar">
          <div className="contracts-tabs">
            <button
              className={tab === "existing" ? "is-active" : ""}
              onClick={() => setTab("existing")}
            >
              Existing
            </button>
            <button
              className={tab === "suggested" ? "is-active" : ""}
              onClick={() => setTab("suggested")}
            >
              Suggested
            </button>
          </div>
          <div className="contracts-toolbar-actions">
            <button
              className="contracts-pill-button"
              onClick={() => setSortNewest((current) => !current)}
            >
              <ArrowUpDown size={14} />
              Sort
            </button>
            <button className="contracts-pill-button">
              <Filter size={14} />
              Filter
            </button>
            <button className="contracts-pill-button contracts-pill-button--primary">
              <Download size={14} />
              Export
            </button>
            {canUpload && (
              <>
                <input
                  className="visually-hidden"
                  ref={inputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) addDemoUpload(file);
                    event.target.value = "";
                  }}
                />
                <button
                  className="contracts-pill-button contracts-pill-button--primary"
                  onClick={() => inputRef.current?.click()}
                >
                  <FilePlus2 size={15} />
                  Upload contract
                </button>
              </>
            )}
            <span className="contracts-view-toggle">
              <button
                aria-label="Grid view"
                className={viewMode === "grid" ? "is-active" : ""}
                onClick={() => setViewMode("grid")}
              >
                <Grid2X2 size={16} />
              </button>
              <button
                aria-label="List view"
                className={viewMode === "list" ? "is-active" : ""}
                onClick={() => setViewMode("list")}
              >
                <List size={16} />
              </button>
            </span>
          </div>
        </div>
        {viewMode === "list" ? (
          <ContractTable contracts={visibleContracts} />
        ) : (
          <ContractGrid contracts={visibleContracts} />
        )}
      </section>
    </section>
  );
}
function SummaryCard({
  label,
  value,
  caption,
  tone = "default",
}: {
  label: string;
  value: number;
  caption: string;
  tone?: "default" | "success" | "accent" | "warning";
}) {
  return (
    <article
      className={`contracts-summary-card contracts-summary-card--${tone}`}
    >
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{caption}</span>
    </article>
  );
}
function ContractTable({ contracts }: { contracts: Contract[] }) {
  return (
    <div className="contracts-table-scroll">
      <table className="contracts-table">
        <thead>
          <tr>
            <th>Contract name</th>
            <th>Status</th>
            <th>Source</th>
            <th>Uploaded</th>
            <th>Category</th>
            <th>
              <span className="visually-hidden">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract, index) => (
            <tr key={contract.id}>
              <td>
                <Link href={`/dashboard/contracts/${contract.id}`}>
                  {contract.name}
                </Link>
              </td>
              <td>
                <ContractStatusPill status={contract.status} />
              </td>
              <td>
                <span className="contracts-source-pill">Uploaded</span>
              </td>
              <td>
                {new Date(contract.uploadedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td>{categories[index % categories.length]}</td>
              <td>
                <div className="contracts-row-actions">
                  <button aria-label="Refresh contract">
                    <RefreshCw size={13} />
                  </button>
                  <Link
                    href={`/dashboard/contracts/${contract.id}`}
                    aria-label={`View ${contract.name}`}
                  >
                    <Eye size={14} />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {contracts.length === 0 && (
        <p className="contracts-empty">No contracts match your search.</p>
      )}
    </div>
  );
}
function ContractGrid({ contracts }: { contracts: Contract[] }) {
  return (
    <div className="contracts-grid">
      {contracts.map((contract, index) => (
        <Link
          href={`/dashboard/contracts/${contract.id}`}
          className="contracts-grid-card"
          key={contract.id}
        >
          <span className="contracts-grid-card__icon">
            <Upload size={18} />
          </span>
          <ContractStatusPill status={contract.status} />
          <strong>{contract.name}</strong>
          <p>{categories[index % categories.length]}</p>
          <small>{new Date(contract.uploadedAt).toLocaleDateString()}</small>
        </Link>
      ))}
    </div>
  );
}
function ContractStatusPill({ status }: { status: Contract["status"] }) {
  const labels: Record<Contract["status"], string> = {
    queued: "Queued",
    extracting: "Extracting",
    embedding: "Embedding",
    classifying: "In review",
    ready: "Ready",
    failed: "Failed",
  };
  return (
    <span className={`contracts-status contracts-status--${status}`}>
      <i />
      {labels[status]}
    </span>
  );
}
