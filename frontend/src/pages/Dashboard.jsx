import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showTransferPopup, setShowTransferPopup] = useState(false);
    const [showResponsePopup, setShowResponsePopup] = useState(false);
    const [transferLoading, setTransferLoading] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [transferResponse, setTransferResponse] = useState(null);
    const [transferForm, setTransferForm] = useState({
        username: "",
        message: "",
        amount: "",
    });

    const handleTransferChange = (event) => {
        const { name, value } = event.target;
        setTransferForm((currentForm) => ({ ...currentForm, [name]: value }));
    };

    const handleTransfer = async (event) => {
        event.preventDefault();
        setTransferLoading(true);

        try {
            const response = await fetch("http://localhost:8000/api/transfer", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    toUsername: transferForm.username,
                    message: transferForm.message,
                    amount: Number(transferForm.amount),
                }),
            });
            const data = await response.json();

            setTransferResponse({
                success: response.ok,
                message: data.message || (response.ok ? "Transfer complete" : "Transfer failed"),
            });
            setShowTransferPopup(false);
            setShowResponsePopup(true);

            if (response.ok) {
                setTransferForm({ username: "", amount: "" });
                window.location.reload();
            }
        } catch (requestError) {
            setTransferResponse({ success: false, message: "Could not connect to the server." });
            setShowTransferPopup(false);
            setShowResponsePopup(true);
        } finally {
            setTransferLoading(false);
        }
    };

    const handleLogout = async () => {
        setLogoutLoading(true);

        try {
            await fetch("http://localhost:8000/api/logout", {
                method: "POST",
                credentials: "include",
            });
        } finally {
            setLogoutLoading(false);
            navigate("/");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let request_user = await fetch("http://localhost:8000/api/user", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json",
                    },
                });
                const data_user = await request_user.json();
                if (!request_user.ok) {
                    setError(data_user);
                    throw new Error(data_user.message || "Unable to load your account");
                } else {
                    setUser(data_user);
                }
                let request_transaction = await fetch("http://localhost:8000/api/transactions", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json",
                    },
                })
                const data_transaction = await request_transaction.json();
                if (!request_transaction.ok) {
                    setError(data_transaction);
                    throw new Error(data_transaction.message || "Unable to load your account");
                } else {
                    setTransactions(data_transaction);
                }
                setLoading(false);
            } catch (fetchError) {
                setError(fetchError);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <main className="dashboard-loading">
                <div className="dashboard-loader">
                    <span className="eyebrow">Nexa banking</span>
                    <p>Preparing your account...</p>
                </div>
            </main>
        );
    }
    if (error) {
        if (error.message === "User isn't logged in") {
            navigate("/login");
            return null;
        }
        return (
            <main className="dashboard-loading">
                <div className="dashboard-error">
                    <span className="eyebrow">Something went wrong</span>
                    <h2>We could not open your dashboard.</h2>
                    <p>{error.message || "An error occurred"}</p>
                    <Link to="/login" className="button-primary">Return to login</Link>
                </div>
            </main>
        );
    }

    const firstName = user?.first_name || user?.username?.split(" ")[0] || "there";
    const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(" ") || user?.username || "Nexa member";
    const balance = Number(user?.balance || 0);
    const formattedBalance = balance.toLocaleString("en-US", {
        style: "currency",
        currency: "EUR",
    });
    const createdDate = user?.created_at
        ? new Date(user.created_at.replace(" ", "T")).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "Not available";

    return (
        <main className="dashboard-shell">
            <aside className="sidebar">
                <div className="brand-column">
                    <Link to="/" className="logo">NEXA<span>.</span></Link>
                </div>

                <nav className="side-nav" aria-label="Main navigation">
                    <a href="#overview" className="active">Overview</a>
                    <a href="#transactions">Transactions</a>
                    <a href="#accounts">Accounts</a>
                    <a href="#goals">Goals</a>
                </nav>

                <div className="side-card">
                    <small>Account status</small>
                    <strong>{user?.role || "User"}</strong>
                    <span>Created {createdDate}</span>
                </div>
            </aside>

            <section className="dashboard-main">
                <header className="topbar" id="overview">
                    <div>
                        <span className="eyebrow">Account overview</span>
                        <h1>Good morning, {firstName}.</h1>
                    </div>
                    <div className="topbar-actions">
                        <button
                            className="avatar avatar-button"
                            type="button"
                            onClick={() => setShowAccountMenu((isOpen) => !isOpen)}
                            aria-label="Open account menu"
                            aria-expanded={showAccountMenu}
                            title="Account menu"
                        >
                            {firstName.charAt(0).toUpperCase()}
                        </button>
                        {showAccountMenu && (
                            <div className="account-menu">
                                <span>{fullName}</span>
                                <button type="button" onClick={handleLogout} disabled={logoutLoading}>
                                    {logoutLoading ? "Logging out..." : "Log out"}
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                <section className="summary-grid" aria-label="Account summary">
                    <article className="summary-card main-balance">
                        <div className="summary-header">
                            <span>Total balance</span>
                            <span className="badge success">Current balance</span>
                        </div>
                        <strong>{formattedBalance}</strong>
                        <div className="summary-meta">
                            <div>
                                <small>Balance</small>
                                <b>{formattedBalance}</b>
                            </div>
                            <div>
                                <small>Role</small>
                                <b>{user?.role || "User"}</b>
                            </div>
                        </div>
                    </article>

                    <article className="summary-card small-panel">
                        <span className="panel-label">Account created</span>
                        <strong>{createdDate}</strong>
                        <small>Member since this date</small>
                    </article>

                    <article className="summary-card small-panel">
                        <span className="panel-label">Email</span>
                        <strong className="summary-email">{user?.email || "Not available"}</strong>
                        <small>Primary account email</small>
                    </article>
                </section>

                <section className="content-grid" id="accounts">
                    <article className="panel">
                        <div className="panel-head">
                            <div>
                                <span className="panel-label">Cash balance</span>
                                <h2>Money available</h2>
                            </div>
                            <span className="badge success">Available</span>
                        </div>
                        <div className="account-card cash-balance-card">
                            <div className="account-card-top">
                                <span>Nexa cash</span>
                                <span>{user?.role || "User"}</span>
                            </div>
                            <div className="cash-balance-amount">{formattedBalance}</div>
                            <div className="account-card-footer">
                                <div><small>Account holder</small><strong>{fullName}</strong></div>
                                <div><small>Account</small><strong>{user?.email || user?.username}</strong></div>
                            </div>
                            <button className="cash-send-button" type="button" onClick={() => setShowTransferPopup(true)}>
                                Send money
                            </button>
                        </div>
                    </article>

                    <article className="panel" id="goals">
                        <div className="panel-head">
                            <div>
                                <span className="panel-label">Profile details</span>
                                <h2>Your account</h2>
                            </div>
                            <span className="badge success">{user?.role || "User"}</span>
                        </div>
                        <div className="account-details">
                            <div><span>Username</span><strong>{user?.username || "Not available"}</strong></div>
                            <div><span>First name</span><strong>{user?.first_name || "Not available"}</strong></div>
                            <div><span>Last name</span><strong>{user?.last_name || "Not available"}</strong></div>
                            <div><span>Created</span><strong>{createdDate}</strong></div>
                        </div>
                    </article>
                </section>

                <section className="panel transactions-panel" id="transactions">
                    <div className="panel-head">
                        <div>
                            <span className="panel-label">Activity</span>
                            <h2>Recent transactions</h2>
                        </div>
                    </div>
                    <div className="transaction-list">
                        {transactions?.logs?.length === 0 ? (
                            <p className="no-transactions">No transactions found.</p>
                        ) : (
                            transactions.logs.map((transaction) => {
                                if(transaction.sender == user.username) {
                                    return (
                                        <div className="transaction-row">
                                            <span className="transaction-dot red" />
                                                <div className="transaction-copy">
                                                    <strong>
                                                        To {transaction.sender} — {transaction.type}
                                                    </strong>
                                                    <small>{transaction.createdDate}</small>
                                                </div>
                                                <span className="transaction-amount red">
                                                    -{Number(transaction.amount).toLocaleString("en-US", {
                                                    style: "currency",
                                                    currency: "EUR",
                                                })}
                                            </span>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className="transaction-row">
                                            <span className="transaction-dot green" />
                                                <div className="transaction-copy">
                                                    <strong>
                                                        From {transaction.sender} — {transaction.type}
                                                    </strong>
                                                    <small>{transaction.createdDate}</small>
                                                </div>
                                                <span className="transaction-amount green">
                                                    +{Number(transaction.amount).toLocaleString("en-US", {
                                                    style: "currency",
                                                    currency: "EUR",
                                                })}
                                            </span>
                                        </div>
                                    );
                                }
                            })
                        )}
                   </div>
                </section>
            </section>

            {showTransferPopup && (
                <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
                    if (event.target === event.currentTarget) setShowTransferPopup(false);
                }}>
                    <section className="transfer-modal" role="dialog" aria-modal="true" aria-labelledby="transfer-title">
                        <div className="modal-header">
                            <div>
                                <span className="panel-label">New transfer</span>
                                <h2 id="transfer-title">Send money</h2>
                            </div>
                            <button className="modal-close" type="button" onClick={() => setShowTransferPopup(false)} aria-label="Close transfer popup">×</button>
                        </div>
                        <form className="transfer-form" onSubmit={handleTransfer}>
                            <label htmlFor="username">Username<input id="username" name="username" value={transferForm.username} onChange={handleTransferChange} required /></label>
                            <label htmlFor="message">Message<input id="message" name="message" value={transferForm.message} onChange={handleTransferChange} required /></label>
                            <label htmlFor="amount">Amount<input id="amount" name="amount" type="number" min="0.01" step="0.01" placeholder="0.00" value={transferForm.amount} onChange={handleTransferChange} required /></label>
                            <button className="button-primary" type="submit" disabled={transferLoading}>{transferLoading ? "Sending..." : "Send transfer"}</button>
                        </form>
                    </section>
                </div>
            )}

            {showResponsePopup && transferResponse && (
                <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
                    if (event.target === event.currentTarget) setShowResponsePopup(false);
                }}>
                    <section className="transfer-modal response-modal" role="dialog" aria-modal="true" aria-labelledby="response-title">
                        <span className={`response-icon ${transferResponse.success ? "success" : "failure"}`}>{transferResponse.success ? "✓" : "!"}</span>
                        <h2 id="response-title">{transferResponse.success ? "Transfer sent" : "Transfer failed"}</h2>
                        <p>{transferResponse.message}</p>
                        <button className="button-primary" type="button" onClick={() => setShowResponsePopup(false)}>Close</button>
                    </section>
                </div>
            )}
        </main>
    );
}