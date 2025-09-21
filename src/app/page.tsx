import Link from "next/link";
import Image from "next/image";
import { BackgroundBubbles } from "@/components/background-bubbles";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800/80 dark:bg-slate-950/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold">
            <span className="h-5 w-5 rounded bg-primary" /> GybBox
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-700 sm:flex dark:text-slate-200">
            <a href="#features" className="hover:text-slate-900 hover:underline underline-offset-4 dark:hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-slate-900 hover:underline underline-offset-4 dark:hover:text-white">Pricing</a>
            <a href="#faq" className="hover:text-slate-900 hover:underline underline-offset-4 dark:hover:text-white">FAQ</a>
            <a href="#contact" className="hover:text-slate-900 hover:underline underline-offset-4 dark:hover:text-white">Contact</a>
            <Link href="/dashboard/client" className="rounded-md border border-slate-300 px-3 py-1.5 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900">Dashboard</Link>
            <Link href="/rate" className="rounded-md bg-primary px-3 py-1.5 text-white hover:bg-primary-dark">Try now</Link>
          </nav>
        </div>
      </header>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-16 md:py-24">
        {/* Animated colorful background */}
        <BackgroundBubbles count={20} />
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-accent-2 px-3 py-1 text-[11px] font-medium text-primary">
                GybBox · Modern Review Funnels
              </div>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Turn happy customers into <span className="text-primary">5-star reviews</span>
              </h1>
              <p className="mt-6 max-w-xl text-base text-slate-600 sm:text-lg dark:text-slate-300">
                Route 5-star ratings directly to Google. Capture 1–4 star feedback privately. Build trust and grow faster with a frictionless funnel.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/rate" className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:bg-primary-dark transition-transform">
                  Try Rating Flow
                </Link>
                <Link href="/dashboard/client" className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 px-5 text-sm font-semibold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900">
                  View Client Dashboard
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent-1/70 to-accent-2/70 blur-xl opacity-70" aria-hidden />
              <div className="relative rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-lg ring-1 ring-black/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                <Image src="/hero-demo.svg" alt="GybBox overview" width={820} height={520} priority className="h-auto w-full rounded-xl animate-float" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-t border-slate-200 bg-slate-50 px-6 py-10 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 text-center text-sm uppercase tracking-wide text-slate-500">Trusted by growing local businesses</div>
          <div className="grid grid-cols-2 items-center gap-6 opacity-90 sm:grid-cols-3 md:grid-cols-6">
            <Image src="/logos/logo1.svg" alt="Logo 1" width={120} height={48} className="mx-auto h-12 w-auto grayscale hover:grayscale-0 transition" />
            <Image src="/logos/logo2.svg" alt="Logo 2" width={120} height={48} className="mx-auto h-12 w-auto grayscale hover:grayscale-0 transition" />
            <Image src="/logos/logo3.svg" alt="Logo 3" width={120} height={48} className="mx-auto h-12 w-auto grayscale hover:grayscale-0 transition" />
            <Image src="/logos/logo1.svg" alt="Logo 4" width={120} height={48} className="mx-auto h-12 w-auto grayscale hover:grayscale-0 transition" />
            <Image src="/logos/logo2.svg" alt="Logo 5" width={120} height={48} className="mx-auto h-12 w-auto grayscale hover:grayscale-0 transition" />
            <Image src="/logos/logo3.svg" alt="Logo 6" width={120} height={48} className="mx-auto h-12 w-auto grayscale hover:grayscale-0 transition" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">How GybBox Works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Step n={1} title="Share the link" desc="Invite customers to rate their experience using a short, branded link or QR code." />
            <Step n={2} title="Route by rating" desc="5 stars jump to Google. 1–4 stars open a private feedback form you control." />
            <Step n={3} title="Improve & grow" desc="Turn feedback into action. Publish more 5-star reviews and win local SEO." />
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section id="features" className="border-t border-slate-200 bg-slate-50 px-6 py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-extrabold tracking-tight">Everything you need to scale reputation</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Feature title="Smart Routing" desc="1–4 stars open a feedback form. 5 stars go to Google automatically." image="/features/routing.svg" bg="bg-accent-2" />
            <Feature title="Custom Templates" desc="Personalize feedback and thank-you messages with variables and brand voice." image="/features/templates.svg" bg="bg-accent-1" />
            <Feature
              title="Team & Roles"
              desc="Invite mentors, staff, and admins with the right access levels."
              icon="👥"
              bg="bg-white"
              bullets={["Role-based access", "Invite mentors & staff", "Activity logs"]}
            />
            <Feature title="Analytics" desc="Understand conversion by campaign, channel, and date range." image="/features/analytics.svg" bg="bg-white" />
            <Feature title="Services & Locations" desc="Connect Google Business and manage multiple branches easily." icon="📍" bg="bg-accent-2" />
            <Feature title="Privacy-first" desc="Own your data. Capture issues privately and respond quickly." icon="🔒" bg="bg-accent-1" />
          </div>
        </div>
      </section>

      {/* Benefits strip */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          <Benefit title="More 5-star reviews" desc="Remove friction for happy customers and make it simple to post on Google." icon="⭐" bg="bg-accent-2" />
          <Benefit title="Less public churn" desc="Catch problems before they hit your profile. Resolve privately, maintain trust." icon="🛡️" bg="bg-accent-1" />
          <Benefit
            title="Higher local SEO"
            desc="Recent, real reviews signal trust to Google’s local ranking systems."
            icon="📈"
            bg="bg-white"
            bullets={["Fresh, consistent reviews", "Location + service keywords", "Higher map-pack visibility"]}
          />
          <Benefit
            title="Faster feedback loops"
            desc="Templates and automations help you act on insights quickly."
            icon="⚡"
            bg="bg-white"
            bullets={["Auto follow-ups & reminders", "Template library for replies", "Instant owner alerts"]}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-slate-200 bg-slate-50 px-6 py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">Loved by local teams</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Testimonial name="Aisha, Salon Owner" quote="We doubled our 5-star reviews in two months and fixed recurring issues privately." />
            <Testimonial name="Rahul, Clinic Manager" quote="Routing works like magic. Staff now follows up on low ratings the same day." />
            <Testimonial name="Maria, Restaurant Ops" quote="Simple for guests, powerful for managers. Our Google visibility noticeably improved." />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">Transparent pricing</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <PricingCard plan="Starter" price="$19" period="/mo" features={["1 location", "Basic routing", "Email support"]} cta="Get Started" />
            <PricingCard plan="Pro" price="$49" period="/mo" popular features={["Up to 5 locations", "Templates + analytics", "Priority support"]} cta="Choose Pro" />
            <PricingCard plan="Scale" price="$99" period="/mo" features={["Unlimited locations", "Advanced roles", "SLA support"]} cta="Contact Sales" />
          </div>
          <p className="mt-4 text-center text-sm text-slate-500">All plans include secure routing, feedback capture, and Google redirection. 14‑day money‑back guarantee.</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-slate-200 bg-slate-50 px-6 py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-3xl font-bold tracking-tight">Frequently asked questions</h2>
          <div className="space-y-3">
            <FAQItem q="How does GybBox send 5-star ratings to Google?">
              When a customer selects 5 stars, we automatically redirect them to your Google review URL. 1–4 stars open a private feedback form.
            </FAQItem>
            <FAQItem q="Can I customize messages and templates?">
              Yes. Edit feedback requests, follow-ups, and thank-you messages to match your brand tone.
            </FAQItem>
            <FAQItem q="Do you support multiple locations?">
              Absolutely. Connect multiple Google Business locations and manage them from one place.
            </FAQItem>
            <FAQItem q="Is my data secure?">
              We follow security best practices and store only what’s necessary to operate your funnels.
            </FAQItem>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Talk to our team</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Ask anything about setup, integrations, or pricing. We typically reply within one business day.</p>
            <div className="mt-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <div>Email: support@gybbox.com</div>
              <div>Phone: +1 (555) 123-4567</div>
            </div>
          </div>
          <form className="grid gap-3">
            <div className="grid gap-2">
              <label className="text-sm" htmlFor="name">Full name</label>
              <input id="name" className="h-11 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" required />
            </div>
            <div className="grid gap-2">
              <label className="text-sm" htmlFor="email">Email</label>
              <input id="email" type="email" className="h-11 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" required />
            </div>
            <div className="grid gap-2">
              <label className="text-sm" htmlFor="msg">Message</label>
              <textarea id="msg" rows={5} className="rounded-md border border-slate-300 p-3 dark:border-slate-700 dark:bg-slate-900" required />
            </div>
            <button className="mt-1 inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white hover:bg-primary-dark">Send message</button>
            <p className="text-xs text-slate-500">By submitting, you agree to our Terms and Privacy Policy.</p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-6 py-10 text-sm text-slate-500 dark:border-slate-800">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="inline-flex items-center gap-2 font-semibold">
              <span className="h-5 w-5 rounded bg-primary" /> GybBox
            </div>
            <div className="flex gap-4">
              <Link href="/rate" className="hover:text-slate-700 dark:hover:text-slate-300">Rate</Link>
              <Link href="/dashboard/client" className="hover:text-slate-700 dark:hover:text-slate-300">Dashboard</Link>
              <a href="#pricing" className="hover:text-slate-700 dark:hover:text-slate-300">Pricing</a>
              <a href="#faq" className="hover:text-slate-700 dark:hover:text-slate-300">FAQ</a>
            </div>
            <div>© {new Date().getFullYear()} GybBox. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Feature({ title, desc, icon, image, bg = "bg-white", bullets }: { title: string; desc: string; icon?: string; image?: string; bg?: string; bullets?: string[] }) {
  return (
    <div className={`group rounded-2xl border border-slate-200 ${bg} p-0 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-950`}> 
      <div className="p-5">
        {image ? (
          <div className="mb-4 overflow-hidden rounded-xl ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" className="h-28 w-full object-cover" />
          </div>
        ) : (
          <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-lg">{icon}</div>
        )}
        <div className="mb-1 text-base font-semibold">{title}</div>
        <p className="text-sm text-slate-600 dark:text-slate-300">{desc}</p>
        {bullets && bullets.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-300">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[10px] text-primary">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="h-1 w-full rounded-b-2xl bg-gradient-to-r from-accent-1 to-accent-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">{n}</div>
      <div className="mb-1 text-base font-semibold">{title}</div>
      <p className="text-sm text-slate-600 dark:text-slate-300">{desc}</p>
    </div>
  );
}

function Benefit({ title, desc, icon, bg = "bg-white", bullets }: { title: string; desc: string; icon?: string; bg?: string; bullets?: string[] }) {
  return (
    <div className={`group rounded-2xl border border-slate-200 ${bg} p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md animate-fade-up dark:border-slate-800 dark:bg-slate-950`}>
      <div className="mb-2 flex items-center gap-2">
        {icon && <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-lg">{icon}</span>}
        <div className="text-base font-semibold">{title}</div>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">{desc}</p>
      {bullets && bullets.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-300">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[10px] text-primary">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent-1 to-accent-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

function Testimonial({ name, quote }: { name: string; quote: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md animate-fade-up dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-3 flex items-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">{name.charAt(0)}</span>
        <div className="flex items-center gap-1 text-orange-500" aria-label="5 out of 5 stars">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
      </div>
      <p className="text-sm italic text-slate-700 dark:text-slate-200">“{quote}”</p>
      <div className="mt-3 text-xs text-slate-500">— {name}</div>
    </div>
  );
}

function PricingCard({ plan, price, period, features = [], popular, cta }: { plan: string; price: string; period: string; features?: string[]; popular?: boolean; cta: string }) {
  return (
    <div className={`group rounded-2xl border p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${popular ? "border-primary bg-accent-1 dark:border-primary/60 dark:bg-slate-900" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"}`}>
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">{plan}</div>
        {popular && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">Most popular</span>}
      </div>
      <div className="mb-4 flex items-baseline gap-1">
        <div className="text-3xl font-bold">{price}</div>
        <div className="text-sm text-slate-500">{period}</div>
      </div>
      <ul className="mb-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {features.map((f, i) => (
          <li key={i}>• {f}</li>
        ))}
      </ul>
      <button className={`inline-flex h-11 w-full items-center justify-center rounded-md px-5 text-sm font-medium transition ${popular ? "bg-primary text-white hover:bg-primary-dark" : "border border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"}`}>{cta}</button>
    </div>
  );
}

function FAQItem({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="rounded-lg border border-slate-200 bg-white p-4 text-sm shadow-sm open:shadow-md dark:border-slate-800 dark:bg-slate-950">
      <summary className="cursor-pointer list-none font-semibold">
        <span className="mr-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">FAQ</span>
        {q}
      </summary>
      <div className="mt-2 text-slate-600 dark:text-slate-300">{children}</div>
    </details>
  );
}
