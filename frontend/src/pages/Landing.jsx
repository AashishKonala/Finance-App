import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";

export default function Landing() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <h1 className="text-4xl text-center mt-10">Landing Page</h1>
    </div>
  );
}
