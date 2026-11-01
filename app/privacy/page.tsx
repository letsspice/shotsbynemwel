import type { Metadata } from "next";
import SiteHeader from "@/app/components/layout/SiteHeader";
import Footer from "@/app/components/sections/Footer";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What information Shots by Nemwel collects, how it is used, and how it is handled.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    heading: "Information We Collect",
    body: "We believe in keeping things simple. Shots by Nemwel collects very limited personal information. The only personal information requested through this website is your email address, which you may voluntarily provide if you’d like to receive Trail Notes. We do not ask for your name, phone number, or other personal details through the Trail Notes sign-up.",
  },
  {
    heading: "How We Use Your Information",
    body: "If you provide your email address, it is intended to be used solely for sharing Trail Notes, including occasional updates, photography stories, and notes from the trail. The Trail Notes mailing list is not yet active. Email addresses submitted during this period will not receive newsletters or updates until the mailing list officially launches. We will not sell, rent, or trade your email address to third parties.",
  },
  {
    heading: "Trail Notes & Subscriptions",
    body: "Signing up for Trail Notes is entirely optional. You can browse the website and explore the photography without subscribing. When the mailing list becomes active, you will be able to unsubscribe from emails at any time using the unsubscribe option provided in the email.",
  },
  {
    heading: "Third-Party Services",
    body: "This website may rely on third-party services to host its content and support its functionality. These services may process limited technical information as part of operating the website. We do not currently use your email address for advertising or share it with unrelated third parties.",
  },
  {
    heading: "Your Privacy Rights",
    body: "Your information belongs to you. You can request access to, correction of, or deletion of your email address if you have submitted it through the website. You can also withdraw your consent to receive Trail Notes at any time once the mailing list becomes active. For any privacy-related questions or requests, get in touch:",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <header>
        <SiteHeader tone="dark" />
      </header>

      <main id="main" className="site-gutter pt-6 md:pt-10">
        <article className="mx-auto max-w-[860px]">
          <h1 className="mb-8 text-center font-serif text-[40px] font-bold leading-[1.1] text-dark md:mb-10 md:text-[56px]">
            A Note on Privacy
          </h1>
          <p className="body-standard mb-10 md:mb-12">
            Your privacy matters. This page explains what information Shots by Nemwel collects, how it is used, and how it is
            handled when you visit this website.
          </p>

          {sections.map(({ heading, body }) => (
            <section key={heading} className="mb-8 md:mb-10">
              <h2 className="mb-3 font-manrope text-[20px] font-medium leading-[28px] text-dark md:text-[24px] md:leading-[32px]">{heading}</h2>
              <p className="body-standard">{body}</p>
            </section>
          ))}

          <a href={`mailto:${CONTACT_EMAIL}`} className="font-manrope text-[16px] font-semibold text-primary underline-offset-4 hover:underline md:text-[18px]">
            {CONTACT_EMAIL}
          </a>
        </article>
      </main>

      <Footer variant="minimal" />
    </>
  );
}
