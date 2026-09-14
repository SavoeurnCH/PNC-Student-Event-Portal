import { useMemo, useState } from "react";
import { events, categories } from "./data/events";

function App() {
  const [page, setPage] = useState("home");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [registered, setRegistered] = useState([]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || event.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const navigate = (target) => {
    setPage(target);
    setSelectedEvent(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const register = (event) => {
    if (!registered.includes(event.id)) {
      setRegistered([...registered, event.id]);
    }
  };

  const openEvent = (event) => {
    setSelectedEvent(event);
    setPage("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="container nav-content">
          <button className="brand" onClick={() => navigate("home")}>
            <span className="brand-mark">PNC</span>
            <span>Student Event Portal</span>
          </button>

          <nav>
            <button className={page === "home" ? "active" : ""} onClick={() => navigate("home")}>Home</button>
            <button className={page === "events" ? "active" : ""} onClick={() => navigate("events")}>Events</button>
            <button className={page === "about" ? "active" : ""} onClick={() => navigate("about")}>About</button>
          </nav>
        </div>
      </header>

      <main>
        {page === "home" && (
          <>
            <section className="hero">
              <div className="container hero-grid">
                <div>
                  <span className="eyebrow">PNC STUDENT COMMUNITY</span>
                  <h1>Discover. Learn. Connect.</h1>
                  <p>
                    Explore workshops, technology events, career activities,
                    and student life at Passerelles Numériques Cambodia.
                  </p>
                  <button className="primary-btn" onClick={() => navigate("events")}>
                    Explore Events →
                  </button>
                </div>
                <div className="hero-card">
                  <div className="hero-icon">📅</div>
                  <h3>Upcoming Events</h3>
                  <strong>{events.length} events available</strong>
                  <p>Build skills and connect with the PNC community.</p>
                </div>
              </div>
            </section>

            <section className="container section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">WHAT'S HAPPENING</span>
                  <h2>Upcoming Events</h2>
                </div>
                <button className="text-btn" onClick={() => navigate("events")}>View All →</button>
              </div>

              <div className="event-grid">
                {events.slice(0, 3).map((event) => (
                  <EventCard key={event.id} event={event} onView={() => openEvent(event)} />
                ))}
              </div>
            </section>

            <section className="container section stats">
              <div><strong>{events.length}</strong><span>Upcoming Events</span></div>
              <div><strong>5+</strong><span>Event Categories</span></div>
              <div><strong>100%</strong><span>Student Community</span></div>
            </section>
          </>
        )}

        {page === "events" && (
          <section className="container section page-section">
            <span className="eyebrow">EXPLORE</span>
            <h1 className="page-title">PNC Events</h1>
            <p className="page-intro">Find activities that help you learn, grow, and connect.</p>

            <div className="filters">
              <input
                type="search"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>

            <p className="result-count">{filteredEvents.length} event(s) found</p>

            <div className="event-grid">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} onView={() => openEvent(event)} />
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="empty">No events found. Try another search or category.</div>
            )}
          </section>
        )}

        {page === "details" && selectedEvent && (
          <section className="container section details-page">
            <button className="back-btn" onClick={() => navigate("events")}>← Back to Events</button>

            <div className="details-card">
              <div className="details-icon">{selectedEvent.icon}</div>
              <div className="event-category">{selectedEvent.category}</div>
              <h1>{selectedEvent.title}</h1>
              <p className="details-description">{selectedEvent.description}</p>

              <div className="details-info">
                <div><span>📅</span><div><small>Date</small><strong>{selectedEvent.date}</strong></div></div>
                <div><span>🕒</span><div><small>Time</small><strong>{selectedEvent.time}</strong></div></div>
                <div><span>📍</span><div><small>Location</small><strong>{selectedEvent.location}</strong></div></div>
              </div>

              <button
                className={registered.includes(selectedEvent.id) ? "registered-btn" : "primary-btn"}
                onClick={() => register(selectedEvent)}
              >
                {registered.includes(selectedEvent.id) ? "✓ Registration Completed" : "Register Now"}
              </button>

              {registered.includes(selectedEvent.id) && (
                <p className="success-message">Thank you! Your demo registration has been recorded in this browser.</p>
              )}
            </div>
          </section>
        )}

        {page === "about" && (
          <section className="container section page-section about">
            <span className="eyebrow">ABOUT THE PROJECT</span>
            <h1 className="page-title">PNC Student Event Portal</h1>
            <p>
              This sample frontend application is designed for learning modern
              web application deployment. It uses React and Vite and does not
              require a backend or database.
            </p>

            <div className="learning-flow">
              <div>Source Code</div><span>→</span>
              <div>React + Vite</div><span>→</span>
              <div>npm run build</div><span>→</span>
              <div>dist/</div><span>→</span>
              <div>Web Server</div>
            </div>

            <h2>Learning Purpose</h2>
            <ul>
              <li>Understand a modern frontend project structure.</li>
              <li>Install project dependencies with npm.</li>
              <li>Run the development server.</li>
              <li>Create a production build.</li>
              <li>Deploy the generated <code>dist/</code> files to Apache.</li>
            </ul>
          </section>
        )}
      </main>

      <footer>
        <div className="container">
          <strong>PNC Student Event Portal</strong>
          <span>Sample project for Modern Deployment learning</span>
        </div>
      </footer>
    </div>
  );
}

function EventCard({ event, onView }) {
  return (
    <article className="event-card">
      <div className="card-top">
        <div className="event-icon">{event.icon}</div>
        <span>{event.category}</span>
      </div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <div className="card-meta">
        <div>📅 {event.date}</div>
        <div>📍 {event.location}</div>
      </div>
      <button className="card-btn" onClick={onView}>View Details →</button>
    </article>
  );
}

export default App;