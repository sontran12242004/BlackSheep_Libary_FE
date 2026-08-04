import React from 'react';

/**
 * ErrorBoundary — catches render errors in child components
 * and displays a fallback UI instead of crashing the whole app.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <SomeComponent />
 *   </ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] Caught an error:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-primary, #050507)',
            color: 'var(--text-primary, #fff)',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '16px',
              padding: '40px 48px',
              maxWidth: '560px',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚠️</div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '12px', color: '#ef4444' }}>
              Đã xảy ra lỗi không mong muốn
            </h2>
            <p style={{ color: 'var(--text-secondary, #aaa)', marginBottom: '24px', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Một phần của ứng dụng gặp lỗi. Thông tin lỗi đã được ghi lại trong console.
            </p>
            {this.state.error && (
              <pre
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '0.75rem',
                  color: '#fca5a5',
                  textAlign: 'left',
                  overflowX: 'auto',
                  marginBottom: '24px',
                  maxHeight: '120px',
                  overflowY: 'auto',
                }}
              >
                {this.state.error.message}
              </pre>
            )}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={this.handleReset}
                style={{
                  background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Thử lại
              </button>
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Tải lại trang
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
