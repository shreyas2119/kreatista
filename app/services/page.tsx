import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ServicesPageContent from "@/components/sections/ServicesPageContent";

export default function ServicesPage() {
  return (
    <main className="bg-[#13131a]">
      <Navbar />
      <ServicesPageContent />
      <Footer />
    </main>
  );
}
