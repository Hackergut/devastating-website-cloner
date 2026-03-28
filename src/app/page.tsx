import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Features from "@/components/sections/Features";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <Header />
      <Hero />
      <Products />
      <Features />
      <FAQ />
      <Footer />
    </main>
  );
}