import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `Terms that apply to moving, packing, transport and storage services provided by ${site.name}.`,
  alternates: { canonical: "/terms-and-conditions" },
};

// TODO(client): confirm advance %, cancellation charges, claim window and insurance terms.
export default function TermsPage() {
  return (
    <LegalPage
      slug="terms-and-conditions"
      title="Terms and Conditions"
      updated="October 2026"
      intro={
        <p>
          These terms apply to all services provided by {site.name} and to the use of this website. By booking our services or
          using this website, you agree to them.
        </p>
      }
      sections={[
        {
          title: "Our services",
          body: (
            <p>
              We provide household and office relocation, local, domestic and international moving, packing and unpacking, vehicle
              transport, and storage. The exact scope of work for your move is as agreed in your quotation.
            </p>
          ),
        },
        {
          title: "Quotations",
          body: (
            <ul>
              <li>Quotes are based on the information you share — items, volume, distance, floor and access.</li>
              <li>If the actual goods or conditions differ, the final charges may change.</li>
              <li>Quotes are valid for a limited period and subject to availability.</li>
            </ul>
          ),
        },
        {
          title: "Booking & payment",
          body: (
            <ul>
              <li>A booking is confirmed once the advance is paid, as communicated at the time of booking.</li>
              <li>The balance is payable as agreed, usually before or at delivery.</li>
              <li>Extra charges such as parking, tolls, society fees or extra labour, if any, are informed in advance.</li>
            </ul>
          ),
        },
        {
          title: "Cancellation & rescheduling",
          body: (
            <p>
              Please inform us as early as possible. Cancellation charges, if any, apply as communicated at the time of booking.
            </p>
          ),
        },
        {
          title: "Customer responsibilities",
          body: (
            <ul>
              <li>Share correct details of the goods and addresses.</li>
              <li>Keep cash, jewellery, documents and other valuables with you.</li>
              <li>Do not hand over illegal, hazardous or flammable items.</li>
              <li>Arrange any society or building permissions needed for loading and unloading.</li>
            </ul>
          ),
        },
        {
          title: "Insurance, damage & claims",
          body: (
            <>
              <p>
                Transit insurance is available on request. Without insurance, our liability is limited as communicated at booking.
              </p>
              <p>
                Please check your goods at delivery and note visible damage on the receipt. Claims must be reported within the
                period communicated at booking, with photos. We are not responsible for normal wear and tear or internal faults of
                electrical items.
              </p>
            </>
          ),
        },
        {
          title: "Storage",
          body: (
            <p>
              Stored goods are recorded in an inventory at the time of storage. Storage charges apply for the agreed period, and
              goods are released on clearance of dues.
            </p>
          ),
        },
        {
          title: "Delays",
          body: (
            <p>
              We are not responsible for delays caused by weather, traffic, strikes, government restrictions or other events
              beyond our control.
            </p>
          ),
        },
        {
          title: "Governing law",
          body: (
            <p>
              These terms are governed by the laws of India, and disputes are subject to the jurisdiction of the courts in
              Gurgaon, Haryana.
            </p>
          ),
        },
      ]}
    />
  );
}
