import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/loginSlice";

const AdminDashboard = () => {
    const { userData } = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="page">
            <div className="auth-card" style={{ maxWidth: '800px', textAlign: 'center', border: '2px solid var(--primary)' }}>
                <div className="auth-icon" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>🛡️</div>
                <h1 className="auth-title" style={{ fontSize: '2.5rem' }}>Admin Control Panel</h1>
                <p className="auth-subtitle" style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: '600' }}>
                    Restricted Access Area
                </p>
                
                <div className="admin-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', margin: '2rem 0' }}>
                    {[
                        { label: 'Total Users', value: '1,284', color: 'var(--primary)' },
                        { label: 'Active Sessions', value: '42', color: 'var(--success)' },
                        { label: 'System Health', value: '98%', color: 'var(--success)' },
                        { label: 'Pending Tasks', value: '5', color: 'var(--error)' }
                    ].map((stat, i) => (
                        <div key={i} style={{ background: 'var(--surface-2)', padding: '1.25rem', borderRadius: 'var(--radius)', borderLeft: `4px solid ${stat.color}` }}>
                            <div style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>{stat.label}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text)' }}>{stat.value}</div>
                        </div>
                    ))}
                </div>

                <div style={{ background: 'var(--surface-2)', padding: '1.5rem', borderRadius: 'var(--radius)', marginBottom: '2rem', textAlign: 'left' }}>
                    <h3 style={{ color: 'var(--text)', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                        Admin Credentials
                    </h3>
                    <p style={{ color: 'var(--muted)', marginBottom: '0.5rem' }}>
                        <strong style={{ color: 'var(--text)' }}>Admin Email:</strong> {userData?.user?.email || userData?.email || "admin@example.com"}
                    </p>
                    <p style={{ color: 'var(--muted)' }}>
                        <strong style={{ color: 'var(--text)' }}>Role:</strong> <span className="role-badge" style={{ background: 'var(--primary)', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem' }}>ADMIN</span>
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button className="auth-btn" onClick={() => navigate("/dashboard")} style={{ maxWidth: '200px', background: 'var(--surface-3)', color: 'var(--text)' }}>
                        User Dashboard
                    </button>
                    <button className="auth-btn" onClick={handleLogout} style={{ maxWidth: '200px' }}>
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
