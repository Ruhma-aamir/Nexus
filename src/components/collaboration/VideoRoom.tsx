import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, VideoOff, Mic, MicOff, PhoneOff, 
  Monitor, Shield, Users, MessageSquare, Maximize2 
} from 'lucide-react';

const VideoRoom: React.FC = () => {
  // --- STREAM CONTEXT STATES ---
  const [isCallActive, setIsCallActive] = useState<boolean>(true);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);

  const localVideoRef = useRef<HTMLVideoElement>(null);

  // --- SIMULATED DURATION CLOCK TIMER ---
  useEffect(() => {
    let interval: any;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  // --- WEBRTC LOCAL CAMERA STREAM ATTACHMENT ---
  useEffect(() => {
    if (isCallActive && isCameraOn && localVideoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.warn("Camera fallback triggered or permission blocked:", err);
        });
    } else if (localVideoRef.current) {
      const srcObject = localVideoRef.current.srcObject as MediaStream;
      if (srcObject) {
        srcObject.getTracks().forEach(track => track.stop());
      }
      localVideoRef.current.srcObject = null;
    }
  }, [isCallActive, isCameraOn]);

  // --- TIME CONVERSION HELPER ---
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif', backgroundColor: '#0F172A', minHeight: '100vh', color: '#F8FAFC' }}>
      
      {/* ROOM TOP BAR BARROW */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: '#1E293B', padding: '14px 20px', borderRadius: '12px', border: '1px solid #334155' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '8px', background: '#3b82f620', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
            <Video color="#3B82F6" size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>Series A Boardroom: Pitch Meeting</h1>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#94A3B8' }}>Secure end-to-end sandbox call stream</p>
          </div>
        </div>

        {isCallActive && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#EF444415', padding: '6px 12px', borderRadius: '20px', border: '1px solid #EF444430' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: '#EF4444', borderRadius: '50%', display: 'inline-block' }}></span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#FCA5A5', fontFamily: 'monospace' }}>
              LIVE | {formatTime(callDuration)}
            </span>
          </div>
        )}
      </div>

      {/* DUAL WORKSPACE VIDEO GRID DISPLAY MATRICES */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', alignItems: 'start' }}>
        
        {/* LEFT COMPONENT COLUMN: THE FEEDS CONTAINER */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          
          {/* USER INTERACTIVE LOCAL CAMERA THREAD BOX */}
          <div style={{ background: '#1E293B', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', position: 'relative', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isCallActive && isCameraOn ? (
              <video 
                ref={localVideoRef} 
                autoPlay 
                playsInline 
                muted 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
              />
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', background: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <VideoOff size={28} color="#94A3B8" />
                </div>
                <div style={{ fontSize: '14px', color: '#94A3B8' }}>Your Camera is Disabled</div>
              </div>
            )}
            <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(15, 23, 42, 0.75)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '500' }}>
              You (Startup Presenter) {isMuted && "🔇"}
            </div>
          </div>

          {/* SIMULATED REMOTE PARTY (INVESTOR PARTICIPANT) */}
          <div style={{ background: '#1E293B', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', position: 'relative', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isCallActive ? (
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom, #1e293b, #0f172a)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '70px', height: '70px', background: '#3B82F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>SJ</span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: '600' }}>Sarah Jenkins (VC Partner)</div>
                <div style={{ fontSize: '12px', color: '#3B82F6', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Shield size={12} /> Verified Angel Investor
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#64748B' }}>Investor Connection Terminated</div>
              </div>
            )}
            {isCallActive && (
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(15, 23, 42, 0.75)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '500' }}>
                Investor Alpha Feed
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COMPONENT COLUMN: CHAT WINDOW SIDEBAR CONTROL PANEL */}
        <div style={{ background: '#1E293B', borderRadius: '12px', border: '1px solid #334155', padding: '16px' }}>
          <h3 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', color: '#F1F5F9' }}>
            <Users size={16} color="#3B82F6" /> Session Meta Directory
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '10px', background: '#0F172A', borderRadius: '8px', fontSize: '12px', border: '1px solid #334155' }}>
              <div style={{ color: '#94A3B8', fontWeight: 'bold' }}>Room Security Identifier</div>
              <div style={{ fontFamily: 'monospace', color: '#3B82F6', marginTop: '4px' }}>wrtc-nx-773x-board</div>
            </div>
            <div style={{ padding: '10px', background: '#0F172A', borderRadius: '8px', fontSize: '12px', border: '1px solid #334155' }}>
              <div style={{ color: '#94A3B8', fontWeight: 'bold' }}>Network Link State</div>
              <div style={{ color: '#10B981', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ● Excellent (0ms jitter)
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FLOOR MEDIA CONTROLS HUB COCKPIT STRIP */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '24px' }}>
        
        {/* MICROPHONE PIPELINE TOGGLE */}
        <button 
          onClick={() => setIsMuted(!isMuted)}
          disabled={!isCallActive}
          style={{ width: '48px', height: '48px', borderRadius: '50%', border: 'none', backgroundColor: isMuted ? '#EF4444' : '#334155', color: '#fff', cursor: isCallActive ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center',  transition: 'all 0.2s' }}
          title={isMuted ? "Unmute Mic" : "Mute Mic"}
        >
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        {/* CAMERA FEED PATH TOGGLE */}
        <button 
          onClick={() => setIsCameraOn(!isCameraOn)}
          disabled={!isCallActive}
          
          style={{ width: '48px', height: '48px', borderRadius: '50%', border: 'none', backgroundColor: isMuted ? '#EF4444' : '#334155', color: '#fff', cursor: isCallActive ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
          title={isCameraOn ? "Kill Video Stream" : "Start Video Stream"}
        >
          {!isCameraOn ? <VideoOff size={20} /> : <Video size={20} />}
        </button>

        {/* OPTIONAL EXTRA ELEMENT: CONTENT SCREEN SHARE LINK HOOK */}
        <button 
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          disabled={!isCallActive}
          style={{ width: '48px', height: '48px', borderRadius: '50%', border: 'none', backgroundColor: isScreenSharing ? '#3B82F6' : '#334155', color: '#fff', cursor: isCallActive ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
          title="Share Window Desktop"
        >
          <Monitor size={20} />
        </button>

        {/* DISCONNECT TRIPPED HARNESS SWITCH TRIGGER */}
        <button 
          onClick={() => setIsCallActive(!isCallActive)}
          style={{ padding: '0 24px', height: '48px', borderRadius: '24px', border: 'none', backgroundColor: isCallActive ? '#DC2626' : '#10B981', color: '#fff', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s', boxShadow: isCallActive ? '0 4px 14px rgba(220, 38, 38, 0.3)' : '0 4px 14px rgba(16, 185, 129, 0.3)' }}
        >
          <PhoneOff size={18} />
          {isCallActive ? "Terminate Session" : "Reinitialize Call Line"}
        </button>

      </div>

    </div>
  );
};

export default VideoRoom;