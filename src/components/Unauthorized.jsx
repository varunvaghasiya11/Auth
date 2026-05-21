import { Link } from "react-router-dom";

const Unauthorized = () => {
    return (
        <div className="page">
            <div className="auth-card" style={{ textAlign: 'center' }}>
                <div className="auth-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)' }}>🚫</div>
                <h1 className="auth-title">Access Denied</h1>
                <p className="auth-subtitle">
                    You do not have permission to view this page.
                </p>
                <div style={{ marginTop: '2rem' }}>
                    <Link to="/dashboard" className="auth-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                        Go Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
