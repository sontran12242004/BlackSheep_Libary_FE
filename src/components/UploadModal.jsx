import React, { useState } from 'react';
import { 
  Upload, X, FileText, Image as ImageIcon, Video, CheckCircle, 
  AlertCircle, Globe, BookOpen, Lock, ShieldCheck, Crown, GraduationCap, Users, Camera 
} from 'lucide-react';
import { saveMediaItem } from '../services/storageService';

export default function UploadModal({ isOpen, onClose, onItemUploaded }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileEn, setSelectedFileEn] = useState(null);
  const [mediaType, setMediaType] = useState('pdf'); // 'pdf' | 'video' | 'recap'
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState('Giáo Trình & Sách');
  const [market, setMarket] = useState('CRYPTO');
  const [author, setAuthor] = useState('');
  const [targetRole, setTargetRole] = useState('all'); // 'all' | 'vip' | 'coach' | 'admin_only'
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleFileSelectVi = (file) => {
    if (!file) return;

    if (mediaType === 'recap' && !file.type.startsWith('image/')) {
      setErrorMsg('Mục Bài Đăng Recap chỉ hỗ trợ tệp Ảnh (.PNG, .JPG, .WEBP)!');
      return;
    }

    setSelectedFile(file);
    setErrorMsg('');

    let detectedTitle = file.name.replace(/\.[^/.]+$/, "");
    if (!title) setTitle(detectedTitle);
  };

  const handleFileSelectEn = (file) => {
    if (!file) return;

    if (mediaType === 'recap' && !file.type.startsWith('image/')) {
      setErrorMsg('Mục Bài Đăng Recap chỉ hỗ trợ tệp Ảnh (.PNG, .JPG, .WEBP)!');
      return;
    }

    setSelectedFileEn(file);
    setErrorMsg('');

    let detectedTitleEn = file.name.replace(/\.[^/.]+$/, "");
    if (!titleEn) setTitleEn(detectedTitleEn);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile && !selectedFileEn) {
      setErrorMsg(`Vui lòng chọn tệp ${mediaType === 'recap' ? 'Ảnh Biểu Đồ Recap' : mediaType === 'video' ? 'Video Bài Học' : 'Sách PDF'}!`);
      return;
    }

    const mainTitle = title.trim() || titleEn.trim();
    if (!mainTitle) {
      setErrorMsg('Vui lòng nhập tiêu đề cho bài đăng!');
      return;
    }

    try {
      setIsUploading(true);
      setErrorMsg('');

      // Primary file reference
      const primaryFile = selectedFile || selectedFileEn;
      const viUrl = selectedFile ? URL.createObjectURL(selectedFile) : (selectedFileEn ? URL.createObjectURL(selectedFileEn) : '');
      const enUrl = selectedFileEn ? URL.createObjectURL(selectedFileEn) : viUrl;

      const isVipItem = targetRole === 'vip' || targetRole === 'coach';

      const newItem = await saveMediaItem({
        title: title.trim() || titleEn.trim(),
        titleEn: titleEn.trim() || title.trim(),
        type: mediaType === 'recap' ? 'image' : mediaType,
        category: mediaType === 'recap' ? 'Trading Recap (Ảnh)' : category,
        market,
        author: author || 'Black Sheep Coach',
        targetRole,
        description,
        tags,
        fileUrl: viUrl,
        fileUrlEn: enUrl,
        thumbnail: mediaType === 'recap' ? viUrl : undefined,
        hasDualLanguage: Boolean(selectedFile && selectedFileEn),
        isVip: isVipItem,
        isRecap: mediaType === 'recap'
      }, primaryFile);

      onItemUploaded(newItem);
      onClose();
      
      // Reset form
      setSelectedFile(null);
      setSelectedFileEn(null);
      setTitle('');
      setTitleEn('');
      setDescription('');
      setTags('');
      setTargetRole('all');
    } catch (err) {
      console.error(err);
      setErrorMsg('Có lỗi xảy ra khi lưu tệp vào kho dữ liệu.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '780px' }}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', color: '#FFFFFF' }}>
              <Upload size={22} color="#10b981" /> Đăng Tải Tài Nguyên (PDF / Video / Ảnh Recap)
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Đăng sách PDF, Video bài học hoặc Bài Đăng Recap (chỉ nhận tệp Ảnh biểu đồ)
            </p>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        {errorMsg && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: '16px', color: '#F87171', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} /> {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Media Type Selector: PDF vs Video vs Recap (Chỉ Đăng Ảnh) */}
          <div className="input-group">
            <label className="input-label">Loại tài nguyên đăng tải:</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              
              <button
                type="button"
                className={`btn ${mediaType === 'pdf' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setMediaType('pdf')}
                style={{ borderRadius: 'var(--radius-md)', padding: '10px 8px', justifyContent: 'center', fontSize: '0.82rem' }}
              >
                <FileText size={16} /> Sách & PDF
              </button>

              <button
                type="button"
                className={`btn ${mediaType === 'video' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setMediaType('video')}
                style={{ borderRadius: 'var(--radius-md)', padding: '10px 8px', justifyContent: 'center', fontSize: '0.82rem' }}
              >
                <Video size={16} /> Video Bài Học
              </button>

              <button
                type="button"
                className={`btn ${mediaType === 'recap' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setMediaType('recap')}
                style={{ 
                  borderRadius: 'var(--radius-md)', 
                  padding: '10px 8px', 
                  justify: 'center', 
                  fontSize: '0.82rem',
                  background: mediaType === 'recap' ? 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)' : undefined,
                  borderColor: mediaType === 'recap' ? '#a855f7' : undefined
                }}
              >
                <Camera size={16} color={mediaType === 'recap' ? '#FFFFFF' : '#a855f7'} /> 
                <span>📸 Đăng Bài Recap (Ảnh)</span>
              </button>

            </div>
          </div>

          {/* DUAL FILE UPLOAD DROP ZONES (Automatic Format Filter) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            
            {/* 1. File Tiếng Việt Zone */}
            <div 
              style={{
                border: selectedFile ? '2px solid #10b981' : '2px dashed rgba(255, 255, 255, 0.18)',
                background: selectedFile ? 'rgba(16, 185, 129, 0.08)' : 'rgba(11, 14, 23, 0.6)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                textAlign: 'center',
                cursor: 'pointer'
              }}
              onClick={() => document.getElementById('file-input-vi').click()}
            >
              <input 
                id="file-input-vi" 
                type="file" 
                accept={mediaType === 'recap' ? 'image/*' : mediaType === 'video' ? 'video/*' : '.pdf'}
                style={{ display: 'none' }}
                onChange={(e) => handleFileSelectVi(e.target.files[0])}
              />

              <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#10b981', marginBottom: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <span>Bản Tiếng Việt {mediaType === 'recap' && '(Chỉ Ảnh .PNG/.JPG)'}</span>
              </div>

              {selectedFile ? (
                <div style={{ fontSize: '0.8rem', color: '#FFFFFF', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  ✓ {selectedFile.name}
                </div>
              ) : (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Bấm chọn tệp {mediaType === 'recap' ? 'Ảnh Biểu Đồ' : mediaType === 'video' ? 'Video' : 'PDF'} Tiếng Việt
                </div>
              )}
            </div>

            {/* 2. File Tiếng Anh Zone */}
            <div 
              style={{
                border: selectedFileEn ? '2px solid #38bdf8' : '2px dashed rgba(255, 255, 255, 0.18)',
                background: selectedFileEn ? 'rgba(56, 189, 248, 0.08)' : 'rgba(11, 14, 23, 0.6)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                textAlign: 'center',
                cursor: 'pointer'
              }}
              onClick={() => document.getElementById('file-input-en').click()}
            >
              <input 
                id="file-input-en" 
                type="file" 
                accept={mediaType === 'recap' ? 'image/*' : mediaType === 'video' ? 'video/*' : '.pdf'}
                style={{ display: 'none' }}
                onChange={(e) => handleFileSelectEn(e.target.files[0])}
              />

              <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#38bdf8', marginBottom: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <span>Bản Tiếng Anh {mediaType === 'recap' && '(Chỉ Ảnh .PNG/.JPG)'}</span>
              </div>

              {selectedFileEn ? (
                <div style={{ fontSize: '0.8rem', color: '#FFFFFF', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  ✓ {selectedFileEn.name}
                </div>
              ) : (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Bấm chọn tệp {mediaType === 'recap' ? 'Ảnh Biểu Đồ' : mediaType === 'video' ? 'Video' : 'PDF'} Tiếng Anh
                </div>
              )}
            </div>

          </div>

          {/* ROLE ACCESS SELECTOR (CHỌN ROLE CÓ THỂ ĐỌC/XEM) */}
          <div className="input-group">
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFFFFF', fontWeight: '800' }}>
              <Lock size={15} color="#f59e0b" /> Phân quyền Role được phép xem bài viết này *
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '6px' }}>
              
              {/* Option 1: All Members */}
              <button
                type="button"
                onClick={() => setTargetRole('all')}
                style={{
                  padding: '10px 8px',
                  borderRadius: 'var(--radius-md)',
                  background: targetRole === 'all' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(11, 14, 23, 0.5)',
                  border: targetRole === 'all' ? '1.5px solid #FFFFFF' : '1px solid rgba(255,255,255,0.1)',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <Users size={18} color="#FFFFFF" style={{ marginBottom: '4px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: '800' }}>Tất Cả Member</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Công khai</div>
              </button>

              {/* Option 2: VIP Only */}
              <button
                type="button"
                onClick={() => setTargetRole('vip')}
                style={{
                  padding: '10px 8px',
                  borderRadius: 'var(--radius-md)',
                  background: targetRole === 'vip' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(11, 14, 23, 0.5)',
                  border: targetRole === 'vip' ? '1.5px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                  color: targetRole === 'vip' ? '#f59e0b' : '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <Crown size={18} color="#f59e0b" style={{ marginBottom: '4px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: '800' }}>Member VIP</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Mật độc quyền</div>
              </button>

              {/* Option 3: Coach Mentorship Students */}
              <button
                type="button"
                onClick={() => setTargetRole('coach')}
                style={{
                  padding: '10px 8px',
                  borderRadius: 'var(--radius-md)',
                  background: targetRole === 'coach' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(11, 14, 23, 0.5)',
                  border: targetRole === 'coach' ? '1.5px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
                  color: targetRole === 'coach' ? '#10b981' : '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <GraduationCap size={18} color="#10b981" style={{ marginBottom: '4px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: '800' }}>Lớp Coach</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Đọc viên Coach</div>
              </button>

              {/* Option 4: Admin & Coach Only */}
              <button
                type="button"
                onClick={() => setTargetRole('admin_only')}
                style={{
                  padding: '10px 8px',
                  borderRadius: 'var(--radius-md)',
                  background: targetRole === 'admin_only' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(11, 14, 23, 0.5)',
                  border: targetRole === 'admin_only' ? '1.5px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                  color: targetRole === 'admin_only' ? '#38bdf8' : '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <ShieldCheck size={18} color="#38bdf8" style={{ marginBottom: '4px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: '800' }}>Admin & Coach</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Nội bộ Admin</div>
              </button>

            </div>
          </div>

          {/* Title & Titles Dual */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="input-group">
              <label className="input-label">Tiêu đề (Tiếng Việt)</label>
              <input
                type="text"
                className="input-field"
                placeholder={mediaType === 'recap' ? "Ví dụ: Recap Setup Lệnh XAUUSD Tuần 31..." : "Ví dụ: Giáo Trình Price Action Thực Chiến..."}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Tiêu đề (Tiếng Anh)</label>
              <input
                type="text"
                className="input-field"
                placeholder={mediaType === 'recap' ? "Example: XAUUSD Trade Setup Recap..." : "Example: Practical Price Action Playbook..."}
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
            <div className="input-group">
              <label className="input-label">Thị trường</label>
              <select
                className="input-field"
                value={market}
                onChange={(e) => setMarket(e.target.value)}
              >
                <option value="CRYPTO">CRYPTO</option>
                <option value="FOREX">FOREX</option>
                <option value="STOCKS">CHỨNG KHOÁN</option>
                <option value="MACRO">VĨ MÔ</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Tác giả / Mentor</label>
              <input
                type="text"
                className="input-field"
                placeholder="Coach Name..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Thẻ Tags (dấu phẩy)</label>
              <input
                type="text"
                className="input-field"
                placeholder="Recap, Setup, Chart"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="input-group">
            <label className="input-label">Mô tả tóm tắt phân tích / Recap</label>
            <textarea
              className="input-field"
              rows="3"
              placeholder="Nhập ghi chú giải thích lý do vào lệnh, điểm Stoploss, TakeProfit trong ảnh Recap này..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Modal Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isUploading}>
              Hủy
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isUploading}
              style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
            >
              {isUploading ? 'Đang Đăng Tải...' : 'ĐĂNG TẢI TÀI NGUYÊN'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
