import React, { useState } from 'react';
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, Send, 
  DollarSign, History, ShieldAlert, CheckCircle2, AlertCircle 
} from 'lucide-react';

// --- TYPESCRIPT MATRIX SCHEMAS ---
interface Transaction {
  id: string;
  type: 'Deposit' | 'Withdrawal' | 'Deal Transfer';
  amount: number;
  sender: string;
  receiver: string;
  timestamp: string;
  status: 'Completed' | 'Pending' | 'In Escrow';
}

const QuantumWallet: React.FC = () => {
  // --- BANK BALANCE LEDGER STATE ---
  const [balance, setBalance] = useState<number>(125400.00);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'TX-9921', type: 'Deal Transfer', amount: 50000.00, sender: 'Sarah Jenkins (VC Partner)', receiver: 'Nexus Escrow Pool', timestamp: '2026-05-24 14:32', status: 'In Escrow' },
    { id: 'TX-9874', type: 'Deposit', amount: 75000.00, sender: 'Self (Corporate Checking)', receiver: 'Nexus Wallet Pool', timestamp: '2026-05-20 09:15', status: 'Completed' },
    { id: 'TX-9541', type: 'Withdrawal', amount: 4600.00, sender: 'Nexus Wallet Pool', receiver: 'External Bank SVB', timestamp: '2026-05-11 16:45', status: 'Completed' }
  ]);

  // --- FORM OVERLAY INTERACTIVE STATES ---
  const [actionType, setActionType] = useState<'Deposit' | 'Withdraw' | 'Transfer' | null>(null);
  const [inputAmount, setInputAmount] = useState<string>('');
  const [recipientNode, setRecipientNode] = useState<string>('');

  // --- TRANSACTION HANDLER ENGINE ---
  const handleExecuteTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(inputAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    if (actionType === 'Withdraw' && parsedAmount > balance) {
      alert("Ledger Error: Insolvent transaction depth. Allocation exceeds pool limits.");
      return;
    }

    let newTx: Transaction = {
      id: 'TX-' + Math.floor(1000 + Math.random() * 9000),
      type: actionType === 'Deposit' ? 'Deposit' : actionType === 'Withdraw' ? 'Withdrawal' : 'Deal Transfer',
      amount: parsedAmount,
      sender: actionType === 'Deposit' ? 'External Source' : 'Nexus Wallet Pool',
      receiver: actionType === 'Transfer' ? recipientNode : actionType === 'Withdraw' ? 'External Checking Account' : 'Nexus Wallet Pool',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: actionType === 'Transfer' ? 'In Escrow' : 'Completed'
    };

    // Calculate tracking metrics adjustment vectors
    if (actionType === 'Deposit') {
      setBalance(prev => prev + parsedAmount);
    } else {
      setBalance(prev => prev - parsedAmount);
    }

    setTransactions([newTx, ...transactions]);
    setInputAmount('');
    setRecipientNode('');
    setActionType(null);
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif', backgroundColor: '#F8F9FA', minHeight: '100vh', color: '#1E293B' }}>
      
      {/* FINANCIAL LEDGER HEADER BANNER */}
      <div style={{ marginBottom: '24px', background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #E3E8EE' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Wallet color="#0D6EFD" size={28} /> Capital Escrow Ledger & Vault
        </h1>
        <p style={{ color: '#8B96A5', margin: '6px 0 0 0', fontSize: '14px' }}>
          Simulate real-time multi-layered venture funding transactions, handle deal escrow accounts, and log contract token transfers.
        </p>
      </div>

      {/* BLOCK DATA DISPLAY SPLIT STRIP */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginBottom: '24px', alignItems: 'start' }}>
        
        {/* COMPONENT BOX 1: WALLET METRIC BOARD */}
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '24px', borderRadius: '12px', color: '#ffffff', boxShadow: '0 4px 20px rgba(15,23,42,0.15)' }}>
          <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Liquidity Pool Balance
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', margin: '12px 0', display: 'flex', alignItems: 'center', fontFamily: 'monospace' }}>
            ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '11px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', background: '#10B98115', padding: '4px 8px', borderRadius: '4px', width: 'max-content' }}>
            ● Encrypted Sandbox Node Active
          </div>

          {/* ACTION BUTTON GRID PANELS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '24px' }}>
            <button 
              onClick={() => setActionType('Deposit')}
              style={{ padding: '10px', background: '#334155', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <ArrowDownLeft size={14} color="#10B981" /> Deposit
            </button>
            <button 
              onClick={() => setActionType('Withdraw')}
              style={{ padding: '10px', background: '#334155', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <ArrowUpRight size={14} color="#EF4444" /> Withdraw
            </button>
          </div>
          <button 
            onClick={() => setActionType('Transfer')}
            style={{  width: '100%', marginTop: '10px', padding: '12px', background: '#0D6EFD', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(13,110,253,0.2)' }}
          >
            <Send size={14} /> Execute Deal Transfer Flow
          </button>
        </div>

        {/* COMPONENT BOX 2: POP-UP INTERACTIVE ACTION CONSOLE CONTEXT */}
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #E3E8EE', minHeight: '190px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {!actionType ? (
            <div style={{ textAlign: 'center', color: '#8B96A5' }}>
              <ShieldAlert size={36} style={{ margin: '0 auto 10px', opacity: 0.4 }} />
              <div style={{ fontSize: '14px', fontWeight: '600' }}>Awaiting Transaction Pipeline Signal</div>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>Select an allocation framework above to calculate secure ledger mutations.</p>
            </div>
          ) : (
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <DollarSign size={18} color="#0D6EFD" /> Formulate {actionType} Workflow Allocation
              </h3>
              <form onSubmit={handleExecuteTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: actionType === 'Transfer' ? '1fr 1fr' : '1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase', color: '#64748B' }}>Amount ($ USD)</label>
                    <input 
                      type="number" 
                      placeholder="e.g., 25000" 
                      value={inputAmount} 
                      onChange={(e) => setInputAmount(e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #E3E8EE', borderRadius: '4px', fontSize: '14px', fontFamily: 'monospace' }} 
                      required 
                    />
                  </div>
                  {actionType === 'Transfer' && (
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase', color: '#64748B' }}>Target Entrepreneur / Startup Node</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Alex Rivera (Nexus Tech)" 
                        value={recipientNode} 
                        onChange={(e) => setRecipientNode(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #E3E8EE', borderRadius: '4px', fontSize: '14px' }} 
                        required 
                      />
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '4px' }}>
                  <button type="button" onClick={() => setActionType(null)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                  <button type="submit" style={{ padding: '8px 18px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>Commit Matrix Ledger</button>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>

      {/* HISTORICAL LEDGER TRANSACTION MATRIX HISTORY GRID TABLE */}
      <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #E3E8EE' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <History size={18} color="#0D6EFD" /> Immutable Auditing History Matrix
        </h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E3E8EE', color: '#64748B' }}>
                <th style={{ padding: '12px 8px', fontWeight: '600' }}>Reference Hash</th>
                <th style={{ padding: '12px 8px', fontWeight: '600' }}>Allocation Type</th>
                <th style={{ padding: '12px 8px', fontWeight: '600' }}>Asset Source</th>
                <th style={{ padding: '12px 8px', fontWeight: '600' }}>Asset Destination</th>
                <th style={{ padding: '12px 8px', fontWeight: '600' }}>Timestamp</th>
                <th style={{ padding: '12px 8px', fontWeight: '600', textAlign: 'right' }}>Volume ($)</th>
                <th style={{ padding: '12px 8px', fontWeight: '600', textAlign: 'center' }}>Ledger Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} style={{ borderBottom: '1px solid #E3E8EE' }}>
                  <td style={{ padding: '12px 8px', fontFamily: 'monospace', fontWeight: '600', color: '#0D6EFD' }}>{tx.id}</td>
                  <td style={{ padding: '12px 8px', fontWeight: '500' }}>{tx.type}</td>
                  <td style={{ padding: '12px 8px', color: '#475569' }}>{tx.sender}</td>
                  <td style={{ padding: '12px 8px', color: '#475569' }}>{tx.receiver}</td>
                  <td style={{ padding: '12px 8px', color: '#94A3B8' }}>{tx.timestamp}</td>
                  <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 'bold', color: tx.type === 'Withdrawal' || tx.type === 'Deal Transfer' ? '#DC2626' : '#16A34A' }}>
                    {tx.type === 'Withdrawal' || tx.type === 'Deal Transfer' ? '-' : '+'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '11px', 
                      fontWeight: 'bold',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: tx.status === 'Completed' ? '#10B98115' : tx.status === 'In Escrow' ? '#3B82F615' : '#F59E0B15',
                      color: tx.status === 'Completed' ? '#10B981' : tx.status === 'In Escrow' ? '#3B82F6' : '#F59E0B',
                      border: `1px solid ${tx.status === 'Completed' ? '#10B98130' : tx.status === 'In Escrow' ? '#3B82F630' : '#F59E0B30'}`
                    }}>
                      {tx.status === 'Completed' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default QuantumWallet;