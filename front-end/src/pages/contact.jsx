import { useState } from "react";
import PageTransition from "../components/pagetransition";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      clearErrors();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          message: formData.message.trim()
        })
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setErrors({ form: data.message || 'Failed to send message' });
      }
    } catch (err) {
      setErrors({ form: 'Network error: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div style={styles.containerForm}>
        <div>
          <h1 style={styles.title}>Contact Us</h1>

          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
              {errors.name && <span style={styles.error}>{errors.name}</span>}
            </div>

            <div style={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Your E-mail"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
              {errors.email && <span style={styles.error}>{errors.email}</span>}
            </div>

            <div style={styles.inputGroup}>
              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                style={styles.textarea}
              />
              {errors.message && <span style={styles.error}>{errors.message}</span>}
            </div>

            {errors.form && <p style={styles.formError}>{errors.form}</p>}

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </form>

          {success && <p style={styles.success}>Message sent successfully ✅</p>}

          <div style={styles.info}>
            <p>📞 Phone: <span>+201114426963 </span></p>
            <p>✉  E-mail:  <span>emanequtb1@gmail.com</span></p>
            <p>🌍 Location: <span> Egypt </span></p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

const styles = {
  containerForm: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    maxWidth: "768px",
    margin: "50px auto",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
    resize: "vertical",
  },
  button: {
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
  },
  formError: {
    color: "red",
    textAlign: "center",
    marginTop: "10px",
  },
  success: {
    marginTop: "15px",
    color: "green",
    textAlign: "center",
    fontWeight: "bold",
  },
  info: {
    marginTop: "30px",
    textAlign: "center",
    color: "#555",
    fontWeight: "bold",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    fontStyle: "italic",
    fontSize: "16px",
  }
};