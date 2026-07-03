import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Coffee,
  Cpu,
  Home as HomeIcon,
  Lock,
  Mail,
  MapPin,
  MonitorSpeaker,
  Phone,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { AccessibilityToggle } from "@/components/accessibility-toggle";
import { ContactForm } from "@/components/contact-form";
import { FallingBlocks } from "@/components/falling-blocks";
import { LoadingAnimation } from "@/components/loading-animation";
import { ScrollAnimations } from "@/components/scroll-animations";
import { getContent } from "@/lib/content";
import { buildHomePageJsonLd, stringifyJsonLd } from "@/lib/json-ld";

const serviceIcons: Record<string, LucideIcon> = {
  "home-theater": MonitorSpeaker,
  studios: Sparkles,
  "av-routing": Cpu,
  servers: HomeIcon,
  retro: Wrench,
};

const navItems: [string, string][] = [
  ["Services", "#consulting"],
  ["Approach", "#approach"],
  ["Why us", "#why"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
];

export default async function Home() {
  const content = await getContent();
  const { hero, proofSignals, intro, approach, consulting, proof, spotlights, cta, faq, contact, footer } =
    content;

  return (
    <main id="content" className="min-h-screen bg-[#f7f2ea] text-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(buildHomePageJsonLd(content)) }}
      />
      <a
        href="#content"
        className="sr-only z-[110] rounded-md bg-white px-4 py-3 font-black uppercase text-neutral-950 shadow-[6px_6px_0_#111] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <LoadingAnimation />
      <ScrollAnimations />
      <FallingBlocks />
      <header className="sticky top-0 z-50 border-b border-neutral-950/10 bg-[#f7f2ea]/92 backdrop-blur">
        <div
          data-scroll-progress
          className="absolute inset-x-0 top-0 h-1 origin-left bg-rose-600"
        />
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-8 sm:py-4">
          <a href="#top" className="flex items-center gap-3 font-black uppercase tracking-wide">
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-neutral-950 text-lg text-white">
              JRW
            </span>
            <span className="hidden text-sm leading-tight sm:block">
              Tech
              <br />
              <span className="text-teal-700">Works</span>
            </span>
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-bold uppercase tracking-wide text-neutral-700 transition hover:text-neutral-950"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <AccessibilityToggle />
            <a
              href="#contact"
              data-button
              className="inline-flex h-11 items-center justify-center rounded-md bg-rose-600 px-3 text-xs font-black uppercase tracking-wide text-white transition hover:bg-rose-700 sm:px-4 sm:text-sm"
            >
              <span className="sm:hidden">Quote</span>
              <span className="hidden sm:inline">Get a quote</span>
            </a>
          </div>
        </div>
        <nav
          aria-label="Mobile section navigation"
          className="flex gap-2 overflow-x-auto border-t border-neutral-950/10 px-4 py-2 lg:hidden"
        >
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="shrink-0 rounded-md border border-neutral-950/15 bg-white px-3 py-2 text-xs font-black uppercase tracking-wide text-neutral-800"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section
        id="top"
        aria-labelledby="hero-title"
        data-physics-section="0"
        className="relative overflow-hidden border-b border-neutral-950/10"
      >
        <div className="absolute inset-x-0 top-0 h-3 bg-[linear-gradient(90deg,#111_0_25%,#0f766e_25%_50%,#e11d48_50%_75%,#f59e0b_75%_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:pb-20 lg:pt-20">
          <div className="max-w-3xl" data-hero-copy>
            <p
              data-physics-collider
              className="mb-5 inline-flex rounded-md border border-neutral-950/20 bg-white px-3 py-2 text-xs font-black uppercase tracking-wide text-neutral-700 shadow-[4px_4px_0_#f59e0b]"
            >
              {hero.badge}
            </p>
            <h1
              id="hero-title"
              data-physics-collider
              className="max-w-4xl text-4xl font-black leading-[0.94] tracking-normal text-neutral-950 min-[380px]:text-5xl sm:text-7xl lg:text-8xl"
            >
              {hero.headline}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-700 sm:text-xl">
              {hero.subhead}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={hero.primaryCta.href}
                data-button
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 text-sm font-black uppercase tracking-wide text-white transition hover:bg-neutral-800"
              >
                {hero.primaryCta.label}
                <ArrowRight aria-hidden="true" size={18} />
              </a>
              <a
                href={hero.secondaryCta.href}
                data-button
                className="inline-flex h-12 items-center justify-center rounded-md border border-neutral-950 px-5 text-sm font-black uppercase tracking-wide transition hover:bg-white"
              >
                {hero.secondaryCta.label}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2" aria-label="JRW TechWorks quality signals">
              {proofSignals.slice(0, 3).map((signal) => (
                <span
                  key={signal}
                  className="rounded-md border border-neutral-950/15 bg-white px-3 py-2 text-xs font-black uppercase text-neutral-700"
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <div className="relative grid gap-4 sm:min-h-[620px] sm:grid-cols-[0.82fr_1.18fr] lg:translate-y-8" data-hero-visual>
            <p className="absolute -right-4 top-4 z-20 hidden max-w-32 rotate-3 rounded-md bg-rose-600 px-3 py-2 text-center font-mono text-xs font-black uppercase text-white shadow-[6px_6px_0_#111] lg:block">
              {hero.cornerNote}
            </p>
            <div data-hero-card className="relative min-h-64 self-end sm:aspect-[4/5] sm:min-h-0">
              <div
                data-float
                className="absolute inset-0 overflow-hidden rounded-md border-4 border-neutral-950 bg-neutral-200 shadow-[10px_10px_0_#111]"
              >
                <PictureImage
                  src="/assets/jrw-tech-workbench-photo.webp"
                  fallbackSrc="/assets/jrw-tech-workbench-photo.jpg"
                  alt="JRW TechWorks home tech workbench with servers, speakers, cabling, and calibration tools"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div data-hero-card className="relative min-h-56 sm:min-h-60">
                <div
                  data-float
                  className="absolute inset-0 flex flex-col justify-end overflow-hidden rounded-md border-4 border-neutral-950 bg-neutral-950 p-5 text-white shadow-[10px_10px_0_#0f766e]"
                >
                  <p className="font-mono text-xs uppercase text-amber-300">{hero.captions[0].kicker}</p>
                  <p className="mt-1 text-xl font-black leading-tight sm:text-2xl">{hero.captions[0].text}</p>
                </div>
              </div>
              <div
                data-hero-card
                className="relative min-h-60 sm:ml-0 sm:min-h-72 lg:-ml-12"
              >
                <div
                  data-float
                  className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-md border-4 border-neutral-950 bg-amber-300 p-5 text-neutral-950 shadow-[10px_10px_0_#e11d48]"
                >
                  <span className="grid size-12 place-items-center rounded-md bg-neutral-950 text-white">
                    <Cpu aria-hidden="true" size={24} />
                  </span>
                  <div className="rounded-md bg-amber-300 p-1 sm:max-w-64">
                    <p className="font-mono text-xs uppercase">{hero.captions[1].kicker}</p>
                    <p className="mt-2 text-xl font-black leading-tight sm:text-2xl">{hero.captions[1].text}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="approach"
        data-physics-section="1"
        className="overflow-hidden border-b border-neutral-950/10 bg-neutral-950 text-white"
      >
        <div className="border-b border-white/15 py-4">
          <div className="marquee-track flex w-max gap-3 whitespace-nowrap px-5">
            {[...proofSignals, ...proofSignals].map((signal, index) => (
              <span
                key={`${signal}-${index}`}
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-black uppercase"
              >
                <BadgeCheck aria-hidden="true" size={16} className="text-amber-300" />
                {signal}
              </span>
            ))}
          </div>
        </div>
        <div
          data-reveal
          className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-24"
        >
          <div data-reveal-left>
            <p className="eyebrow-dark">{approach.eyebrow}</p>
            <h2 className="max-w-3xl text-3xl font-black leading-tight sm:text-6xl">
              {approach.title}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2" data-stagger>
            {approach.details.map((detail) => (
              <div
                key={detail}
                data-card
                className="rounded-md border border-white/20 bg-white p-5 text-neutral-950 shadow-[8px_8px_0_#f59e0b]"
              >
                <Sparkles aria-hidden="true" className="text-rose-600" size={24} />
                <p className="mt-4 text-xl font-black leading-tight">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        data-physics-section="2"
        className="flex items-center border-b border-neutral-950/10 bg-white"
      >
        <div
          data-reveal
          className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:py-20"
        >
          <div>
            <p className="eyebrow">{intro.eyebrow}</p>
            <h2 className="section-title">{intro.title}</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {intro.cards.map((card) => (
              <IntroCard key={card.title} title={card.title} text={card.text} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="consulting"
        data-physics-section="3"
        className="border-b border-neutral-950/10 bg-[#f7f2ea]"
      >
        <div data-reveal className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="eyebrow">{consulting.eyebrow}</p>
              <h2 className="section-title">{consulting.title}</h2>
            </div>
            <p className="text-lg leading-8 text-neutral-700">{consulting.intro}</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5" data-stagger>
            {consulting.services.map((service) => {
              const Icon = serviceIcons[service.key] ?? Cpu;
              return (
                <article key={service.key} className="service-card">
                  <Icon aria-hidden="true" className="text-teal-700" size={28} />
                  <h3 className="mt-5 text-xl font-black">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-700">{service.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="why"
        data-physics-section="4"
        className="border-b border-neutral-950/10 bg-[#f7f2ea]"
      >
        <div
          data-reveal
          className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24"
        >
          <div className="relative min-h-[360px] sm:min-h-[480px]" data-reveal-left>
            <div className="absolute left-0 top-0 h-64 w-[82%] overflow-hidden rounded-md border-4 border-neutral-950 bg-white shadow-[8px_8px_0_#111] sm:h-80 sm:shadow-[10px_10px_0_#111]">
              <PictureImage
                src="/assets/jrw-tech-workbench-photo.webp"
                fallbackSrc="/assets/jrw-tech-workbench-photo.jpg"
                alt="JRW TechWorks workbench with home theater and server gear laid out for a build"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-4 right-0 max-w-56 rotate-[-2deg] rounded-md border-2 border-neutral-950 bg-amber-300 p-4 shadow-[6px_6px_0_#e11d48] sm:max-w-64 sm:p-5 sm:shadow-[7px_7px_0_#e11d48]">
              <Coffee aria-hidden="true" size={24} />
              <p className="mt-3 text-xl font-black leading-tight sm:text-2xl">{proof.note}</p>
            </div>
          </div>
          <div data-reveal-right>
            <p className="eyebrow">{proof.eyebrow}</p>
            <h2 className="section-title">{proof.title}</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-700">{proof.intro}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2" data-stagger>
              {proof.points.map((point) => (
                <div
                  key={point}
                  data-card
                  className="rounded-md border-2 border-neutral-950 bg-white p-5 shadow-[7px_7px_0_#f59e0b]"
                >
                  <BadgeCheck aria-hidden="true" className="text-teal-700" size={24} />
                  <p className="mt-3 text-lg font-black leading-snug">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-physics-section="5" className="border-b border-neutral-950/10 bg-white">
        <div
          data-reveal
          data-late-section
          className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24"
        >
          {spotlights.items.map((item) => {
            const Icon = serviceIcons[item.key] ?? Cpu;
            return (
              <FeaturePanel
                key={item.key}
                icon={<Icon aria-hidden="true" size={30} />}
                eyebrow={item.eyebrow}
                title={item.title}
                body={item.body}
                foot={item.foot}
              />
            );
          })}
        </div>
      </section>

      <section id="faq" className="border-b border-neutral-950/10 bg-white" aria-labelledby="search-answers-title">
        <div
          data-reveal
          data-late-section
          className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-24"
        >
          <div>
            <p className="eyebrow">{faq.eyebrow}</p>
            <h2 id="search-answers-title" className="section-title">
              {faq.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-neutral-700">{faq.intro}</p>
          </div>
          <div className="grid gap-4" data-stagger>
            {faq.items.map((item) => (
              <article
                key={item.question}
                data-card
                className="rounded-md border-2 border-neutral-950 bg-[#f7f2ea] p-5 shadow-[6px_6px_0_#0f766e]"
              >
                <h3 className="text-xl font-black leading-tight">{item.question}</h3>
                <p className="mt-3 leading-7 text-neutral-700">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-physics-section="6" className="border-b border-neutral-950/10 bg-teal-700 text-white">
        <div
          data-reveal
          data-late-section
          className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:py-24"
        >
          <div data-reveal-left>
            <p className="eyebrow-dark">{cta.eyebrow}</p>
            <h2 className="text-3xl font-black leading-tight sm:text-6xl">{cta.title}</h2>
          </div>
          <div data-reveal-right data-detail-list>
            <p className="text-xl leading-9 text-teal-50">{cta.body}</p>
            <a
              href={cta.button.href}
              data-button
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-black uppercase tracking-wide text-teal-900 transition hover:bg-amber-200"
            >
              {cta.button.label}
              <ArrowRight aria-hidden="true" size={18} />
            </a>
          </div>
        </div>
      </section>

      <section
        id="contact"
        data-physics-section="7"
        data-free-scroll
        className="flex min-h-[calc(100svh-88px)] flex-col bg-[#f7f2ea]"
      >
        <div
          data-reveal
          data-late-section
          className="mx-auto grid w-full max-w-7xl flex-1 gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:py-14"
        >
          <div data-reveal-left>
            <p className="eyebrow">{contact.eyebrow}</p>
            <h2 className="section-title">{contact.title}</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-700">{contact.intro}</p>
            <div className="mt-8 grid gap-4 text-sm font-semibold text-neutral-800" data-detail-list>
              <p className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 text-rose-600" size={20} />
                {contact.localFocus}
              </p>
              <p className="flex items-start gap-3">
                <CalendarDays aria-hidden="true" className="mt-0.5 text-rose-600" size={20} />
                {contact.availabilityNote}
              </p>
            </div>
          </div>
          <div
            data-card
            data-reveal-right
            className="min-w-0 rounded-md border-[3px] border-neutral-950 bg-white p-3 shadow-[4px_4px_0_#111] sm:border-4 sm:p-8 sm:shadow-[12px_12px_0_#111]"
          >
            <ContactForm />
          </div>
        </div>

        <footer className="border-t border-neutral-950/10 bg-neutral-950 text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <a href="#top" className="flex items-center gap-3 font-black uppercase tracking-wide">
              <span className="grid size-10 place-items-center rounded-md bg-white text-lg text-neutral-950">
                JRW
              </span>
              <span className="text-sm leading-tight">
                Tech
                <br />
                <span className="text-teal-300">Works</span>
              </span>
            </a>
            <div className="flex flex-col gap-3 text-sm font-bold text-neutral-200 sm:flex-row sm:items-center sm:gap-6">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 transition hover:text-amber-300"
              >
                <Mail aria-hidden="true" size={18} />
                {contact.email}
              </a>
              <a
                href={`tel:${contact.phoneHref}`}
                className="inline-flex items-center gap-2 transition hover:text-amber-300"
              >
                <Phone aria-hidden="true" size={18} />
                {contact.phone}
              </a>
            </div>
            <div className="flex flex-col gap-2 text-sm font-semibold text-neutral-400 sm:items-end">
              <p>{footer.legalLine}</p>
              <a
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-neutral-500 transition hover:text-amber-300"
              >
                <Lock aria-hidden="true" size={14} />
                Admin
              </a>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}

function IntroCard({ title, text }: { title: string; text: string }) {
  return (
    <article data-card className="rounded-md border-2 border-neutral-950 bg-[#f7f2ea] p-6">
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-3 leading-7 text-neutral-700">{text}</p>
    </article>
  );
}

function FeaturePanel({
  icon,
  eyebrow,
  title,
  body,
  foot,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  body: string;
  foot: string;
}) {
  return (
    <article
      data-card
      data-feature-panel
      className="relative overflow-hidden rounded-md border-4 border-neutral-950 bg-white p-6 shadow-[10px_10px_0_#0f766e] sm:p-8"
    >
      <span
        data-panel-sweep
        className="pointer-events-none absolute inset-x-0 top-0 h-2 origin-left bg-[linear-gradient(90deg,#0f766e,#e11d48,#f59e0b)]"
      />
      <div className="grid size-14 place-items-center rounded-md bg-amber-300 text-neutral-950">
        {icon}
      </div>
      <p className="eyebrow mt-6">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">{title}</h2>
      <p className="mt-5 leading-8 text-neutral-700">{body}</p>
      <p className="mt-5 rounded-md bg-neutral-100 px-4 py-3 font-mono text-sm text-neutral-800">
        {foot}
      </p>
    </article>
  );
}

function PictureImage({
  src,
  fallbackSrc,
  alt,
  className,
  priority = false,
}: {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source srcSet={src} type="image/webp" />
      <img
        src={fallbackSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={`absolute inset-0 h-full w-full ${className ?? ""}`}
      />
    </picture>
  );
}
