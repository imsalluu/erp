import React from "react";
import Navbar from "@/modules/landing-page/components/navbar";
import HeroSection from "@/modules/landing-page/components/hero-section";
import TrustedCompanies from "@/modules/landing-page/components/trusted-companies";
import FeaturesSection from "@/modules/landing-page/components/features-section";
import RolesSection from "@/modules/landing-page/components/roles-section";
import AttendanceSection from "@/modules/landing-page/components/attendance-section";
import ProjectManagementSection from "@/modules/landing-page/components/project-section";
import AnalyticsSection from "@/modules/landing-page/components/analytics-section";
import MultiTenantSection from "@/modules/landing-page/components/multi-tenant-section";
import PricingSection from "@/modules/landing-page/components/pricing-section";
import TestimonialsSection from "@/modules/landing-page/components/testimonials-section";
import FaqSection from "@/modules/landing-page/components/faq-section";
import CtaSection from "@/modules/landing-page/components/cta-section";
import Footer from "@/modules/landing-page/components/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        <TrustedCompanies />
        <FeaturesSection />
        <RolesSection />
        <AttendanceSection />
        <ProjectManagementSection />
        <AnalyticsSection />
        <MultiTenantSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
