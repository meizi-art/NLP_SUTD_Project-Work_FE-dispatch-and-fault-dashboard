import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Clock, 
  ShieldAlert, 
  PlusCircle, 
  Smartphone, 
  RefreshCw,
  Search
} from 'lucide-react';

interface HeaderProps {
  onOpenNewCase: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
  criticalBreachCount: number;
  onRefreshData: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewCase,
  activeView,
  setActiveView,
  criticalBreachCount,
  onRefreshData,
  searchTerm,
  setSearchTerm,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.toUTCString().replace('GMT', 'UTC');
      setCurrentTime(utc);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleManualSync = () => {
    setIsSyncing(true);
    onRefreshData();
    setTimeout(() => setIsSyncing(false), 600);
  };

  return (
    <header className="bg-white text-slate-900 border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold tracking-tight text-slate-900 font-sans">
                FieldOps Intelligence
              </h1>
              <span className="text-[11px] font-mono-tabular px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                FMC Dispatch
              </span>
            </div>
            <p className="text-xs text-slate-500 font-sans">
              Critical Field Service Dispatch & Telemetry
            </p>
          </div>
        </div>

        {/* Global Case Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="global-case-search-input"
              type="text"
              placeholder="Search Case ID, Site, Asset Tag, or Error..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-mono px-1 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center space-x-2.5">
          {/* Critical Breach Warning Pill */}
          {criticalBreachCount > 0 && (
            <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 font-semibold text-xs border border-red-200">
              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
              <span>{criticalBreachCount} SLA Risks</span>
            </div>
          )}

          {/* Clock */}
          <div className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs font-mono-tabular">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{currentTime || '14:23:18 UTC'}</span>
          </div>

          <button
            id="refresh-telemetry-btn"
            onClick={handleManualSync}
            title="Refresh Live Telemetry Stream"
            className="p-1.5 px-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isSyncing ? 'animate-spin text-blue-600' : ''}`} />
            <span className="hidden sm:inline font-mono text-[11px] font-medium">Sync</span>
          </button>

          {/* Switch to Mobile Transit Companion Simulation */}
          <button
            id="mobile-transit-view-toggle"
            onClick={() => setActiveView(activeView === 'mobile' ? 'dispatch' : 'mobile')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition-all cursor-pointer ${
              activeView === 'mobile'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-sans text-[11px]">
              {activeView === 'mobile' ? 'Exit Field Mode' : 'Tech Mode'}
            </span>
          </button>

          {/* New Emergency Ticket Button */}
          <button
            id="new-emergency-case-btn"
            onClick={onOpenNewCase}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-xs transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-blue-100" />
            <span className="font-sans">New Ticket</span>
          </button>
        </div>
      </div>
    </header>
  );
};
