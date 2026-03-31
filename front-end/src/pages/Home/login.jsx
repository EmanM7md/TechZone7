import { useState } from "react";
import Pagetransition from "../../components/pagetransition";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const clearMessages = () => {
    setError("");
    setSuccess(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearMessages();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    // Validate required fields
    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }
    if (!formData.password) {
      setError("Password is required");
      return;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    const payload = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password
    };

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      
      if (res.ok) {
        if (!data.data || !data.data.token) {
          setError("Invalid response from server");
          return;
        }
        localStorage.setItem('token', data.data.token);
        setSuccess(true);
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pagetransition>
      <div style={styles.respon}>
        <div style={styles.container}>
          <h1 style={styles.title}>Login</h1>

          <form style={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="your email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="your password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>

          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>Login successfully ✅ Redirecting...</p>}
        </div>
      </div>
    </Pagetransition>
  );
}

const styles = {
  respon: {
    minHeight: "75vh"
  },
  container: {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
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
    textAlign: "center",
    marginTop: "15px",
  },
  success: {
    color: "green",
    textAlign: "center",
    marginTop: "15px",
  },
};