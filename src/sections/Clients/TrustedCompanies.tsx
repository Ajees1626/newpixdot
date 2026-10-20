import Container from "@/components/ui/Container";
import Reveal from "@/components/layout/Animations/Reveal";
import ClientMarqueeRow from "@/sections/Clients/ClientMarqueeRow";

/** Text-only roster for the top trusted strip (original style). */
const TRUSTED_NAMES = [
  "velan",
  "brandbox",
  "greenline",
  "coldpoint",
  "trueself",
  "jaz",
  "barilivespaces",
  "trasureiland",
  "agamkudil",
  "2 innings",
  "megnaa",
  "rj steel",
  "hot chappathi",
  "pillar97",
  "kumali lala",
  "crescent",
  "faaso bees",
  "food tree",
  "little buds",
  "fat to fit",
  "odc",
  "roma",
  "ice spot",
  "slr bio",
  "landster",
  "vedha media",
  "bee truk",
  "anna nagar cycle",
  "spice club",
  "gmt jewellery",
  "healthy groow",
  "sankan",
];

export default function TrustedCompanies() {
  return (
    <section className="border-y border-border bg-surface/40 py-10 sm:py-14">
      <Container>
        <Reveal className="mb-6 text-center sm:mb-8">
          <p className="text-fluid-xs font-medium uppercase tracking-[0.22em] text-muted sm:tracking-[0.25em]">
            Trusted by ambitious teams worldwide
          </p>
        </Reveal>
      </Container>

      <ClientMarqueeRow names={TRUSTED_NAMES} speed="slow" />
    </section>
  );
}
