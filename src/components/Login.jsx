import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../store/loginSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { isLoading, isError, error } = useSelector((state) => state.login);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.email && formData.password) {
            const resultAction = await dispatch(loginUser({
                email: formData.email,
                password: formData.password
            }));

            if (loginUser.fulfilled.match(resultAction)) {
                navigate("/dashboard");
            }
        }
    };

    return (
        <div className="page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-icon">🔐</div>
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Sign in to your account to continue</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="login-email">Email Address</label>
                        <input
                            id="login-email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="field">
                        <div className="field-row">
                            <label htmlFor="login-password">Password</label>
                            <Link className="forgot-link" to="/forgot-password">Forgot password?</Link>
                        </div>

                        <input
                            id="login-password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {isError && (
                    <p style={{ color: 'var(--error)', marginTop: '10px', fontSize: '0.875rem', textAlign: 'center' }}>
                        {error || "Login failed. Please check your credentials."}
                    </p>
                )}


                <p className="auth-switch">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="switch-btn">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
