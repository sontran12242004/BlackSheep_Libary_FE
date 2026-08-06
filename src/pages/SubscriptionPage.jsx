import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, CheckCircle2, Zap, BookOpen, Video, Star, Lock, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { ROUTES } from '../constants/routes';

const VIP_STORAGE_KEY = 'bsv_is_vip';

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const [isVip, setIsVip] = useState(() => localStorage.getItem(VIP_STORAGE_KEY) === 'true');
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePurchase = async () => {
    setIsPurchasing(true);
    // Simulate payment processing
    await new Promise(r => setTimeout(r, 1800));
    localStorage.setItem(VIP_STORAGE_KEY, 'true');
    setIsVip(true);
    setIsPurchasing(false);
    setShowSuccess(true);
    // Redirect to VIP page after success
    setTimeout(() => navigate(ROUTES.VIP), 2800);
  };

  const handleCancelVip = () => {
    if (window.confirm('Bạn có chắc chắn muốn hủy gói VIP không? Quyền truy cập VIP sẽ bị thu hồi ngay lập tức.')) {
      localStorage.removeItem(VIP_STORAGE_KEY);
      setIsVip(false);
    }
  };

  const benefits = [
    { icon: BookOpen, color: '#38bdf8', text: 'Truy cập toàn bộ kho sách PDF cao cấp (200+ tài liệu)' },
    { icon: Video, color: '#a855f7', text: 'Xem tất cả video bài giảng thực chiến độc quyền' },
    { icon: Star, color: '#f59e0b', text: 'Recap Trading Chart phân tích chuyên sâu hàng tuần' },
    { icon: Zap, color: '#10b981', text: 'Cập nhật nội dung VIP mới nhất ưu tiên sớm nhất' },
    { icon: Shield, color: '#e879f9', text: 'Khung Avatar VIP độc quyền trong Profile' },
    { icon: Crown, color: '#f59e0b', text: 'Huy hiệu VIP Member trên toàn hệ thống' },
  ];

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background ambient glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.08) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'fixed', bottom: 0, left: '20%', right: '20%', height: '300px',
        pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.06) 0%, transparent 70%)',
      }} />

      {/* Success Overlay */}
      {showSuccess && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(5,5,7,0.92)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          animation: 'fadeIn 0.3s ease',
        }}>
          <div style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.18), transparent 70%)',
            borderRadius: '50%', padding: '40px', marginBottom: '24px',
          }}>
            <CheckCircle2 size={80} color="#f59e0b" strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 30px rgba(245,158,11,0.7))' }} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#FFFFFF', marginBottom: '12px', textAlign: 'center' }}>
            🎉 Chào Mừng VIP Member!
          </h2>
          <p style={{ fontSize: '1rem', color: '#f59e0b', fontWeight: '700', marginBottom: '8px' }}>
            Thanh toán thành công — 30.000 VND
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Đang chuyển hướng đến trang VIP...
          </p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '8px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={22} color="#f59e0b" fill="#f59e0b" style={{ animationDelay: `${i * 0.1}s`, animation: 'sparkleIn 0.4s ease forwards' }} />
            ))}
          </div>
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '640px' }}>

        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '80px', height: '80px', borderRadius: '24px', marginBottom: '20px',
            background: 'linear-gradient(135deg, rgba(245,158,11,0.25) 0%, rgba(168,85,247,0.15) 100%)',
            border: '1px solid rgba(245,158,11,0.4)',
            boxShadow: '0 0 40px rgba(245,158,11,0.25)',
          }}>
            <Crown size={42} color="#f59e0b" style={{ filter: 'drop-shadow(0 0 12px rgba(245,158,11,0.6))' }} />
          </div>
          <h1 style={{
            fontSize: '2.2rem', fontWeight: '900', color: '#FFFFFF',
            background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #a855f7 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', marginBottom: '12px',
          }}>
            Black Sheep VIP
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Mở khóa toàn bộ nội dung cao cấp — sách PDF, video thực chiến &amp; recap trading độc quyền
          </p>
        </div>

        {/* Subscription Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(14,14,18,0.95) 40%, rgba(168,85,247,0.06) 100%)',
          border: '1px solid rgba(245,158,11,0.35)',
          borderRadius: '24px',
          padding: '36px',
          boxShadow: '0 0 60px rgba(245,158,11,0.12), 0 20px 60px rgba(0,0,0,0.5)',
          position: 'relative',
          overflow: 'hidden',
        }}>

          {/* "Best Value" badge */}
          <div style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#000', fontSize: '0.72rem', fontWeight: '900',
            padding: '4px 12px', borderRadius: '20px',
            boxShadow: '0 0 20px rgba(245,158,11,0.5)',
            letterSpacing: '0.05em',
          }}>
            ✦ DUY NHẤT
          </div>

          {/* Plan name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(245,158,11,0.4)',
            }}>
              <Crown size={22} color="#000" />
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFFFFF' }}>Gói VIP Member</div>
              <div style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: '700' }}>Truy cập không giới hạn 30 ngày</div>
            </div>
          </div>

          {/* Price */}
          <div style={{ marginBottom: '28px', padding: '20px', background: 'rgba(245,158,11,0.06)', borderRadius: '16px', border: '1px solid rgba(245,158,11,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <span style={{ fontSize: '3rem', fontWeight: '900', color: '#f59e0b', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                30.000
              </span>
              <div style={{ paddingBottom: '6px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFFFFF' }}>VND</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>/ tháng</div>
              </div>
            </div>
            <div style={{ marginTop: '8px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              ~ 1.000 VND / ngày · Không tự động gia hạn
            </div>
          </div>

          {/* Benefits List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
            {benefits.map(({ icon: Icon, color, text }, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
                  background: `${color}18`, border: `1px solid ${color}35`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={16} color={color} />
                </div>
                <span style={{ fontSize: '0.88rem', color: '#e5e7eb', fontWeight: '500', lineHeight: 1.4 }}>
                  {text}
                </span>
                <CheckCircle2 size={16} color="#10b981" style={{ marginLeft: 'auto', flexShrink: 0 }} />
              </div>
            ))}
          </div>

          {/* CTA Button or VIP Status */}
          {isVip ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                padding: '16px 24px', borderRadius: '14px', textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
                border: '1px solid rgba(16,185,129,0.35)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <CheckCircle2 size={22} color="#10b981" />
                  <span style={{ fontSize: '1rem', fontWeight: '800', color: '#10b981' }}>Bạn đang là VIP Member ✓</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  Toàn bộ nội dung VIP đã được mở khóa cho tài khoản của bạn
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => navigate(ROUTES.VIP)}
                  style={{
                    flex: 1, padding: '14px 24px', borderRadius: '14px', cursor: 'pointer',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: '#000', fontWeight: '800', fontSize: '0.95rem', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    boxShadow: '0 0 30px rgba(245,158,11,0.35)', transition: 'all 0.2s ease',
                  }}
                >
                  Vào Khu VIP Ngay →
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem(VIP_STORAGE_KEY);
                    setIsVip(false);
                  }}
                  title="Thử mua lại từ đầu với tư cách Member thường"
                  style={{
                    padding: '14px 20px', borderRadius: '14px', cursor: 'pointer',
                    background: 'rgba(255,255,255,0.06)', color: '#f59e0b',
                    fontWeight: '700', fontSize: '0.85rem',
                    border: '1px solid rgba(245,158,11,0.3)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Thử Mua VIP Lại
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handlePurchase}
              disabled={isPurchasing}
              style={{
                width: '100%', padding: '18px 24px', borderRadius: '14px',
                cursor: isPurchasing ? 'not-allowed' : 'pointer',
                background: isPurchasing
                  ? 'rgba(245,158,11,0.3)'
                  : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#000', fontWeight: '900', fontSize: '1.05rem', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                boxShadow: isPurchasing ? 'none' : '0 0 40px rgba(245,158,11,0.4)',
                transition: 'all 0.3s ease',
                letterSpacing: '0.02em',
              }}
            >
              {isPurchasing ? (
                <>
                  <div style={{
                    width: '20px', height: '20px', border: '2px solid rgba(0,0,0,0.3)',
                    borderTopColor: '#000', borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                  Đang xử lý thanh toán...
                </>
              ) : (
                <>
                  <Crown size={20} />
                  Mua Ngay — 30.000 VND / Tháng
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          )}

          {/* Security note */}
          {!isVip && (
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              <Lock size={12} />
              <span>Thanh toán an toàn • Không lưu thông tin thẻ • Hủy bất kỳ lúc nào</span>
            </div>
          )}
        </div>

        {/* FAQ / Note */}
        <div style={{
          marginTop: '24px', padding: '20px 24px', borderRadius: '16px',
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <h3 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={16} color="#f59e0b" /> Câu Hỏi Thường Gặp
          </h3>
          {[
            ['Tôi có thể hủy không?', 'Có, bạn có thể hủy bất kỳ lúc nào. Quyền truy cập sẽ hết sau chu kỳ hiện tại.'],
            ['Gói có tự động gia hạn không?', 'Không. Bạn sẽ cần mua thủ công mỗi tháng.'],
            ['Hỗ trợ thanh toán nào?', 'Momo, ZaloPay, chuyển khoản ngân hàng, và thẻ nội địa.'],
          ].map(([q, a], i) => (
            <div key={i} style={{ marginBottom: i < 2 ? '10px' : 0 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#e5e7eb', marginBottom: '3px' }}>Q: {q}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>A: {a}</div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes sparkleIn {
          from { opacity: 0; transform: scale(0) rotate(-30deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
