import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, Upload, CheckCircle, Clock, FileCheck, 
  Trash2, ShieldCheck, PenTool, RotateCcw, AlertCircle 
} from 'lucide-react';

// --- TYPESCRIPT SCHEMAS ---
interface LegalDocument {
  id: string;
  name: string;
  type: string;
  status: 'Draft' | 'In Review' | 'Signed';
  uploadedAt: string;
  content: string;
}

const DocumentChamber: React.FC = () => {
  // --- DATABASE STATE ---
  const [documents, setDocuments] = useState<LegalDocument[]>([
    { 
      id: 'doc-1', 
      name: 'Seed_Round_Term_Sheet_Nexus.pdf', 
      type: 'Term Sheet', 
      status: 'In Review', 
      uploadedAt: '2026-05-15',
      content: 'This Term Sheet summarizes the principal terms of the Series Seed Preferred Stock financing of BusinessNexus Platform. Total Investment Amount: $500,000 USD at a Pre-Money Valuation of $4,500,000 USD. Investor: Alpha Ventures Consortium.'
    },
    { 
      id: 'doc-2', 
      name: 'Mutual_Non_Disclosure_Agreement.pdf', 
      type: 'NDA', 
      status: 'Signed', 
      uploadedAt: '2026-05-10',
      content: 'Mutual Non-Disclosure Agreement entered into by and between BusinessNexus Founders and Capital Partners. Both entities agree to protect and secure proprietary workspace source architectures and investor ledger transaction pipelines.'
    }
  ]);

  const [selectedDocId, setSelectedDocId] = useState<string>('doc-1');
  const [customName, setCustomName] = useState<string>('');
  const [customContent, setCustomContent] = useState<string>('');
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);

  // --- CANVAS SIGNATURE PAD REFERENCES ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef<boolean>(false);

  const selectedDoc = documents.find(d => d.id === selectedDocId);

  // --- INITIALIZE SIGNATURE DRAWING SURFACE EVENTS ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas high resolution scaling line styles
    ctx.strokeStyle = '#1E3A8A'; // Deep Navy Ink
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [selectedDocId]);

  // --- CANVAS HANDLERS ---
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    draw(e);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.beginPath(); // Reset drawing path line segment
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Map global screen bounds to localized canvas coordinate rules
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearSignaturePad = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // --- BUSINESS LOGIC ACTIONS ---
  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName || !customContent) return;

    const newDoc: LegalDocument = {
      id: 'doc-' + Date.now(),
      name: customName.endsWith('.pdf') ? customName : `${customName}.pdf`,
      type: 'Contract',
      status: 'Draft',
      uploadedAt: new Date().toISOString().split('T')[0],
      content: customContent
    };

    setDocuments([...documents, newDoc]);
    setSelectedDocId(newDoc.id);
    setCustomName('');
    setCustomContent('');
    setShowUploadForm(false);
  };

  const handleApplySignature = () => {
    setDocuments(prevDocs => 
      prevDocs.map(d => d.id === selectedDocId ? { ...d, status: 'Signed' } : d)
    );
    clearSignaturePad();
  };

  const handleDeleteDocument = (id: string) => {
    const filtered = documents.filter(d => d.id !== id);
    setDocuments(filtered);
    if (filtered.length > 0) {
      setSelectedDocId(filtered[0].id);
    }
  };

  // --- UI BADGE COMPONENT HELPER ---
  const renderStatusBadge = (status: 'Draft' | 'In Review' | 'Signed') => {
    const baseStyle = { padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' };
    
    switch (status) {
      case 'Signed':
        return <span style={{ ...baseStyle, backgroundColor: '#10B98115', color: '#10B981', border: '1px solid #10B98140' }}><FileCheck size={12} /> Signed</span>;
      case 'In Review':
        return <span style={{ ...baseStyle, backgroundColor: '#F59E0B15', color: '#F59E0B', border: '1px solid #F59E0B40' }}><Clock size={12} /> In Review</span>;
      default:
        return <span style={{ ...baseStyle, backgroundColor: '#64748B15', color: '#64748B', border: '1px solid #64748B40' }}><AlertCircle size={12} /> Draft</span>;
    }
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif', backgroundColor: '#F8F9FA', minHeight: '100vh', color: '#1E293B' }}>
      
      {/* CHAMBER HERO PANEL */}
      <div style={{ marginBottom: '24px', background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #E3E8EE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck color="#0D6EFD" size={28} /> Secure Document Processing Chamber
          </h1>
          <p style={{ color: '#8B96A5', margin: '6px 0 0 0', fontSize: '14px' }}>
            Review binding venture sheets, upload investment contracts, and execute digital signatures on screen.
          </p>
        </div>
        <button 
          onClick={() => setShowUploadForm(!showUploadForm)}
          style={{ padding: '8px 16px', backgroundColor: '#0D6EFD', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Upload size={16} /> Prepare Document
        </button>
      </div>

      {/* SPLIT TWO-COLUMN MAIN WORKSPACE MATRIX */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: DOCUMENT DIRECTORY ARCHIVE NAVIGATION LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* EXPANDABLE QUICK UPLOAD DOCK FORM */}
          {showUploadForm && (
            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid #0D6EFD', boxShadow: '0 4px 12px rgba(13,110,253,0.08)' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold' }}>Draft New Agreement</h3>
              <form onSubmit={handleCreateDocument}>
                <div style={{ marginBottom: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="Document Title (e.g., Series_A_NDA)" 
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    style={{ width: '100%', padding: '8px', border: '1px solid #E3E8EE', borderRadius: '4px', fontSize: '13px' }}
                    required 
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <textarea 
                    placeholder="Enter full contract terms and clauses..." 
                    rows={4}
                    value={customContent}
                    onChange={(e) => setCustomContent(e.target.value)}
                    style={{ width: '100%', padding: '8px', border: '1px solid #E3E8EE', borderRadius: '4px', fontSize: '12px', resize: 'vertical' }}
                    required 
                  />
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setShowUploadForm(false)} style={{ background: 'none', border: 'none', fontSize: '12px', cursor: 'pointer', color: '#64748B' }}>Cancel</button>
                  <button type="submit" style={{ padding: '6px 12px', background: '#0D6EFD', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', fontWeight: '500' }}>Save to Drafts</button>
                </div>
              </form>
            </div>
          )}

          {/* MASTER FILE REPEATER SHEET CONTAINER */}
          <div style={{ background: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid #E3E8EE' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Available Repositories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {documents.map((doc) => (
                <div 
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  style={{ 
                    padding: '12px', 
                    borderRadius: '6px', 
                    border: doc.id === selectedDocId ? '2px solid #0D6EFD' : '1px solid #E3E8EE', 
                    backgroundColor: doc.id === selectedDocId ? '#0D6EFD05' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: '8px', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
                      <FileText size={18} color={doc.id === selectedDocId ? "#0D6EFD" : "#64748B"} style={{ marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B', wordBreak: 'break-all' }}>{doc.name}</div>
                        <div style={{ fontSize: '11px', color: '#8B96A5', marginTop: '2px' }}>Uploaded: {doc.uploadedAt}</div>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Avoid selecting document when hitting delete
                        handleDeleteDocument(doc.id);
                      }}
                      style={{ background: 'none', border: 'none', color: '#DC3545', cursor: 'pointer', padding: '2px' }}
                      title="Purge Document"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div style={{ marginTop: '8px', textAlign: 'right' }}>
                    {renderStatusBadge(doc.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: EXPANDED ACTIVE DOCUMENT PREVIEWER & SIGNATURE CORE ENGINE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {selectedDoc ? (
            <>
              {/* COMPONENT SHEET A: DOCUMENT DISPLAY VIEWER */}
              <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #E3E8EE', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ borderBottom: '1px solid #E3E8EE', paddingBottom: '14px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{selectedDoc.name}</h2>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#8B96A5' }}>Type Classification: <strong>{selectedDoc.type}</strong></p>
                  </div>
                  {renderStatusBadge(selectedDoc.status)}
                </div>

                {/* SIMULATED CONTENT VIEWPORT */}
                <div style={{ background: '#F8F9FA', padding: '20px', borderRadius: '6px', border: '1px solid #E3E8EE', fontSize: '14px', lineHeight: '1.6', color: '#334155', minHeight: '160px', whiteSpace: 'pre-wrap', fontFamily: 'Georgia, serif' }}>
                  {selectedDoc.content}
                </div>
              </div>

              {/* COMPONENT SHEET B: CRYPTOGRAPHIC HAND-DRAWN PAD CONTROLLER */}
              <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #E3E8EE' }}>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PenTool size={18} color="#0D6EFD" /> Secure E-Signature Verification Matrix
                </h3>
                <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#8B96A5' }}>
                  Sign with your trackpad or cursor inside the bounding grid below. Binding legal agreements follow verification approval.
                </p>

                {selectedDoc.status === 'Signed' ? (
                  <div style={{ padding: '32px', textAlign: 'center', background: '#10B98108', border: '2px dashed #10B98140', borderRadius: '8px' }}>
                    <CheckCircle size={40} color="#10B981" style={{ margin: '0 auto 10px' }} />
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#10B981' }}>Document Fully Verified & Signed</div>
                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Cryptographic token successfully stamped into ledger stream.</div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {/* DRAWING CANVAS FIELD ELEMENT */}
                    <div style={{ position: 'relative', backgroundColor: '#FAFAFA', border: '2px dashed #CBD5E1', borderRadius: '8px', overflow: 'hidden', height: '140px' }}>
                      <canvas 
                        ref={canvasRef}
                        width={600}
                        height={140}
                        onMouseDown={startDrawing}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onMouseMove={draw}
                        style={{ width: '100%', height: '100%', cursor: 'crosshair', display: 'block' }}
                      />
                      <div style={{ position: 'absolute', bottom: '8px', right: '12px', fontSize: '11px', color: '#94A3B8', pointerEvents: 'none', userSelect: 'none' }}>
                        X___________________________ Signature Line
                      </div>
                    </div>

                    {/* CONTROL TOGGLE HOOK BUTTON BAR STRIP */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button 
                        onClick={clearSignaturePad}
                        style={{ padding: '6px 12px', background: 'none', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B', fontWeight: '500' }}
                      >
                        <RotateCcw size={12} /> Clear Pad
                      </button>
                      <button 
                        onClick={handleApplySignature}
                        style={{ padding: '8px 18px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 6px rgba(16,185,129,0.2)' }}
                      >
                        Execute & Apply Signature
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ background: '#ffffff', padding: '40px', borderRadius: '8px', border: '1px solid #E3E8EE', textAlign: 'center', color: '#8B96A5' }}>
              <FileText size={48} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
              <p style={{ margin: 0, fontSize: '14px' }}>No active documents found. Draft or upload a deal framework above to initiate workflow tracking.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default DocumentChamber;
