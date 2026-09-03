import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="site">

            <nav className="navbar">

                <Link to="/" className="logo">
                    NEXA<span>.</span>
                </Link>

                <div className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#money">Money</a>
                    <a href="#plans">Plans</a>
                </div>

                <div className="nav-actions">
                    <Link to="/login" className="login-link">
                        Log in
                    </Link>

                    <Link to="/register" className="nav-button">
                        Get started
                    </Link>
                </div>

            </nav>


            <main>

                <section className="hero">

                    <div className="hero-copy">

                        <div className="pill">
                            ✦ Banking, simplified
                        </div>

                        <h1>
                            Your money.
                            <br />
                            <span>Your way.</span>
                        </h1>

                        <p>
                            A smarter way to spend, save and manage
                            your money. Everything you need,
                            beautifully organized in one place.
                        </p>

                        <div className="hero-buttons">

                            <Link
                                to="/register"
                                className="button-primary"
                            >
                                Open your account →
                            </Link>

                            <Link
                                to="/login"
                                className="button-secondary"
                            >
                                Already a member?
                            </Link>

                        </div>

                    </div>


                    <div className="hero-visual">

                        <div className="phone">

                            <div className="phone-top">
                                <span>09:41</span>
                                <span>•••</span>
                            </div>

                            <div className="phone-greeting">
                                <small>Good morning</small>
                                <h3>Alex 👋</h3>
                            </div>

                            <div className="phone-balance">
                                <small>Total balance</small>
                                <strong>€4,280.50</strong>
                            </div>

                            <div className="phone-actions">
                                <div>↑<span>Send</span></div>
                                <div>↓<span>Add</span></div>
                                <div>＋<span>Request</span></div>
                            </div>

                            <div className="transactions">

                                <div className="transaction">
                                    <div className="transaction-icon">
                                        S
                                    </div>

                                    <div>
                                        <strong>Spotify</strong>
                                        <small>Today</small>
                                    </div>

                                    <b>- €10.99</b>
                                </div>

                                <div className="transaction">
                                    <div className="transaction-icon">
                                        C
                                    </div>

                                    <div>
                                        <strong>Salary</strong>
                                        <small>Yesterday</small>
                                    </div>

                                    <b className="positive">
                                        + €2,850
                                    </b>
                                </div>

                                <div className="transaction">
                                    <div className="transaction-icon">
                                        A
                                    </div>

                                    <div>
                                        <strong>Albert Heijn</strong>
                                        <small>Yesterday</small>
                                    </div>

                                    <b>- €46.28</b>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                <section
                    id="features"
                    className="features-section"
                >

                    <div className="section-heading">

                        <span>EVERYTHING IN ONE PLACE</span>

                        <h2>
                            Banking that works
                            <br />
                            around you.
                        </h2>

                    </div>


                    <div className="feature-grid">

                        <div className="feature-card large dark">

                            <div className="card-number">01</div>

                            <h3>
                                See your money
                                <br />
                                clearly.
                            </h3>

                            <p>
                                Know exactly where your money
                                goes with a simple overview of
                                your accounts and spending.
                            </p>

                            <div className="mini-chart">
                                <div style={{ height: "40%" }} />
                                <div style={{ height: "65%" }} />
                                <div style={{ height: "48%" }} />
                                <div style={{ height: "80%" }} />
                                <div style={{ height: "70%" }} />
                                <div style={{ height: "95%" }} />
                            </div>

                        </div>


                        <div className="feature-card">

                            <div className="card-number">02</div>

                            <div className="feature-icon">
                                €
                            </div>

                            <h3>
                                Save without
                                <br />
                                thinking about it.
                            </h3>

                            <p>
                                Create goals and automatically
                                put money aside whenever you want.
                            </p>

                        </div>


                        <div className="feature-card">

                            <div className="card-number">03</div>

                            <div className="feature-icon">
                                ↗
                            </div>

                            <h3>
                                Send money
                                <br />
                                instantly.
                            </h3>

                            <p>
                                Transfer money to other users
                                quickly and securely.
                            </p>

                        </div>


                        <div className="feature-card wide">

                            <div>
                                <div className="card-number">04</div>

                                <h3>
                                    One account.
                                    <br />
                                    Multiple possibilities.
                                </h3>

                                <p>
                                    Organize your money however
                                    makes sense to you.
                                </p>
                            </div>

                            <div className="pockets">

                                <div>
                                    <span>🏠</span>
                                    Rent
                                    <b>€950</b>
                                </div>

                                <div>
                                    <span>✈️</span>
                                    Travel
                                    <b>€420</b>
                                </div>

                                <div>
                                    <span>🍔</span>
                                    Food
                                    <b>€280</b>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                <section id="money" className="statement">

                    <span>BUILT FOR REAL LIFE</span>

                    <h2>
                        Money should feel
                        <br />
                        <i>simple.</i>
                    </h2>

                    <p>
                        No complicated menus.
                        No unnecessary paperwork.
                        Just a modern account designed
                        around how you actually live.
                    </p>

                    <Link
                        to="/register"
                        className="button-primary"
                    >
                        Start banking →
                    </Link>

                </section>


                <section id="plans" className="plans">

                    <div className="section-heading">

                        <span>CHOOSE YOUR PLAN</span>

                        <h2>
                            Simple pricing.
                        </h2>

                    </div>


                    <div className="plans-grid">

                        <Plan
                            name="Free"
                            price="€0"
                            text="Everything you need to get started."
                        />

                        <Plan
                            name="Core"
                            price="€3.99"
                            text="More tools for everyday banking."
                            featured
                        />

                        <Plan
                            name="Pro"
                            price="€9.99"
                            text="More control over your money."
                        />

                    </div>

                </section>


                <footer>

                    <div className="logo">
                        NEXA<span>.</span>
                    </div>

                    <p>
                        Banking made beautifully simple.
                    </p>

                </footer>

            </main>

        </div>
    );
}


function Plan({
    name,
    price,
    text,
    featured
}) {
    return (
        <div className={`plan ${featured ? "featured" : ""}`}>

            {featured && (
                <div className="popular">
                    MOST POPULAR
                </div>
            )}

            <h3>{name}</h3>

            <strong>{price}</strong>

            {price !== "€0" && (
                <small>/ month</small>
            )}

            <p>{text}</p>

            <Link to="/register">
                Get started →
            </Link>

        </div>
    );
}