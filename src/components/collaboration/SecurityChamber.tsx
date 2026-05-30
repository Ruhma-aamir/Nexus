import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, KeyRound, Smartphone, CheckCircle, 
  Lock, Key, AlertTriangle, RefreshCw
} from 'lucide-react';

// --- MAIN FEATURE COMPONENT ---
const SecurityChamber: React.FC = () => {
  // --- STATE FOR PASSWORD METER ---
  const [password, setPassword] = useState<string>('');
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);

  // --- STATES FOR MULTI-STEP 2FA MODULE ---
  const [twoStepStage, setTwoStepStage] = useState<'Start' | 'EnteringOTP' | 'Verified'>('Start');
  const [otpArray, setOtpArray] = useState<string[]>(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState<string>('');
  
  // Create an array of refs to control automatic jumping between input boxes
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // --- PASSWORD STRENGTH CRITERIA ALGORITHMS ---
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score, label: 'None', color: '#CBD5E1' };

    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    switch (score) {
      case 4:
        return { score, label: 'Strong (Enterprise Grade)', color: '#10B981' };
      case 3:
        return { score, label: 'Medium (Good)', color: '#F59E0B' };
      case 2:
      case 1:
        return { score, label: 'Weak (Vulnerable)', color: '#EF4444' };
      default:
        return { score, label: 'None', color: '#CBD5E1' };
    }
  };

  const strength = calculateStrength(password);

  // --- TWO-FACTOR AUTHENTICATION HANDLERS ---
  const handleTrigger2FAFlow = () => {
    setTwoStepStage('EnteringOTP');
    setOtpArray(['', '', '', '', '', '']);
    setOtpError('');
    // Slight timeout ensures focus mounts after rendering
    setTimeout(() => otpRefs[0].current?.focus(), 50);
  };

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    const val = element.value.replace(/[^0-9]/g, ''); // Numbers only
    if (!val) return;

    const updatedOtp = [...otpArray];
    updatedOtp[index] = val.substring(val.length - 1); // Get latest single digit
    setOtpArray(updatedOtp);

    // Jump forward automatically if a number is inputted
    if (index < 5 && val) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace navigation backwards clean behavior
    if (e.key === 'Backspace') {
      if (!otpArray[index] && index > 0) {
        const updatedOtp = [...otpArray];
        updatedOtp[index - 1] = '';
        setOtpArray(updatedOtp);
        otpRefs[index - 1].current?.focus();
      } else {
        const updatedOtp = [...otpArray];
        updatedOtp[index] = '';
        setOtpArray(updatedOtp);
      }
    }
  };

  const verifyOtpCode = (e: React.FormEvent) => {
    e.preventDefault();
    const joinedCode = otpArray.join('');
    
    if (joinedCode.length < 6) {
      setOtpError('Incomplete code stream. Please supply all 6 verification nodes.');
      return;
    }

    // Secure simulated correct validation key code sequence
    if (joinedCode === '123456' || joinedCode === '777777') {
      setTwoStepStage('Verified');
      setOtpError('');
    } else {
      setOtpError('Invalid cryptographic identity token. Try "123456" for sandbox testing.');
    }
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif', backgroundColor: '#F8F9FA', minHeight: '100vh', color: '#1E293B' }}>
      
      {/* HEADER HERO STRIP */}
      <div style={{ marginBottom: '24px', background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #E3E8EE' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck color="#0D6EFD" size={28} /> Security Guardrail & Access Chamber
        </h1>
        <p style={{ color: '#8B96A5', margin: '6px 0 0 0', fontSize: '14px' }}>
          Enforce multi-factor verification, audit login complexity compliance rules, and control structural identity assertions.
        </p>
      </div>

      {/* DUAL CARD SEGMENT LAYOUT MATRIX */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* PANEL CARD 1: PASSWORD COMPLEXITY CONTROLLER */}
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #E3E8EE' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <KeyRound size={20} color="#0D6EFD" /> Credential Strength Inspector
          </h2>
          <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#8B96A5' }}>
            Test structural password strings against algorithmic entropy thresholds before pushing system updates.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748B', marginBottom: '6px', textTransform: 'uppercase' }}>
                Simulate New Vault Password
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px' }} />
                <input 
                  type="password" 
                  placeholder="Enter a complex password sequence..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  style={{ width: '100%', padding: '10px 10px 10px 36px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px' }}
                />
              </div>
            </div>

            {/* DYNAMIC PROGRESS METER GRAPHIC */}
            {password && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '12px' }}>
                  <span style={{ color: '#64748B' }}>Entropy Integrity Rating:</span>
                  <span style={{ fontWeight: 'bold', color: strength.color }}>{strength.label}</span>
                </div>
                
                {/* TRACK LAYER BAR */}
                <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ 
                    width: `${(strength.score / 4) * 100}%`, 
                    height: '100%', 
                    backgroundColor: strength.color, 
                    transition: 'width 0.3s ease-in-out' 
                  }} />
                </div>

                {/* HELPER HINTS MATRIX GRID */}
                <ul style={{ margin: '14px 0 0 0', padding: '0 0 0 18px', fontSize: '12px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li style={{ color: password.length >= 8 ? '#10B981' : '#64748B' }}>Minimum length of 8 structural bytes ({password.length}/8)</li>
                  <li style={{ color: /[A-Z]/.test(password) ? '#10B981' : '#64748B' }}>Contains at least one uppercase indicator node</li>
                  <li style={{ color: /[0-9]/.test(password) ? '#10B981' : '#64748B' }}>Contains numerical digits (0-9)</li>
                  <li style={{ color: /[^A-Za-z0-9]/.test(password) ? '#10B981' : '#64748B' }}>Contains special execution notation strings (!@#$)</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* PANEL CARD 2: MULTI-STEP TIME-BASED OTP 2FA CONTROLLER */}
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #E3E8EE' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Smartphone size={20} color="#0D6EFD" /> Secure Multi-Step 2FA Validation Pad
          </h2>
          <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#8B96A5' }}>
            Verify capital ledger interactions through simulated out-of-band One-Time Passwords (OTP).
          </p>

          {/* PHASE A VIEW: START TRIGGER */}
          {twoStepStage === 'Start' && (
            <div style={{ textAlign: 'center', padding: '20px', border: '1px dashed #CBD5E1', borderRadius: '8px', backgroundColor: '#FAFAFA' }}>
              <Key size={32} color="#64748B" style={{ margin: '0 auto 10px', opacity: 0.6 }} />
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B' }}>2FA Verification Shield Dormant</div>
              <p style={{ fontSize: '12px', color: '#8B96A5', margin: '4px 0 16px' }}>Enforce multi-step verification checks on demand to test login state integrity.</p>
              <button 
                onClick={handleTrigger2FAFlow}
                style={{ padding: '8px 16px', background: '#0D6EFD', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
              >
                Simulate 2FA Security Challenge
              </button>
            </div>
          )}

          {/* PHASE B VIEW: ENTERING DIGITAL NUMBERS */}
          {twoStepStage === 'EnteringOTP' && (
            <form onSubmit={verifyOtpCode} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', padding: '10px 12px', borderRadius: '6px', fontSize: '12px', color: '#1E40AF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={14} /> Sandbox Key Override: Enter <strong>123456</strong> or <strong>777777</strong> to unlock
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#64748B', marginBottom: '8px', textTransform: 'uppercase', textAlign: 'center' }}>
                  Enter 6-Digit Secure Validation Token
                </label>
                
                {/* INPUT MATRIX CELL ROW */}
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  {otpArray.map((digit, index) => (
                    <input 
                      key={index}
                      type="text"
                      ref={otpRefs[index]}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      maxLength={1}
                      style={{ width: '42px', height: '48px', border: '2px solid #CBD5E1', borderRadius: '6px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold', fontFamily: 'monospace', backgroundColor: '#FFFFFF', color: '#0F172A' }}
                    />
                  ))}
                </div>
              </div>

              {otpError && (
                <div style={{ color: '#DC2626', fontSize: '12px', textAlign: 'center', fontWeight: '500' }}>
                  ⚠️ {otpError}
                </div>
              )}

              {/* ACTION TOGGLES */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                <button 
                  type="button" 
                  onClick={() => setTwoStepStage('Start')} 
                  style={{ background: 'none', border: 'none', fontSize: '12px', cursor: 'pointer', color: '#64748B' }}
                >
                  Abort Shield Check
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '8px 18px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
                >
                  Verify Access Token
                </button>
              </div>
            </form>
          )}

          {/* PHASE C VIEW: ACCREDITATION AUTH UNLOCKED SUCCESS */}
          {twoStepStage === 'Verified' && (
            <div style={{ textAlign: 'center', padding: '24px', backgroundColor: '#ECFDF5', border: '2px dashed #10B981', borderRadius: '8px' }}>
              <CheckCircle size={44} color="#10B981" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#065F46' }}>Identity Matrix Cleared & Verified</div>
              <p style={{ fontSize: '12px', color: '#047857', margin: '4px 0 16px 0' }}>Multi-factor challenges have successfully passed sandbox assurance validations.</p>
              <button 
                onClick={() => setTwoStepStage('Start')}
                style={{ padding: '6px 12px', background: 'none', border: '1px solid #10B98140', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', color: '#047857', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <RefreshCw size={12} /> Test Challenge Loop Again
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default SecurityChamber;