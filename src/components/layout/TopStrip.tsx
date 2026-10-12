import { BadgeCheck, Mail, Phone, ShieldCheck, Warehouse } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { mailHref, site, telHref, waHref } from "@/lib/site";

const trust = [
  { icon: BadgeCheck, label: "GST Registered" },
  { icon: ShieldCheck, label: "Insured Moves" },
  { icon: Warehouse, label: "Own Storage Facility" },
];

// Not sticky on purpose: it scrolls away and the header takes over.
export function TopStrip() {
  return (
    <div className="bg-navy-950 text-[13px] text-white/75">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-center px-4 sm:px-6 lg:justify-between lg:px-8">
        <ul className="flex items-center gap-6">
          {trust.map(({ icon: Icon, label }, i) => (
            <li key={label} className={`items-center gap-1.5 ${i < 2 ? "flex" : "hidden sm:flex"}`}>
              <Icon className="size-4 text-teal-300" aria-hidden />
              {label}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={telHref} className="ring-hover link-line flex items-center gap-1.5 hover:text-white">
            <Phone className="i-ring size-3.5 text-teal-300" aria-hidden />
            {site.phoneDisplay}
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener"
            className="ring-hover link-line flex items-center gap-1.5 hover:text-white"
          >
            <WhatsAppIcon className="size-3.5 text-teal-300" />
            WhatsApp
          </a>
          <a href={mailHref} className="ring-hover link-line flex items-center gap-1.5 hover:text-white">
            <Mail className="size-3.5 text-teal-300" aria-hidden />
            {site.email}
          </a>
        </div>
      </div>
    </div>
  );
}
