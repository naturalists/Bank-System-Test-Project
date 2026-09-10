import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/api/user", {
            credentials: "include",
            headers: { Accept: "application/json" },
        })
            .then(async (response) => {
                if (response.ok) setUser(await response.json());
            })
            .catch(() => setUser(null));
    }, []);

    return (
        <main className="home-page">
            <nav className="simple-home-nav" aria-label="Main navigation">
                <Link to="/" className="logo">NEXA<span>.</span></Link>
                <div className="simple-home-actions">
                    {user ? (
                        <Link to="/dashboard" className="nav-button">Dashboard</Link>
                    ) : (
                        <>
                            <Link to="/login" className="login-link">Log in</Link>
                            <Link to="/register" className="nav-button">Sign up</Link>
                        </>
                    )}
                </div>
            </nav>

            <section className="simple-home-hero">
                <div className="simple-home-copy">
                    <span className="eyebrow">Nexa banking</span>
                    <h1>Manage your money simply.</h1>
                    <p>Check your balance, send money, and view your transactions from one clear dashboard.</p>
                    <Link to={user ? "/dashboard" : "/register"} className="button-primary">{user ? "Open dashboard" : "Create an account"}</Link>
                </div>

                <div className="simple-balance-preview" aria-label="Example Nexa balance preview">
                    <div className="simple-preview-top"><span>Nexa cash</span><span className="preview-dot" /></div>
                    <span className="simple-preview-label">Current balance</span>
                    <strong>$0.00</strong>
                </div>
            </section>

            <section className="simple-home-features">
                <article><span>01</span><h2>Balance</h2><p>See your current balance as soon as you log in.</p></article>
                <article><span>02</span><h2>Transfers</h2><p>Send money to another user with their username.</p></article>
                <article><span>03</span><h2>Transactions</h2><p>Review your recent account activity in one place.</p></article>
            </section>

            <section className="simple-home-info">
                <div>
                    <span className="eyebrow">How it works</span>
                    <h2>Start in a few easy steps.</h2>
                </div>
                <div className="simple-home-steps">
                    <p><strong>1.</strong> Create an account or log in.</p>
                    <p><strong>2.</strong> Check your balance on the dashboard.</p>
                    <p><strong>3.</strong> Send money by entering a username and amount.</p>
                </div>
            </section>

            <p className="simple-home-note">Nexa is a simple account project for checking balances and making transfers. Keep your login details private.</p>
        </main>
    );
}
