import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [message, setMessage] = useState("");
  const vantaRef = useRef(null);

  useEffect(() => {
    // Load Vanta.js dynamically
    const script1 = document.createElement("script");
    script1.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
    const script2 = document.createElement("script");
    script2.src = "https://cdn.jsdelivr.net/npm/vanta/dist/vanta.waves.min.js";

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    script2.onload = () => {
      if (window.VANTA) {
        window.VANTA.WAVES({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x00bcd4,
          shininess: 50.0,
          waveHeight: 20.0,
          waveSpeed: 0.8,
          zoom: 0.9,
        });
      }
    };

    return () => {
      if (window.VANTA && window.VANTA.WAVES) window.VANTA.WAVES.destroy();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message: msg } = formData;

    if (!name || !email || !msg) {
      setMessage("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      setMessage("Please enter a valid email.");
      return;
    }

    const submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    submissions.push({
      name,
      email,
      message: msg,
      time: new Date().toLocaleString(),
    });
    localStorage.setItem("submissions", JSON.stringify(submissions));

    setMessage("Message submitted successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div ref={vantaRef} className="vanta-bg">
      <header className="header">
        <h1>
          <img src="/src/logo.png" className="logo" alt="logo" /> Kishkam
          Robotics Lab
        </h1>
        <p>Innovating the Future with Robotics</p>
      </header>

      {/* Careers Section */}
      <section className="careers">
        <h2>Join Our Team</h2>
        <div className="card-container">
          {[
            {
              title: "Frontend Intern",
              desc: "Build responsive user interfaces and bring designs to life.",
            },
            {
              title: "Full-Stack Intern",
              desc: "Work across the stack with Node.js, databases, and APIs.",
            },
            {
              title: "UI/UX Intern",
              desc: "Design intuitive interfaces and enhance user experiences.",
            },
          ].map((role, index) => (
            <div key={index} className="card">
              <h3>{role.title}</h3>
              <p>{role.desc}</p>
              <button className="apply-btn">Apply Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Your name"
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Your email"
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows="4"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder="Your message"
          ></textarea>

          <button type="submit" className="submit-btn">
            Submit
          </button>
          <p className="status">{message}</p>
        </form>
      </section>

      <footer className="footer">
        <p>© 2025 Kishkam Robotics Lab | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;
