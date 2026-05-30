import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar, Clock, Plus, Check, X, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- TYPESCRIPT INTERFACES ---
interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  backgroundColor: string;
}

interface AvailabilitySlot {
  id: string;
  day: string;
  time: string;
}

interface MeetingRequest {
  id: string;
  sender: string;
  proposedTime: string;
  topic: string;
}

const MeetingsSchedule: React.FC = () => {
  // --- STATE 1: Confirmed Meetings ---
  const [meetings, setMeetings] = useState<CalendarEvent[]>([
    { id: '1', title: 'Nexus Seed Funding Pitch (Investor Alpha)', start: '2026-06-02T10:00:00', end: '2026-06-02T11:00:00', backgroundColor: '#0D6EFD' },
    { id: '2', title: 'Technical Architecture Sync', start: '2026-06-05T14:00:00', end: '2026-06-05T15:00:00', backgroundColor: '#0D6EFD' }
  ]);

  // --- STATE 2: Availability Slots ---
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([
    { id: '1', day: 'Monday', time: '09:00 AM - 12:00 PM' },
    { id: '2', day: 'Wednesday', time: '02:00 PM - 05:00 PM' },
    { id: '3', day: 'Friday', time: '01:00 PM - 04:00 PM' }
  ]);

  // --- STATE 3: Incoming Meeting Requests ---
  const [requests, setRequests] = useState<MeetingRequest[]>([
    { id: 'r1', sender: 'Sarah Jenkins (VC Partner)', proposedTime: 'June 04, 2026 - 11:00 AM', topic: 'Series A Deck Review' },
    { id: 'r2', sender: 'Alex Rivera (Tech Founder)', proposedTime: 'June 08, 2026 - 03:30 PM', topic: 'Partnership Proposal' }
  ]);

  // --- FORM STATES FOR CREATING AVAILABILITY ---
  const [newDay, setNewDay] = useState<string>('Monday');
  const [newTime, setNewTime] = useState<string>('');
  const [showAddSlot, setShowAddSlot] = useState<boolean>(false);

  // --- HANDLER FUNCTIONS ---
  const handleAddAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTime) return;
    const newSlot: AvailabilitySlot = {
      id: Date.now().toString(),
      day: newDay,
      time: newTime
    };
    setAvailability([...availability, newSlot]);
    setNewTime('');
    setShowAddSlot(false);
  };

  const handleRemoveAvailability = (id: string) => {
    setAvailability(availability.filter(slot => slot.id !== id));
  };

  const handleAcceptRequest = (req: MeetingRequest) => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: `Confirmed: ${req.topic} w/ ${req.sender.split(' ')[0]}`,
      start: '2026-06-04T11:00:00', 
      backgroundColor: '#198754' 
    };
    setMeetings([...meetings, newEvent]);
    setRequests(requests.filter(r => r.id !== req.id));
  };

  const handleDeclineRequest = (id: string) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif', backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
      
      {/* HEADER HERO PANELS */}
      <div style={{ marginBottom: '24px', background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #E3E8EE' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1C1C1C', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Calendar color="#0D6EFD" size={28} /> Collaboration Workspace: Scheduler
        </h1>
        <p style={{ color: '#8B96A5', margin: '6px 0 0 0', fontSize: '14px' }}>
          Define open investment pitch blocks, handle incoming entrepreneur requests, and track panel sessions.
        </p>
      </div>

      {/* DASHBOARD WORKSPACE MAIN GRID SPLIT */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: THE INTERACTIVE FULL CALENDAR PANELS */}
        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #E3E8EE', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          
          {/* UPDATED HEADER AREA TO INCLUDE ENTRY LINK SUB-COMPONENT */}
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#1C1C1C' }}>Confirmed Meetings Matrix</h3>
            <Link 
              to="/video-room" 
              style={{ padding: '6px 12px', backgroundColor: '#198754', color: '#fff', borderRadius: '6px', fontSize: '13px', textDecoration: 'none', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <span style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block' }}></span>
              Enter Live Video Room
            </Link>
          </div>
          
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            initialDate="2026-06-01"
            events={meetings}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth'
            }}
            height="auto"
          />
        </div>

        {/* RIGHT COLUMN: AVAILABILITY SETTINGS AND REQUESTS CHANNELS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* COLUMN PANEL 1: AVAILABILITY SLOT CONTROLS */}
          <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #E3E8EE' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#1C1C1C', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="#0D6EFD" /> My Open Windows
              </h3>
              <button 
                onClick={() => setShowAddSlot(!showAddSlot)}
                style={{ padding: '4px 8px', backgroundColor: '#0D6EFD', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
              >
                <Plus size={14} /> Add Block
              </button>
            </div>

            {/* EXPANDABLE ADD AVAILABILITY WORKFLOW FORM */}
            {showAddSlot && (
              <form onSubmit={handleAddAvailability} style={{ marginBottom: '16px', padding: '12px', background: '#F8F9FA', borderRadius: '6px', border: '1px solid #E3E8EE' }}>
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Day of Week</label>
                  <select value={newDay} onChange={(e) => setNewDay(e.target.value)} style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #E3E8EE' }}>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                  </select>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Hours Window</label>
                  <input type="text" placeholder="e.g., 10:00 AM - 01:00 PM" value={newTime} onChange={(e) => setNewTime(e.target.value)} style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #E3E8EE', fontSize: '13px' }} required />
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setShowAddSlot(false)} style={{ background: 'none', border: 'none', fontSize: '12px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '4px 10px', background: '#198754', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>Save Window</button>
                </div>
              </form>
            )}

            {/* AVAILABILITY REPEATER LIST ITEMS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {availability.map((slot) => (
                <div key={slot.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#F8F9FA', borderRadius: '6px', border: '1px solid #E3E8EE' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1C1C1C' }}>{slot.day}</div>
                    <div style={{ fontSize: '12px', color: '#8B96A5' }}>{slot.time}</div>
                  </div>
                  <button onClick={() => handleRemoveAvailability(slot.id)} style={{ background: 'none', border: 'none', color: '#DC3545', cursor: 'pointer', padding: '4px' }} title="Delete slot">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN PANEL 2: MEETING REQUESTS DECK CHANNELS */}
          <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #E3E8EE' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', fontWeight: '600', color: '#1C1C1C', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={18} color="#FFC107" /> Action Items: Requests
            </h3>

            {requests.length === 0 ? (
              <p style={{ margin: 0, fontSize: '13px', color: '#8B96A5', textAlign: 'center', padding: '20px 0' }}>No pending collaboration notifications.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {requests.map((req) => (
                  <div key={req.id} style={{ padding: '12px', background: '#FFFDF6', borderRadius: '6px', border: '1px solid #FFEBA8' }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1C1C1C' }}>{req.sender}</div>
                    <div style={{ fontSize: '12px', color: '#555', marginTop: '2px' }}><strong>Topic:</strong> {req.topic}</div>
                    <div style={{ fontSize: '11px', color: '#8B96A5', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {req.proposedTime}
                    </div>
                    
                    {/* INTERACTIVE ACTION TOGGLE BUTTONS */}
                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => handleDeclineRequest(req.id)}
                        style={{ padding: '4px 8px', background: '#fff', color: '#DC3545', border: '1px solid #DC3545', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
                      >
                        <X size={12} /> Decline
                      </button>
                      <button 
                        onClick={() => handleAcceptRequest(req)}
                        style={{ padding: '4px 8px', background: '#198754', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
                      >
                        <Check size={12} /> Accept
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MeetingsSchedule;