import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:8000/api/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(form),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Registration failed");
                return;
            }

            navigate("/dashboard");
        } catch (err) {
            setError("Could not connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-container">

                <div className="auth-header">
                    <Link to="/" className="auth-logo">
                        NEXA
                    </Link>

                    <h1>Create your account.</h1>

                    <p>
                        Start managing your money in one simple place.
                    </p>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleRegister}
                >

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <div className="form-row">

                        <div className="form-group">
                            <label htmlFor="first_name">
                                First name
                            </label>

                            <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                placeholder="John"
                                value={form.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="last_name">
                                Last name
                            </label>

                            <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                placeholder="Doe"
                                value={form.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="form-group">
                        <label htmlFor="register-email">
                            Email
                        </label>

                        <input
                            id="register-email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="register-password">
                            Password
                        </label>

                        <input
                            id="register-password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                            autoComplete="new-password"
                        />
                    </div>

                    <button
                        className="auth-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating account..."
                            : "Create account"}
                    </button>

                </form>

                <div className="auth-footer">
                    <span>Already have an account?</span>

                    <Link to="/login">
                        Log in
                    </Link>
                </div>

                <Link
                    to="/"
                    className="back-home"
                >
                    ← Back to home
                </Link>

            </div>
        </main>
    );
}