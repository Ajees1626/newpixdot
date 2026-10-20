import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ClientMarqueeRow from "@/sections/Clients/ClientMarqueeRow";
import { CLIENT_BRANDS, CLIENT_PARTNER_COUNT } from "@/constants/clients";

const mid = Math.ceil(CLIENT_BRANDS.length / 2);
const ROW_A = CLIENT_BRANDS.slice(0, mid);
const ROW_B = CLIENT_BRANDS.slice(mid);

export default function ClientWall() {
  return (
    <section className="overflow-hidden py-20 sm:py-28 lg:py-36">
      <Container>
        <SectionHeader
          eyebrow="Clients"
          title={`A roster of ${CLIENT_PARTNER_COUNT}+ brands we're proud to stand behind.`}
          description="From startups to established names — partners who trust Pixdot with their brand and digital growth."
          link={{ label: "Work with us", href: "/contact" }}
          className="mb-10 sm:mb-12 lg:mb-14"
        />
      </Container>

      <div className="flex flex-col gap-4 sm:gap-6">
        <ClientMarqueeRow variant="logo" brands={ROW_A} speed="slow" size="lg" />
        <ClientMarqueeRow variant="logo" brands={ROW_B} reverse speed="slow" size="lg" />
      </div>
    </section>
  );
}
