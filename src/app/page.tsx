import { Banner, Header, Hero, Products, Faq, Footer } from "@/components/sections";

export default function Home() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <Banner />
      <Header />
      <Hero />
      <Products />
      <Faq />
      <Footer />
    </main>
  );
}