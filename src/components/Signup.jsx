import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../store/signupSlice";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const { isLoading, isError, error } = useSelector((state) => state.form);

    const handleform = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.password) {
            const resultAction = await dispatch(registerUser({ name: formData.name, email: formData.email, password: formData.password }));

            if (registerUser.fulfilled.match(resultAction)) {
                navigate("/login");
            }
        }
    };

    return (
        <div className="page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-icon">🚀</div>
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join us today — it&apos;s free &amp; takes 30 seconds</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="signup-name">Full Name</label>
                        <input type="text" id="signup-name" name="name" placeholder="John Doe" value={formData.name} onChange={handleform} required />
                    </div>
                    <div className="field">
                        <label htmlFor="signup-email">Email Address</label>
                        <input type="email" id="signup-email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleform} required />
                    </div>
                    <div className="field">
                        <label htmlFor="signup-password">Password</label>
                        <input type="password" id="signup-password" name="password" placeholder="Min. 6 characters" value={formData.password} onChange={handleform} required />
                    </div>
                    <button type="submit" className="auth-btn" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                {isError && (
                    <p style={{ color: 'var(--error)', marginTop: '10px', fontSize: '0.875rem', textAlign: 'center' }}>
                        {error || "Registration failed"}
                    </p>
                )}


                <p className="auth-switch">
                    Already have an account?
                    <Link to="/login" className="switch-btn">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;