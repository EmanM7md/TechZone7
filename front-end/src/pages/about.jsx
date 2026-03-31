import "./about.css";
import Pagetransition from '../components/pagetransition';
export default function About() {
  return (
    <Pagetransition>
    <div className="about container">
      <h1>About Us</h1>
      <p>
        Welcome to our store! We provide high-quality products with a smooth
        shopping experience. Our goal is to make online shopping simple,
        fast, and enjoyable.
      </p>

      <h2>Our Mission</h2>
      <p>
        To deliver great products with the best user experience.
      </p>

      <h2>Why Choose Us?</h2>
      <ul>
        <li>Modern and clean design</li>
        <li>Fast performance</li>
        <li>Easy navigation</li>
        <li>Reliable service</li>
      </ul>
    </div>
    </Pagetransition>
  );
}
