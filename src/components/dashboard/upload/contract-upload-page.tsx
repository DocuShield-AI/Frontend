"use client";

import { useRef, useState } from "react";
import { Check, FileText, ShieldCheck, Sparkles, UploadCloud, X } from "lucide-react";
import { ACCEPTED_CONTRACT_TYPES, MAX_UPLOAD_SIZE } from "@/validations/auth/upload";
import { UploadMorphButton } from "./upload-morph-button";

type UploadState = "idle" | "ready" | "uploading" | "complete";

export function ContractUploadPage() {
  const [state, setState] = useState<UploadState>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function selectFile(selectedFile?: File) {
    if (!selectedFile) return;
    if (!(ACCEPTED_CONTRACT_TYPES as readonly string[]).includes(selectedFile.type) || selectedFile.size > MAX_UPLOAD_SIZE) {
      setError("Choose a PDF, DOC, or DOCX file smaller than 25 MB.");
      return;
    }
    setError("");
    setFile(selectedFile);
    setState("ready");
  }

  function beginDemoUpload() { setState("uploading"); }

  function finishDemoUpload() {
    window.setTimeout(() => {
      if (file) setUploadedFiles((current) => [...current, file]);
      setState("complete");
      setFile(null);
    }, 800);
  }

  return <section className={`upload-page ${state === "complete" ? "upload-page--complete" : ""}`}>
    <header className="upload-page__header"><div><p className="upload-page__eyebrow">Workspace / Contracts</p><h1>Upload a contract</h1><p>Bring an agreement into DocuShield for a clear, clause-level review.</p></div><span className="upload-page__secure"><ShieldCheck size={16} />Secure document processing</span></header>
    <div className="upload-layout"><article className="upload-card upload-drop-card"><div className="upload-card__intro"><span><Sparkles size={19} /></span><div><h2>Start a contract review</h2><p>Upload a legal agreement and DocuShield will extract, classify, and surface risk.</p></div></div>
      {(state === "idle" || state === "complete") && <UploadDropzone inputRef={inputRef} onSelect={selectFile} />}
      {error && <p className="upload-error">{error}</p>}
      {file && (state === "ready" || state === "uploading") && <UploadProcessingPanel file={file}><UploadMorphButton autoStart onStart={beginDemoUpload} onComplete={finishDemoUpload} /></UploadProcessingPanel>}
      {state === "complete" && <UploadSuccessNotice />}
      {uploadedFiles.length > 0 && <UploadQueue files={uploadedFiles} />}
    </article><UploadIllustration /></div>
  </section>;
}

function UploadDropzone({ inputRef, onSelect }: { inputRef: React.RefObject<HTMLInputElement | null>; onSelect: (file?: File) => void }) {
  return <label className="upload-dropzone" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); onSelect(event.dataTransfer.files[0]); }}><input ref={inputRef} type="file" accept=".pdf,.doc,.docx" onChange={(event) => onSelect(event.target.files?.[0])} /><div className="upload-orbit"><i /><i /><i /><span><UploadCloud size={27} /></span></div><strong>Drag and drop your contract</strong><p>PDF, DOC, or DOCX · maximum file size 25 MB</p><button type="button" onClick={(event) => { event.preventDefault(); inputRef.current?.click(); }}>Browse files</button></label>;
}

function UploadProcessingPanel({ children, file }: { children: React.ReactNode; file: File }) {
  return <section className="upload-processing-panel" aria-live="polite"><span className="upload-processing-panel__file"><FileText size={18} />{file.name}</span><h3>Preparing your contract</h3><p>Encrypting and analysing your document securely.</p>{children}</section>;
}

function UploadSuccessNotice() { return <div className="upload-success-notice"><span><Check size={22} /></span><div><strong>Contract uploaded successfully</strong><p>It has been added to your review queue below.</p></div></div>; }

function UploadQueue({ files }: { files: File[] }) { return <section className="upload-queue"><div className="upload-queue__header"><h3>Upload queue</h3><span>{files.length} {files.length === 1 ? "contract" : "contracts"}</span></div><div>{files.map((uploadedFile, index) => <UploadFileCard key={`${uploadedFile.name}-${uploadedFile.lastModified}-${index}`} file={uploadedFile} state="complete" onRemove={() => undefined} />)}</div></section>; }

function UploadFileCard({ file, state, onRemove }: { file: File; state: UploadState; onRemove: () => void }) { const progress = state === "uploading" ? 68 : state === "complete" ? 100 : 0; return <div className="upload-file-card"><span className="upload-file-card__type"><FileText size={20} /></span><div><strong>{file.name}</strong><p>{Math.max(1, Math.round(file.size / 1024))} KB · {state === "complete" ? "Ready for review" : state === "uploading" ? "Uploading and preparing…" : "Ready to analyse"}</p>{state !== "ready" && <span className="upload-progress"><i style={{ width: `${progress}%` }} /></span>}</div>{state === "complete" ? <span className="upload-file-card__check"><Check size={16} /></span> : <button onClick={onRemove} aria-label="Remove selected file"><X size={17} /></button>}</div>; }

function UploadIllustration() { return <aside className="upload-card upload-showcase"><div className="upload-showcase__glow" /><div className="upload-showcase__badge"><ShieldCheck size={17} />Encrypted in transit</div><div className="upload-documents" aria-hidden="true"><div><FileText size={21} /><span>MSA</span><i /></div><div><FileText size={21} /><span>NDA</span><i /></div><div><FileText size={21} /><span>DPA</span><i /></div></div><div className="upload-showcase__copy"><span><Sparkles size={17} /></span><h2>Clarity, in every clause.</h2><p>Built for legal teams that need to know what matters before signing.</p></div><ul><li><Check size={15} />Extract key terms</li><li><Check size={15} />Identify risk signals</li><li><Check size={15} />Prepare human review</li></ul></aside>; }
