import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects the information you share with us.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      slug="privacy-policy"
      title="Privacy Policy"
      updated="October 2026"
      intro={
        <p>
          {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your privacy. This policy explains what
          information we collect when you visit our website or contact us, how we use it, and the choices you have.
        </p>
      }
      sections={[
        {
          title: "Information we collect",
          body: (
            <>
              <p>
                We only collect information you choose to share, such as when you fill an enquiry form, call, WhatsApp or email
                us:
              </p>
              <ul>
                <li>Your name, mobile number and email address</li>
                <li>Pickup and drop locations, moving date and type of move</li>
                <li>Details or photos of the items to be moved or stored</li>
                <li>Any message or special requirement you share</li>
              </ul>
              <p>
                Like most websites, we may also collect basic technical data such as browser type and pages visited, through
                cookies and analytics.
              </p>
            </>
          ),
        },
        {
          title: "How we use it",
          body: (
            <ul>
              <li>To respond to your enquiry and share a quote</li>
              <li>To plan, schedule and carry out your move or storage</li>
              <li>To contact you about your booking, updates or feedback</li>
              <li>To improve our website and services</li>
            </ul>
          ),
        },
        {
          title: "Sharing of information",
          body: (
            <p>
              We never sell or rent your personal information. Details are shared only when needed to complete your move — for
              example with our crew, transport or freight partners — or when required by law.
            </p>
          ),
        },
        {
          title: "Cookies",
          body: (
            <p>
              Our website may use cookies to work properly and to understand how visitors use it. You can disable cookies in your
              browser settings.
            </p>
          ),
        },
        {
          title: "Data security & retention",
          body: (
            <p>
              We take reasonable steps to protect your information and keep it only as long as needed for your move, our records
              or legal requirements.
            </p>
          ),
        },
        {
          title: "Your rights",
          body: (
            <p>
              You can ask us at any time to view, correct or delete the personal information we hold about you using the details
              below.
            </p>
          ),
        },
        {
          title: "Changes to this policy",
          body: <p>We may update this policy from time to time. Changes will be posted on this page with the updated date.</p>,
        },
      ]}
    />
  );
}
