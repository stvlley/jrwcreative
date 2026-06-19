import {
  ArrowRight,
  BadgeCheck,
  Box,
  CalendarDays,
  Coffee,
  Cpu,
  Hammer,
  Home as HomeIcon,
  Mail,
  MapPin,
  MonitorSpeaker,
  Phone,
  Printer,
  Quote,
  Sparkles,
  Wrench,
} from "lucide-react";
import { AccessibilityToggle } from "@/components/accessibility-toggle";
import { ContactForm } from "@/components/contact-form";
import { FallingBlocks } from "@/components/falling-blocks";
import { LoadingAnimation } from "@/components/loading-animation";
import { ScrollAnimations } from "@/components/scroll-animations";
import { events, printing, retroOfferings, workshops } from "@/content/site";
import { homePageJsonLd, stringifyJsonLd } from "@/lib/json-ld";

const consultingServices = [
  {
    title: "Home theaters",
    text: "Projector and screen design, calibration, room layout, acoustics, and source planning.",
    icon: MonitorSpeaker,
  },
  {
    title: "Studios",
    text: "Audio and creative workspace builds that make recording, editing, streaming, and making easier to repeat.",
    icon: Sparkles,
  },
  {
    title: "A/V routing",
    text: "Whole-system signal routing, integration, source cleanup, and practical control paths.",
    icon: Cpu,
  },
  {
    title: "In-home servers",
    text: "Local LLM setups, voice-ready AI options, NAS storage, backup plans, ZFS arrays, and media servers.",
    icon: HomeIcon,
  },
  {
    title: "Retro setups",
    text: "Aesthetic design, rare hardware sourcing, restoration, customization, and quality-focused console builds.",
    icon: Wrench,
  },
];

const navItems = [
  ["Consulting", "#consulting"],
  ["The Swap", "#swap"],
  ["Events", "#events"],
  ["Workshops", "#workshops"],
  ["Contact", "#contact"],
];

const proofSignals = [
  "No-gatekeeping workshops",
  "Real rooms, real hardware",
  "Repair culture",
  "Local-first pop-ups",
  "Comfortable enough to ask",
];

const memberQuotes = [
  {
    quote:
      "A place where the first question is what are you trying to make, not what do you already know.",
    source: "The Swap community promise",
  },
  {
    quote:
      "Useful tech should feel like a good neighborhood shop: direct, warm, and hard to leave empty-handed.",
    source: "JRW working principle",
  },
  {
    quote:
      "Bring the messy setup, the half-working console, the room that never sounds right, or the idea you cannot quite explain yet.",
    source: "Workshop invitation",
  },
];

const hospitalityDetails = [
  "Clear quotes before work starts",
  "Gear guidance without the upsell haze",
  "ND-friendly pacing at workshops",
  "Local pickup and event-first community",
];

const searchAnswers = [
  {
    question: "Where does JRW Creative Group work?",
    answer:
      "JRW is based around Fieldsboro and Bordentown, New Jersey, and focuses on Burlington County, Mercer County, Philadelphia, Princeton, and the Philadelphia-to-Princeton corridor.",
  },
  {
    question: "What can I ask JRW to design or install?",
    answer:
      "Home theaters, studios, A/V routing, local LLM systems, NAS and media servers, backup plans, ZFS arrays, and bespoke retro setups all start with a free one-hour consultation.",
  },
  {
    question: "Does The Swap offer 3D printing?",
    answer:
      "Yes. The Swap offers quote-based print-for-hire 3D printing. Pricing depends on the actual model, size, material needs, and production complexity.",
  },
  {
    question: "What makes The Swap different?",
    answer:
      "The Swap combines monthly maker pop-ups, practical workshops, the How To Life series, upgraded retro hardware, and ND-friendly community learning.",
  },
];

export default function Home() {
  return (
    <main id="content" className="min-h-screen bg-[#f7f2ea] text-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(homePageJsonLd) }}
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
              Creative Group
              <br />
              <span className="text-teal-700">The Swap</span>
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
              Fieldsboro / Bordentown / Philadelphia / Princeton
            </p>
            <h1
              id="hero-title"
              data-physics-collider
              className="max-w-4xl text-4xl font-black leading-[0.94] tracking-normal text-neutral-950 min-[380px]:text-5xl sm:text-7xl lg:text-8xl"
            >
              Work with the gear. Leave with the confidence.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-700 sm:text-xl">
              JRW Creative Group LLC and The Swap help people build better rooms,
              smarter local systems, useful prints, upgraded retro setups, and
              approachable places to learn how things work without the gatekeeping.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                data-button
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 text-sm font-black uppercase tracking-wide text-white transition hover:bg-neutral-800"
              >
                Request a free consultation
                <ArrowRight aria-hidden="true" size={18} />
              </a>
              <a
                href="#swap"
                data-button
                className="inline-flex h-12 items-center justify-center rounded-md border border-neutral-950 px-5 text-sm font-black uppercase tracking-wide transition hover:bg-white"
              >
                Explore The Swap
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2" aria-label="JRW Creative Group quality signals">
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
              come as you are
            </p>
            <div data-hero-card className="relative min-h-64 self-end sm:aspect-[4/5] sm:min-h-0">
              <div
                data-float
                className="absolute inset-0 overflow-hidden rounded-md border-4 border-neutral-950 bg-neutral-200 shadow-[10px_10px_0_#111]"
              >
                <PictureImage
                  src="/assets/jrw-maker-pop-up-photo.webp"
                  fallbackSrc="/assets/jrw-maker-pop-up-photo.jpg"
                  alt="Original JRW maker pop-up scene with people collaborating around tools and creative hardware"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div data-hero-card className="relative min-h-56 sm:min-h-60">
                <div
                  data-float
                  className="absolute inset-0 overflow-hidden rounded-md border-4 border-neutral-950 bg-white shadow-[10px_10px_0_#0f766e]"
                >
                  <PictureImage
                    src="/assets/jrw-tech-workbench-photo.webp"
                    fallbackSrc="/assets/jrw-tech-workbench-photo.jpg"
                    alt="Original JRW home tech workbench with servers, speakers, cabling, and calibration tools"
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-neutral-950/90 p-4 text-white">
                    <p className="font-mono text-xs uppercase text-amber-300">The Swap makes room for</p>
                    <p className="mt-1 text-xl font-black leading-tight sm:text-2xl">prints, repairs, local AI, and the people figuring it out.</p>
                  </div>
                </div>
              </div>
              <div
                data-hero-card
                className="relative min-h-60 sm:ml-0 sm:min-h-72 lg:-ml-12"
              >
                <div
                  data-float
                  className="absolute inset-0 overflow-hidden rounded-md border-4 border-neutral-950 bg-amber-300 shadow-[10px_10px_0_#e11d48]"
                >
                  <PictureImage
                    src="/assets/jrw-makerspace-interior-photo.webp"
                    fallbackSrc="/assets/jrw-makerspace-interior-photo.jpg"
                    alt="Original JRW future makerspace interior with workshop tables, tools, and community seating"
                    priority
                    className="object-cover"
                  />
                  <div className="absolute left-4 top-4 max-w-[calc(100%-2rem)] rounded-md bg-amber-300 p-4 text-neutral-950 shadow-[6px_6px_0_#111] sm:max-w-56">
                    <p className="font-mono text-xs uppercase">Work + culture + useful gear</p>
                    <p className="mt-2 text-xl font-black leading-tight sm:text-2xl">Empowerment is the brand spine.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-physics-section="1" className="overflow-hidden border-b border-neutral-950/10 bg-neutral-950 text-white">
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
            <p className="eyebrow-dark">Borrowed signal, JRW voice</p>
            <h2 className="max-w-3xl text-3xl font-black leading-tight sm:text-6xl">
              The site should feel less like a brochure and more like walking into the right room.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2" data-stagger>
            {hospitalityDetails.map((detail) => (
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
            <p className="eyebrow">One brand, two arms</p>
            <h2 className="section-title">Designed to make capable feel contagious.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <IntroCard
              title="JRW Tech Consulting"
              text="Quote-based in-home design and installation for home theaters, studios, A/V routing, local servers, self-hosted AI, media systems, and bespoke retro setups."
            />
            <IntroCard
              title="The Swap"
              text="A community-first makerspace arm for monthly events, print-for-hire 3D work, workshops, and restored or customized retro hardware."
            />
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
              <p className="eyebrow">Consulting</p>
              <h2 className="section-title">Start with a free one-hour consult.</h2>
            </div>
            <p className="text-lg leading-8 text-neutral-700">
              Every consulting project begins with a no-cost, no-obligation conversation.
              From there, choose a fixed-scope remote design package or local in-home
              installation with labor quoted after the consult and equipment billed at cost.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5" data-stagger>
            {consultingServices.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="service-card">
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
        id="swap"
        data-physics-section="4"
        className="overflow-hidden border-b border-neutral-950/10 bg-neutral-950 text-white"
      >
        <div
          data-reveal
          className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-24"
        >
          <div>
            <p className="eyebrow-dark">The Swap</p>
            <h2 className="text-3xl font-black leading-tight sm:text-6xl">A pop-up home for making, fixing, printing, and finding your people.</h2>
            <p className="mt-6 text-lg leading-8 text-neutral-300">
              The Swap is the community side of JRW: monthly events, donation-based
              entry while the model grows, print-for-hire work, workshops, and a
              future brick-and-mortar makerspace when the timing is right.
            </p>
          </div>
          <div className="relative min-h-64 overflow-hidden rounded-md border-4 border-white bg-neutral-800 shadow-[8px_8px_0_#f59e0b] sm:min-h-80 sm:shadow-[12px_12px_0_#f59e0b]">
            <PictureImage
              src="/assets/jrw-storefront-photo.webp"
              fallbackSrc="/assets/jrw-storefront-photo.jpg"
              alt="Original JRW storefront concept showing a welcoming maker shop interior through the front windows"
              className="object-cover opacity-90"
            />
          </div>
        </div>
      </section>

      <section data-physics-section="5" className="border-b border-neutral-950/10 bg-[#f7f2ea]">
        <div
          data-reveal
          className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24"
        >
          <div className="relative min-h-[390px] sm:min-h-[520px]" data-reveal-left>
            <div className="absolute left-0 top-0 h-56 w-[72%] overflow-hidden rounded-md border-4 border-neutral-950 bg-white shadow-[8px_8px_0_#111] sm:h-72 sm:shadow-[10px_10px_0_#111]">
              <PictureImage
                src="/assets/jrw-maker-pop-up-photo.webp"
                fallbackSrc="/assets/jrw-maker-pop-up-photo.jpg"
                alt="Original JRW community pop-up scene for welcoming local events"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-4 right-0 h-56 w-[70%] overflow-hidden rounded-md border-4 border-neutral-950 bg-white shadow-[8px_8px_0_#0f766e] sm:h-72 sm:shadow-[10px_10px_0_#0f766e]">
              <PictureImage
                src="/assets/jrw-makerspace-interior-photo.webp"
                fallbackSrc="/assets/jrw-makerspace-interior-photo.jpg"
                alt="Original JRW makerspace interior concept with tools, seating, and workshop tables"
                className="object-cover"
              />
            </div>
            <div className="absolute left-4 top-48 max-w-56 rotate-[-2deg] rounded-md border-2 border-neutral-950 bg-amber-300 p-4 shadow-[6px_6px_0_#e11d48] sm:left-6 sm:top-60 sm:max-w-64 sm:p-5 sm:shadow-[7px_7px_0_#e11d48]">
              <Coffee aria-hidden="true" size={24} />
              <p className="mt-3 text-xl font-black leading-tight sm:text-2xl">Pretty helps. Productive matters more.</p>
            </div>
          </div>
          <div data-reveal-right>
            <p className="eyebrow">Community proof</p>
            <h2 className="section-title">Make the useful stuff feel social.</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-700">
              Strong community brands sell more than services: they make the culture
              visible. For JRW, that means proof that the work is practical, local,
              generous with knowledge, and comfortable enough for beginners to step in.
            </p>
            <div className="mt-8 grid gap-4" data-stagger>
              {memberQuotes.map((item) => (
                <figure
                  key={item.source}
                  data-card
                  className="rounded-md border-2 border-neutral-950 bg-white p-5 shadow-[7px_7px_0_#f59e0b]"
                >
                  <Quote aria-hidden="true" className="text-rose-600" size={24} />
                  <blockquote className="mt-3 text-xl font-black leading-snug">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-4 font-mono text-xs font-black uppercase text-teal-700">
                    {item.source}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="events"
        data-physics-section="6"
        className="border-b border-neutral-950/10 bg-white"
      >
        <div
          data-reveal
          data-late-section
          className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24"
        >
          <SectionHeader
            eyebrow="Upcoming / Find us"
            title="Dates, venues, and booths stay easy to update."
            text="Year one is built around monthly pop-ups and convention appearances when possible. Locations are announced per event."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2" data-pop-grid>
            {events.map((event) => (
              <EditableCard key={event.title} item={event} icon="calendar" />
            ))}
          </div>
        </div>
      </section>

      <section data-physics-section="7" className="border-b border-neutral-950/10 bg-[#f7f2ea]">
        <div
          data-reveal
          data-late-section
          className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24"
        >
          <FeaturePanel
            icon={<Printer aria-hidden="true" size={30} />}
            eyebrow="3D printing"
            title="Print-for-hire, quoted by the actual job."
            body={printing.guidance}
            foot={printing.equipment}
          />
          <FeaturePanel
            icon={<Box aria-hidden="true" size={30} />}
            eyebrow="Upgraded retro hardware"
            title={retroOfferings.prompt}
            body={retroOfferings.guidance}
            foot={retroOfferings.ctaLabel}
          />
        </div>
      </section>

      <section
        id="workshops"
        data-physics-section="8"
        className="border-b border-neutral-950/10 bg-white"
      >
        <div
          data-reveal
          data-late-section
          className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24"
        >
          <SectionHeader
            eyebrow="Workshops"
            title="The point is empowerment, not gatekeeping."
            text="Workshops run through events, partner venues, and pop-ups. The lineup can change as instructors, spaces, and community needs come together."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2" data-pop-grid>
            {workshops.map((workshop) => (
              <EditableCard key={workshop.title} item={workshop} icon="hammer" />
            ))}
          </div>
        </div>
      </section>

      <section
        data-physics-section="9"
        className="border-b border-neutral-950/10 bg-teal-700 text-white"
      >
        <div
          data-reveal
          data-late-section
          className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:py-24"
        >
          <div data-reveal-left>
            <p className="eyebrow-dark">Future makerspace</p>
            <h2 className="text-3xl font-black leading-tight sm:text-6xl">A permanent home is the long game.</h2>
          </div>
          <div data-reveal-right data-detail-list>
            <p className="text-xl leading-9 text-teal-50">
              The goal is a local makerspace home for practical classes, creative
              hardware, 3D printing, repair culture, and community events across
              Burlington County, Mercer County, and the Philadelphia to Princeton corridor.
            </p>
            <a
              href="#contact"
              data-button
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-black uppercase tracking-wide text-teal-900 transition hover:bg-amber-200"
            >
              Join the list
              <ArrowRight aria-hidden="true" size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-950/10 bg-white" aria-labelledby="search-answers-title">
        <div
          data-reveal
          data-late-section
          className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-24"
        >
          <div>
            <p className="eyebrow">Quick answers</p>
            <h2 id="search-answers-title" className="section-title">
              Practical facts for local search.
            </h2>
            <p className="mt-5 text-lg leading-8 text-neutral-700">
              A concise summary of what JRW Creative Group and The Swap do,
              where they work, and how to start.
            </p>
          </div>
          <div className="grid gap-4" data-stagger>
            {searchAnswers.map((item) => (
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

      <section
        id="contact"
        data-physics-section="10"
        data-free-scroll
        className="flex min-h-[calc(100svh-88px)] flex-col bg-[#f7f2ea]"
      >
        <div
          data-reveal
          data-late-section
          className="mx-auto grid w-full max-w-7xl flex-1 gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:py-14"
        >
          <div data-reveal-left>
            <p className="eyebrow">Contact</p>
            <h2 className="section-title">Tell us what you want to build next.</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-700">
              Use this for a free in-home tech consultation, a 3D print quote,
              workshop interest, event questions, or current upgraded retro hardware
              inquiries.
            </p>
            <div className="mt-8 grid gap-4 text-sm font-semibold text-neutral-800" data-detail-list>
              <p className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 text-rose-600" size={20} />
                Local focus: Fieldsboro, Bordentown, Burlington County, Mercer County,
                Philadelphia, and Princeton.
              </p>
              <p className="flex items-start gap-3">
                <CalendarDays aria-hidden="true" className="mt-0.5 text-rose-600" size={20} />
                Events and workshops are announced as venues and dates are confirmed.
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
                Creative Group
                <br />
                <span className="text-teal-300">The Swap</span>
              </span>
            </a>
            <div className="flex flex-col gap-3 text-sm font-bold text-neutral-200 sm:flex-row sm:items-center sm:gap-6">
              <a
                href="mailto:jaime@jrwcreative.group"
                className="inline-flex items-center gap-2 transition hover:text-amber-300"
              >
                <Mail aria-hidden="true" size={18} />
                jaime@jrwcreative.group
              </a>
              <a
                href="tel:+16402487074"
                className="inline-flex items-center gap-2 transition hover:text-amber-300"
              >
                <Phone aria-hidden="true" size={18} />
                640-248-7074
              </a>
            </div>
            <p className="text-sm font-semibold text-neutral-400">
              © 2026 JRW Creative Group LLC. All rights reserved.
            </p>
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

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="max-w-3xl" data-section-head>
      <p className="eyebrow" data-load-kicker>{eyebrow}</p>
      <h2 className="section-title" data-load-title>{title}</h2>
      <p className="mt-5 text-lg leading-8 text-neutral-700" data-load-copy>{text}</p>
    </div>
  );
}

function EditableCard({
  item,
  icon,
}: {
  item: {
    title: string;
    meta: string;
    location: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  icon: "calendar" | "hammer";
}) {
  const Icon = icon === "calendar" ? CalendarDays : Hammer;

  return (
    <article
      data-card
      data-pop-card
      className="rounded-md border-2 border-neutral-950 bg-white p-6 shadow-[8px_8px_0_#f59e0b]"
    >
      <Icon aria-hidden="true" className="text-rose-600" size={28} />
      <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
      <p className="mt-2 font-mono text-sm uppercase text-teal-700">{item.meta}</p>
      <p className="mt-1 text-sm font-bold text-neutral-600">{item.location}</p>
      <p className="mt-4 leading-7 text-neutral-700">{item.description}</p>
      <a
        href={item.ctaHref}
        data-button
        className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-neutral-950"
      >
        {item.ctaLabel}
        <ArrowRight aria-hidden="true" size={16} />
      </a>
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
