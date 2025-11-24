
import React, { useEffect, useState } from 'react';
import LandingPageTemplate from '../components/templates/LandingPageTemplate';
import FloatingNav from '../components/organisms/FloatingNav';
import PageTransition from '../components/atoms/PageTransition';
import { ChartBarIcon, SignalIcon, ClockIcon, CloudIcon, ArrowRightIcon, ArrowLeftOnRectangleIcon, CommandLineIcon, PlayIcon, TrashIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/types';
import { servicesData, teamMembersData } from '../services/geminiService';
import { generatePostmanCollection, ENDPOINTS } from '../services/apiConfig';

const UserDashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // --- POSTMAN STATE ---
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState(ENDPOINTS.DATA.PROJECTS);
  const [requestBody, setRequestBody] = useState('{\n  \n}');
  const [response, setResponse] = useState<any>(null);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{method: string, url: string}[]>([]);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
        navigate('/login');
        return;
    }
    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
      authService.logout();
      navigate('/login');
  };

  const handleDownloadPostman = () => {
    const json = generatePostmanCollection();
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'Denoise_API_Collection.postman_collection.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- MOCK API LOGIC ---
  const handleSendRequest = () => {
      setLoading(true);
      setResponse(null);
      setResponseStatus(null);

      // Add to history
      setHistory(prev => [{method, url}, ...prev].slice(0, 5));

      setTimeout(() => {
          let data: any = null;
          let status = 404;

          try {
              // ROUTER SIMULATION
              // In a real app, this would be: fetch(url, { method, body: ... })
              
              if (url === ENDPOINTS.DATA.PROJECTS && method === 'GET') {
                  data = servicesData;
                  status = 200;
              } 
              else if (url === ENDPOINTS.DATA.TEAM && method === 'GET') {
                  data = teamMembersData;
                  status = 200;
              }
              else if (url === ENDPOINTS.ADMIN.USERS && method === 'GET') {
                  // Admin only simulation
                  if (user?.role === 'Admin') {
                      data = authService.getAllUsers().map(({password, ...u}) => u); // Hide passwords
                      status = 200;
                  } else {
                      data = { error: "Forbidden: Admin access required" };
                      status = 403;
                  }
              }
              else if (url === ENDPOINTS.ADMIN.USERS && method === 'POST') {
                   // Simulate creation
                   try {
                       const body = JSON.parse(requestBody);
                       data = { message: "User created successfully (Simulated)", receivedData: body, id: Date.now() };
                       status = 201;
                   } catch (e) {
                       data = { error: "Invalid JSON body" };
                       status = 400;
                   }
              }
              else if (url === ENDPOINTS.DATA.SYSTEM_STATUS && method === 'GET') {
                  data = { status: "OPERATIONAL", uptime: "99.98%", timestamp: new Date().toISOString() };
                  status = 200;
              }
              else if (url.includes(ENDPOINTS.DATA.SENSORS)) {
                  data = Array.from({length: 5}, (_, i) => ({ id: `sensor-${i}`, val: Math.random() * 100, unit: "ppm" }));
                  status = 200;
              }
              else {
                  data = { error: `Cannot ${method} ${url}`, hint: "Check apiConfig.ts for valid simulated endpoints" };
                  status = 404;
              }
          } catch (err) {
              data = { error: "Internal Server Error" };
              status = 500;
          }

          setResponse(data);
          setResponseStatus(status);
          setLoading(false);

      }, 800); // Artificial Delay
  };

  const getMethodColor = (m: string) => {
      switch(m) {
          case 'GET': return 'text-google-green border-google-green';
          case 'POST': return 'text-google-yellow border-google-yellow';
          case 'DELETE': return 'text-google-red border-google-red';
          case 'PUT': return 'text-google-blue border-google-blue';
          default: return 'text-brand-black dark:text-brand-white border-brand-black';
      }
  };

  const getStatusColor = (s: number | null) => {
      if (!s) return '';
      if (s >= 200 && s < 300) return 'text-google-green';
      if (s >= 400) return 'text-google-red';
      return 'text-google-yellow';
  };

  if (!user) return null;

  return (
    <LandingPageTemplate footer={null}>
      <FloatingNav />
      <PageTransition>
        <div className="min-h-screen bg-brand-white dark:bg-brand-black pt-24 px-4 md:px-6 pb-12 overflow-x-hidden">
          <div className="container mx-auto max-w-7xl">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b-4 border-brand-black dark:border-brand-white pb-6 gap-4">
                <div>
                    <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-brand-black dark:text-brand-white mb-2">
                        Developer Console
                    </h1>
                    <p className="text-brand-black/60 dark:text-brand-white/60 font-mono text-xs md:text-sm uppercase">
                        Logged in as <span className="font-bold text-brand-black dark:text-brand-white">{user.name}</span>
                    </p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={handleDownloadPostman}
                        className="flex items-center gap-2 text-xs font-black uppercase hover:text-google-blue transition-colors mb-2 border-2 border-transparent hover:border-brand-black p-2"
                        title="Download Postman Collection"
                    >
                        <ArrowDownTrayIcon className="w-4 h-4" /> Postman
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-xs font-black uppercase hover:text-google-red transition-colors mb-2 p-2 border-2 border-transparent hover:border-google-red"
                    >
                        Log Out <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { label: "API Requests", value: "8,432", icon: CloudIcon },
                    { label: "Avg Latency", value: "45ms", icon: ClockIcon },
                    { label: "Error Rate", value: "0.02%", icon: SignalIcon },
                ].map((m, i) => (
                    <div key={i} className="p-6 border-2 border-brand-black dark:border-brand-white shadow-hard dark:shadow-hard-dark bg-brand-white dark:bg-brand-black">
                        <div className="flex justify-between items-start mb-4">
                            <m.icon className="w-8 h-8 text-brand-black dark:text-brand-white" />
                        </div>
                        <h3 className="text-4xl font-black text-brand-black dark:text-brand-white mb-1">{m.value}</h3>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-60">{m.label}</p>
                    </div>
                ))}
            </div>

            {/* ================= POSTMAN INTERFACE ================= */}
            <div className="animate-slide-up [animation-delay:200ms]">
                <div className="flex items-center gap-3 mb-6">
                    <CommandLineIcon className="w-8 h-8 text-brand-black dark:text-brand-white" />
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-brand-black dark:text-brand-white">
                        API Client
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* LEFT COL: HISTORY & COLLECTION */}
                    <div className="lg:col-span-3 border-2 border-brand-black dark:border-brand-white bg-brand-white dark:bg-brand-black h-fit">
                        <div className="p-3 border-b-2 border-brand-black dark:border-brand-white bg-brand-black/5 dark:bg-brand-white/5 font-black text-xs uppercase tracking-widest">
                            History
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {history.length === 0 && <div className="p-4 text-[10px] font-mono opacity-50">No requests sent yet.</div>}
                            {history.map((h, i) => (
                                <div key={i} onClick={() => {setMethod(h.method); setUrl(h.url)}} className="p-3 border-b border-brand-black/10 dark:border-brand-white/10 hover:bg-brand-black/5 dark:hover:bg-brand-white/5 cursor-pointer flex items-center gap-2 truncate">
                                    <span className={`text-[10px] font-black w-10 ${h.method === 'GET' ? 'text-google-green' : 'text-google-yellow'}`}>{h.method}</span>
                                    <span className="text-xs font-mono opacity-80 truncate">{h.url}</span>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 border-t-2 border-brand-black dark:border-brand-white bg-brand-black/5 dark:bg-brand-white/5 font-black text-xs uppercase tracking-widest mt-auto">
                            Collections
                        </div>
                        <div className="p-2">
                             <div onClick={() => setUrl(ENDPOINTS.DATA.PROJECTS)} className="p-2 text-xs font-bold hover:underline cursor-pointer">GET Projects</div>
                             <div onClick={() => setUrl(ENDPOINTS.DATA.TEAM)} className="p-2 text-xs font-bold hover:underline cursor-pointer">GET Team</div>
                             <div onClick={() => setUrl(ENDPOINTS.ADMIN.USERS)} className="p-2 text-xs font-bold hover:underline cursor-pointer">GET Users (Admin)</div>
                             <div onClick={() => {setMethod('POST'); setUrl(ENDPOINTS.ADMIN.USERS);}} className="p-2 text-xs font-bold hover:underline cursor-pointer">POST User</div>
                        </div>
                    </div>

                    {/* RIGHT COL: REQUEST BUILDER */}
                    <div className="lg:col-span-9 space-y-4">
                        
                        {/* URL BAR */}
                        <div className="flex flex-col md:flex-row gap-0 border-2 border-brand-black dark:border-brand-white shadow-hard dark:shadow-hard-dark bg-brand-white dark:bg-brand-black">
                             <select 
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                                className={`appearance-none bg-transparent font-black px-6 py-4 border-b-2 md:border-b-0 md:border-r-2 border-brand-black dark:border-brand-white outline-none cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${getMethodColor(method)}`}
                             >
                                 <option value="GET">GET</option>
                                 <option value="POST">POST</option>
                                 <option value="PUT">PUT</option>
                                 <option value="DELETE">DEL</option>
                             </select>
                             <input 
                                type="text" 
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="flex-grow bg-transparent px-4 py-4 font-mono text-sm outline-none text-brand-black dark:text-brand-white placeholder-gray-500"
                             />
                             <button 
                                onClick={handleSendRequest}
                                disabled={loading}
                                className="bg-brand-black text-brand-white dark:bg-brand-white dark:text-brand-black px-8 py-4 font-black uppercase tracking-widest hover:opacity-80 active:opacity-100 disabled:opacity-50 flex items-center justify-center gap-2 border-t-2 md:border-t-0 md:border-l-2 border-brand-black dark:border-brand-white"
                             >
                                 {loading ? 'Sending...' : 'Send'} <PlayIcon className="w-4 h-4" />
                             </button>
                        </div>

                        {/* BODY / PARAMS TABS (Simplified) */}
                        {(method === 'POST' || method === 'PUT') && (
                            <div className="border-2 border-brand-black dark:border-brand-white bg-brand-white dark:bg-brand-black p-4 shadow-hard dark:shadow-hard-dark">
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-2">Request Body (JSON)</div>
                                <textarea 
                                    value={requestBody}
                                    onChange={(e) => setRequestBody(e.target.value)}
                                    className="w-full h-32 bg-brand-black/5 dark:bg-brand-white/5 border border-brand-black/20 dark:border-brand-white/20 p-4 font-mono text-xs outline-none focus:border-google-blue transition-colors resize-none"
                                />
                            </div>
                        )}

                        {/* RESPONSE AREA */}
                        <div className="border-2 border-brand-black dark:border-brand-white bg-brand-white dark:bg-brand-black min-h-[300px] shadow-hard dark:shadow-hard-dark flex flex-col">
                             <div className="flex justify-between items-center p-3 border-b-2 border-brand-black dark:border-brand-white bg-brand-black/5 dark:bg-brand-white/5">
                                 <span className="font-black text-xs uppercase tracking-widest">Response</span>
                                 {responseStatus && (
                                     <div className="flex items-center gap-2">
                                         <span className="text-[10px] font-bold opacity-60">Status:</span>
                                         <span className={`font-black font-mono ${getStatusColor(responseStatus)}`}>{responseStatus}</span>
                                     </div>
                                 )}
                             </div>
                             <div className="flex-grow p-4 overflow-auto relative">
                                 {loading ? (
                                     <div className="absolute inset-0 flex items-center justify-center">
                                         <div className="w-8 h-8 border-4 border-brand-black dark:border-brand-white border-t-transparent rounded-full animate-spin"></div>
                                     </div>
                                 ) : response ? (
                                     <pre className="font-mono text-xs text-brand-black dark:text-brand-white whitespace-pre-wrap">
                                         {JSON.stringify(response, null, 2)}
                                     </pre>
                                 ) : (
                                     <div className="h-full flex items-center justify-center opacity-30 font-mono text-sm">
                                         Ready to send request...
                                     </div>
                                 )}
                             </div>
                        </div>

                    </div>
                </div>
            </div>

          </div>
        </div>
      </PageTransition>
    </LandingPageTemplate>
  );
};

export default UserDashboardPage;
