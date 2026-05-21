import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { logout } from "../store/loginSlice";

const Dashboard = () => {
    const { userData } = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="page">
            <div className="auth-card" style={{ maxWidth: '600px', textAlign: 'center' }}>
                <div className="success-icon">✓</div>
                <h1 className="auth-title" style={{ fontSize: '2rem' }}>Welcome to Dashboard!</h1>
                <p className="auth-subtitle" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                    You have successfully logged in.
                </p>
                
                <div style={{ background: 'var(--surface-2)', padding: '1.5rem', borderRadius: 'var(--radius)', marginBottom: '2rem', textAlign: 'left' }}>
                    <h3 style={{ color: 'var(--text)', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                        Session Information
                    </h3>
                    <p style={{ color: 'var(--muted)', marginBottom: '0.5rem' }}>
                        <strong style={{ color: 'var(--text)' }}>Status:</strong> Active
                    </p>
                    <p style={{ color: 'var(--muted)' }}>
                        <strong style={{ color: 'var(--text)' }}>Message:</strong> {userData.msg || "Logged in"}
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
                    {userData.role === 'admin' && (
                        <button 
                            className="auth-btn" 
                            onClick={() => navigate("/admin")} 
                            style={{ background: 'var(--surface-3)', color: 'var(--text)', maxWidth: '200px' }}
                        >
                            Admin Panel
                        </button>
                    )}
                    <button 
                        className="auth-btn" 
                        onClick={() => navigate("/change-password")} 
                        style={{ background: 'var(--surface-2)', color: 'var(--text)', maxWidth: '200px' }}
                    >
                        Change Password
                    </button>
                    <button className="auth-btn" onClick={handleLogout} style={{ maxWidth: '200px' }}>
                        Log Out
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
