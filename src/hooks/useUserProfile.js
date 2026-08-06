import { useState, useEffect, useCallback } from 'react';
import { MOCK_PROFILE } from '../constants/avatarFrames';

/**
 * useUserProfile — Independent Custom Hook for managing user profile & avatar frames state.
 * Encapsulates localStorage sync and state mutations away from UI components.
 */
export function useUserProfile(currentRole = 'member') {
  const [profile, setProfile] = useState({ ...MOCK_PROFILE, role: currentRole });
  const [selectedFrame, setSelectedFrame] = useState(() => localStorage.getItem('bsv_user_frame') || 'none');
  const [saved, setSaved] = useState(false);

  // Sync profile from local storage on mount
  useEffect(() => {
    const savedAvatar = localStorage.getItem('bsv_user_avatar');
    const savedName   = localStorage.getItem('bsv_user_name');
    const savedBio    = localStorage.getItem('bsv_user_bio');
    const savedFrame  = localStorage.getItem('bsv_user_frame');

    if (savedAvatar || savedName || savedBio || savedFrame) {
      setProfile(p => ({
        ...p,
        avatar: savedAvatar || p.avatar,
        name:   savedName   || p.name,
        bio:    savedBio    || p.bio,
        role:   currentRole,
      }));
      if (savedFrame) setSelectedFrame(savedFrame);
    }
  }, [currentRole]);

  const handleEquipFrame = useCallback((frameId) => {
    setSelectedFrame(frameId);
    localStorage.setItem('bsv_user_frame', frameId);
    window.dispatchEvent(new Event('avatar_updated'));
  }, []);

  const handleAvatarUpload = useCallback((file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn một tệp hình ảnh (.png, .jpg, .jpeg, .webp)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result;
      setProfile(p => ({ ...p, avatar: base64Data }));
      localStorage.setItem('bsv_user_avatar', base64Data);
      window.dispatchEvent(new Event('avatar_updated'));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSaveProfile = useCallback((e) => {
    if (e) e.preventDefault();
    localStorage.setItem('bsv_user_name', profile.name);
    localStorage.setItem('bsv_user_bio', profile.bio);
    localStorage.setItem('bsv_user_frame', selectedFrame);
    window.dispatchEvent(new Event('avatar_updated'));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }, [profile.name, profile.bio, selectedFrame]);

  return {
    profile,
    setProfile,
    selectedFrame,
    saved,
    handleEquipFrame,
    handleAvatarUpload,
    handleSaveProfile,
  };
}
