import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PortfolioPageContent from "@/components/sections/PortfolioPageContent";

export default function PortfolioPage() {
  return (
    <main className="bg-[#13131a]">
      <Navbar />
      <PortfolioPageContent />
      <Footer />
    </main>
  );
}
