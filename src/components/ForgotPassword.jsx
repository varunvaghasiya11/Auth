import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword, clearMessages } from "../store/loginSlice";

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [localError, setLocalError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isError, error, successMessage } = useSelector((state) => state.login);

    useEffect(() => {
        dispatch(clearMessages());
    }, [dispatch]);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLocalError("");
        if (email) {
            const resultAction = await dispatch(forgotPassword(email));
            if (forgotPassword.fulfilled.match(resultAction)) {
                setStep(2);
            }
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLocalError("");
        if (newPassword !== confirmPassword) {
            setLocalError("Passwords do not match");
            return;
        }
        if (newPassword.length < 6) {
            setLocalError("Password must be at least 6 characters");
            return;
        }
        const payload = { email, otp, newPassword };
        console.log("Sending Reset Password Request:", payload);
        const resultAction = await dispatch(resetPassword(payload));
        if (resetPassword.fulfilled.match(resultAction)) {
            navigate('/login');
        
        }
    };

    return (
        <div className="page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-icon">
                        {step === 1 ? "📧" : "🔐"}
                    </div>
                    <h1 className="auth-title">
                        {step === 1 ? "Forgot Password" : "Reset Password"}
                    </h1>
                    <p className="auth-subtitle">
                        {step === 1 
                            ? "Enter your email and we'll send you an OTP."
                            : "Enter the OTP and your new password."}
                    </p>
                </div>

                {step === 1 && (
                    <form className="auth-form" onSubmit={handleSendOtp}>
                        <div className="field">
                            <label htmlFor="forgot-email">Email Address</label>
                            <input
                                id="forgot-email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="auth-btn" disabled={isLoading}>
                            {isLoading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form className="auth-form" onSubmit={handleResetPassword}>
                        <div className="field">
                            <label htmlFor="otp">One-Time Password (OTP)</label>
                            <input
                                id="otp"
                                type="text"
                                name="otp"
                                placeholder="Enter 4-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
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
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input
                                id="confirm-password"
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="auth-btn" disabled={isLoading}>
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </button>
                        <button 
                            type="button" 
                            className="auth-btn" 
                            onClick={() => setStep(1)}
                            style={{ background: 'var(--surface-2)', color: 'var(--text)', marginTop: '0.5rem' }}
                        >
                            Back
                        </button>
                    </form>
                )}

                {(isError || localError) && (
                    <p style={{ color: 'var(--error)', marginTop: '10px', fontSize: '0.875rem', textAlign: 'center' }}>
                        {localError || error}
                    </p>
                )}

                {successMessage && (
                    <p style={{ color: 'var(--success)', marginTop: '10px', fontSize: '0.875rem', textAlign: 'center' }}>
                        {successMessage}
                        {step === 2 && successMessage.includes('successful') && " Redirecting to login..."}
                    </p>
                )}

                {step === 1 && (
                    <p className="auth-switch">
                        Remember your password?{" "}
                        <Link to="/login" className="switch-btn">Sign in</Link>
                    </p>
                )}

            </div>
        </div>
    );
};

export default ForgotPassword;
