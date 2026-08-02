import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MemberPage from './pages/MemberPage';
import VipPage from './pages/VipPage';
import CoachPage from './pages/CoachPage';
import AdminPage from './pages/AdminPage';
import SettingsProfilePage from './pages/SettingsProfilePage';
import UploadModal from './components/UploadModal';
import { getAllMediaItems, deleteMediaItem } from './services/storageService';
import { SAMPLE_VIP_MEDIA, SAMPLE_COACH_MEDIA } from './data/sampleFinanceData';
import SheepHeadIcon from './components/SheepHeadIcon';

export default function App() {
  const [items, setItems] = useState([]);
  const [vipItems, setVipItems] = useState([...SAMPLE_VIP_MEDIA, ...SAMPLE_COACH_MEDIA]);
  
  // Router path state: '/member' | '/vip' | '/coach' | '/admin'
  const [currentPath, setCurrentPath] = useState(() => {
    const p = window.location.pathname;
    if (p === '/coach' || p.includes('coach')) return '/coach';
    if (p === '/vip' || p.includes('vip')) return '/vip';
    if (p === '/admin' || p.includes('admin')) return '/admin';
    if (p === '/settings' || p.includes('settings')) return '/settings';
    return '/member';
  });

  const currentRole = currentPath === '/vip' ? 'vip' : currentPath === '/coach' ? 'coach' : currentPath === '/admin' ? 'admin' : 'member';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeMarket, setActiveMarket] = useState('ALL');
  
  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sync with browser back/forward and pushState
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      if (p === '/coach' || p.includes('coach')) setCurrentPath('/coach');
      else if (p === '/vip' || p.includes('vip')) setCurrentPath('/vip');
      else if (p === '/admin' || p.includes('admin')) setCurrentPath('/admin');
      else if (p === '/settings' || p.includes('settings')) setCurrentPath('/settings');
      else setCurrentPath('/member');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Load items on mount
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getAllMediaItems();
        setItems(data.filter(i => !i.isVip));
      } catch (err) {
        console.error('Failed to load media items:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleItemUploaded = (newItem) => {
    if (newItem.isVip) {
      setVipItems(prev => [newItem, ...prev]);
    } else {
      setItems(prev => [newItem, ...prev]);
    }
  };

  const handleDeleteItem = async (id) => {
    await deleteMediaItem(id);
    setItems(prev => prev.filter(i => i.id !== id));
    setVipItems(prev => prev.filter(i => i.id !== id));
  };

  const handleToggleVip = (id) => {
    const isVipNow = vipItems.some(i => i.id === id);
    if (isVipNow) {
      const target = vipItems.find(i => i.id === id);
      if (target) {
        setVipItems(prev => prev.filter(i => i.id !== id));
        setItems(prev => [{ ...target, isVip: false }, ...prev]);
      }
    } else {
      const target = items.find(i => i.id === id);
      if (target) {
        setItems(prev => prev.filter(i => i.id !== id));
        setVipItems(prev => [{ ...target, isVip: true }, ...prev]);
      }
    }
  };

  // All items combined for display
  const allItems = [...items, ...vipItems];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Main App Container - Full Widescreen Layout */}
      <div style={{ padding: '0 32px 60px', width: '100%' }}>
        
        {/* Header tailored for current route */}
        <Header 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentRole={currentRole}
        />

        {/* Dynamic Page Router based on current URL path */}
        {isLoading ? (
          <div className="glass-panel" style={{ padding: '60px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
              Đang tải dữ liệu tuyến đường {currentPath}...
            </div>
          </div>
        ) : (
          <>
            {/* ROUTE 1: /member -> MemberPage (All Books display, VIP/Coach items locked for normal members) */}
            {currentPath === '/member' && (
              <MemberPage 
                items={allItems}
                userRole={currentRole}
                onSelectItem={(item) => setSelectedItem(item)}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeMarket={activeMarket}
                setActiveMarket={setActiveMarket}
              />
            )}

            {/* ROUTE 2: /vip -> VipPage */}
            {currentPath === '/vip' && (
              <VipPage 
                vipItems={allItems}
                onSelectItem={(item) => setSelectedItem(item)}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeMarket={activeMarket}
                setActiveMarket={setActiveMarket}
              />
            )}

            {/* ROUTE 3: /coach -> CoachPage */}
            {currentPath === '/coach' && (
              <CoachPage 
                coachItems={allItems}
                onSelectItem={(item) => setSelectedItem(item)}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeMarket={activeMarket}
                setActiveMarket={setActiveMarket}
                onOpenUpload={() => setIsUploadOpen(true)}
              />
            )}

            {/* ROUTE 4: /admin -> AdminPage */}
            {currentPath === '/admin' && (
              <AdminPage 
                items={items}
                vipItems={vipItems}
                onOpenUpload={() => setIsUploadOpen(true)}
                onDeleteItem={handleDeleteItem}
                onToggleVip={handleToggleVip}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            )}

            {/* ROUTE 5: /settings -> SettingsProfilePage */}
            {currentPath === '/settings' && (
              <SettingsProfilePage currentRole={currentRole} />
            )}
          </>
        )}

      </div>

      {/* Upload Resource Modal */}
      <UploadModal 
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onItemUploaded={handleItemUploaded}
      />

      {/* Footer */}
      <footer style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', padding: '24px 32px', color: 'var(--text-muted)', fontSize: '0.82rem', background: 'rgba(5,5,7,0.95)', width: '100%' }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SheepHeadIcon size={16} className="sparkle-icon" color={currentRole === 'coach' ? '#10b981' : currentRole === 'vip' ? '#f59e0b' : currentRole === 'admin' ? '#38bdf8' : '#FFFFFF'} />
            <span>© 2026 <strong>Black Sheep Library</strong> • Nền tảng học tập & nghiên cứu tài chính (Không kêu gọi đầu tư).</span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ color: currentRole === 'coach' ? '#10b981' : currentRole === 'vip' ? '#f59e0b' : currentRole === 'admin' ? '#38bdf8' : '#FFFFFF' }}>
              ● Tuyến đường URL hiện tại: <code>{currentPath}</code>
            </span>
            <span>Tự động Bảo mật</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
