import Banner from "@/components/sections/Banner";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <Banner />
      <Header />
      <Hero />
      <Products />
      <Footer />
    </main>
  );
}