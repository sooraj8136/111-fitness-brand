import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/site/Navigation";
import { Footer } from "./components/site/Footer";
import { WhatsAppButton } from "./components/site/WhatsAppButton";

import { Home } from "./pages/Home";
import { Membership } from "./pages/Membership";
import { Enquiry } from "./pages/Enquiry";
import { Contact } from "./pages/Contact";

export default function App() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-[64px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
