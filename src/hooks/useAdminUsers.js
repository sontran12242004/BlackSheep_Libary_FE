import { useState, useCallback } from 'react';
import { SAMPLE_USERS } from '../data/sampleFinanceData';

/**
 * useAdminUsers — Independent Custom Hook for managing admin user management state.
 */
export function useAdminUsers() {
  const [usersList, setUsersList] = useState(() => Array.isArray(SAMPLE_USERS) ? SAMPLE_USERS : []);

  const handleRoleChange = useCallback((userId, newRole) => {
    setUsersList(prev => (prev || []).map(u => u && u.id === userId ? { ...u, role: newRole } : u));
  }, []);

  const handleStatusToggle = useCallback((userId) => {
    setUsersList(prev => (prev || []).map(u => {
      if (u && u.id === userId) {
        const nextStatus = u.status === 'Hoạt động' ? 'Tạm khóa' : 'Hoạt động';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  }, []);

  const handleDeleteUser = useCallback((userId) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa tài khoản hội viên này khỏi hệ thống?');
    if (confirmDelete) {
      setUsersList(prev => (prev || []).filter(u => u && u.id !== userId));
    }
  }, []);

  const handleAddUser = useCallback((newUser) => {
    setUsersList(prev => [newUser, ...(prev || [])]);
  }, []);

  return {
    usersList,
    handleRoleChange,
    handleStatusToggle,
    handleDeleteUser,
    handleAddUser,
  };
}
