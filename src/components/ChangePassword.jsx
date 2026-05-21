import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword, clearMessages } from "../store/loginSlice";

const ChangePassword = () => {
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isError, error, successMessage } = useSelector((state) => state.login);

    const [localError, setLocalError] = useState("");

    useEffect(() => {
        dispatch(clearMessages());
    }, [dispatch]);

    const handleChange = (e) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value
        });
        setLocalError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            setLocalError("New passwords do not match!");
            return;
        }
        const resultAction = await dispatch(changePassword({
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword
        }));

        if (changePassword.fulfilled.match(resultAction)) {
            navigate('/dashboard');
        }
    };


    return (
        <div className="page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-icon">🔑</div>
                    <h1 className="auth-title">Change Password</h1>
                    <p className="auth-subtitle">Update your password to keep your account secure.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="old-password">Current Password</label>
                        <input
                            id="old-password"
                            type="password"
                            name="oldPassword"
                            placeholder="Enter current password"
                            value={passwords.oldPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="new-password">New Password</label>
                        <input
                            id="new-password"
                            type="password"
                            name="newPassword"
                            placeholder="Min. 6 characters"
                            value={passwords.newPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="confirm-password">Confirm New Password</label>
                        <input
                            id="confirm-password"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={passwords.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn" disabled={isLoading}>
                        {isLoading ? 'Updating...' : 'Update Password'}
                    </button>
                    <button 
                        type="button" 
                        className="auth-btn" 
                        onClick={() => navigate(-1)}
                        style={{ background: 'var(--surface-2)', color: 'var(--text)', marginTop: '0.5rem' }}
                    >
                        Cancel
                    </button>
                </form>

                {(isError || localError) && (
                    <p style={{ color: 'var(--error)', marginTop: '10px', fontSize: '0.875rem', textAlign: 'center' }}>
                        {localError || error}
                    </p>
                )}


                {successMessage && (
                    <p style={{ color: 'var(--success)', marginTop: '10px', fontSize: '0.875rem', textAlign: 'center' }}>
                        {successMessage}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ChangePassword;
