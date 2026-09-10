import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/api/user",{
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json",
            },
        })
        .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    setUser(data);
                }
            })
    }, []);

    if(user) {
        navigate("/dashboard");
        return null;
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Login failed");
                setLoading(false);
                return;
            }

            navigate("/dashboard");
        } catch (err) {
            setError("Could not connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-container">
                <Link to="/" className="auth-logo">NEXA<span>.</span></Link>
                <div className="auth-header">
                    <span className="eyebrow">Account access</span>
                    <h1>Log in</h1>
                    <p>Enter your details to open your account.</p>
                </div>

                <form className="auth-form" onSubmit={handleLogin}>
                    {error && <div className="auth-error" role="alert">{error}</div>}

                    <label className="auth-field" htmlFor="email">Email
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </label>

                    <label className="auth-field" htmlFor="password">Password
                        <input
                            id="password"
                            type="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </label>

                    <button className="auth-button" type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Log in"}
                    </button>
                </form>

                <div className="auth-footer">
                    <span>Don't have an account?</span>
                    <Link to="/register">Create one</Link>
                </div>

                <Link to="/" className="back-home">← Back to home</Link>
            </div>
        </main>
    );
}