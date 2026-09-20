export const projects = [
  {
    slug: "second-sponsor",
    name: "Second Sponsor",
    featured: true,
    status: "Live",
    summary:
      "Shipped v1.0 in June 2025 and continues to lead the platform behind the live iOS and Android product.",
    metadata: ["CTO since 2025", "AI", "Mobile", "Fastify", "Real-time voice"],
    problem:
      "Second Sponsor is an AI-assisted companion for people in 12-step recovery programs. Shipping it requires product decisions, AI behavior, mobile delivery, healthcare data handling, and day-to-day production operations to work as one reliable product.",
    role: "CTO since 2025. Santiago owns the technical architecture and works hands-on across mobile, backend, AI, real-time voice, compliance, production reliability, releases, and CI.",
    constraints: [
      "The product runs on RagRecall, a HIPAA-compliant platform shared by multiple branded healthcare applications.",
      "The current architecture spans five deployable app workspaces, a Fastify server, and roughly 15 shared packages.",
      "Mobile releases, AI and voice capabilities, compliance, and production reliability all have to move together.",
    ],
    decisions: [
      "Build Second Sponsor on RagRecall so branded healthcare applications can share a platform instead of duplicating core infrastructure.",
      "Keep deployable applications separate while centralizing common capabilities in shared packages.",
      "Treat installation and CI performance as part of production delivery, not as incidental developer tooling.",
    ],
    proof: [
      "Second Sponsor v1.0 shipped in June 2025 and is live on the App Store and Google Play.",
      "A clean installation of 4,991 packages improved from roughly 2 minutes 30 seconds to 0.73 seconds.",
      "A mobile cold installation improved from 42 seconds to 21 seconds.",
    ],
    results: [
      "The product is available on both major mobile platforms, backed by infrastructure that also supports multiple branded healthcare applications.",
      "The installation improvements shortened feedback loops for a large multi-application codebase and made the shared-platform approach more practical to operate.",
    ],
    currentStatus:
      "Live on the App Store and Google Play. Santiago continues as CTO.",
    links: [
      { label: "Website", href: "https://secondsponsor.ai/" },
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/second-sponsor/id6737695789",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.secondsponsor.secondsponsor",
      },
    ],
  },
  {
    slug: "harness-hub",
    name: "Harness Hub",
    featured: true,
    status: "Live",
    summary:
      "Reduced traced serverless output by 40.2% and incremental typechecking time by 61.5% while building a broad AI-assisted product platform.",
    metadata: [
      "CTO",
      "AI",
      "Multi-tenant architecture",
      "Serverless",
      "Durable workflows",
    ],
    problem:
      "Harness Hub brings AI-assisted page and content generation, visual editing, marketing planning, SEO, CRM, billing, and asset management into one product. The platform also has to support multi-tenant data and durable background work without slowing product delivery.",
    role: "CTO and hands-on architect across the product, application architecture, data model, AI capabilities, background workflows, developer experience, and production operations.",
    constraints: [
      "The product serves multiple client organizations, so tenant data, assets, billing, and reporting have to remain isolated across a shared platform.",
      "AI generation, visual editing, marketing workflows, SEO, CRM, billing, asset management, and durable background work all share the same product surface.",
      "A serverless footprint spanning 213 functions has to stay within deployment-output limits without slowing routine typechecking and delivery.",
      "Authentication and account-recovery flows have to remain safe when external security systems prefetch links.",
    ],
    decisions: [
      "Trace serverless output across the full function set to identify shared dependency leakage rather than optimize functions in isolation.",
      "Improve the incremental typechecking path so routine feedback stays fast as the application grows.",
      "Change the password-reset flow so automated email scanning cannot consume the user's reset action.",
    ],
    proof: [
      "Traced serverless output fell from 7,287 MB to 4,358 MB, a 40.2% reduction.",
      "Incremental typechecking fell from 39 seconds to 15 seconds, a 61.5% reduction.",
      "A password-reset failure caused by enterprise email scanners was diagnosed and fixed.",
    ],
    results: [
      "The platform became smaller to deploy and faster to change while continuing to support its full product surface.",
      "The password-reset investigation reinforced that production reliability includes the behavior of systems around the application, including security scanners.",
    ],
    currentStatus: "Live. Santiago continues as CTO.",
    links: [
      { label: "Marketing site", href: "https://www.pagestorm.ai/" },
    ],
  },
  {
    slug: "data-loom",
    name: "Data Loom",
    featured: true,
    status: "Archived",
    summary:
      "Designed and built solo in under three weeks, then named runner-up in Supabase's 2024 OSS hackathon for Most technically impressive.",
    metadata: ["WebRTC", "Direct file transfer", "Supabase"],
    problem:
      "Data Loom explored how to move files directly between devices without requiring people to create accounts or sending file contents through an intermediary server.",
    role: "Santiago designed and built the product solo between April 20 and May 6, 2024.",
    constraints: [
      "Pairing had to be temporary and simple enough to enter on another device.",
      "Sessions had to work without an explicit account-registration step.",
      "File data had to travel directly between paired devices.",
    ],
    decisions: [
      "Use WebRTC for direct device-to-device transfer.",
      "Pair devices with temporary numeric codes.",
      "Create anonymous sessions in the background so account setup does not interrupt the transfer flow.",
    ],
    proof: [
      "Built from initial work to completion in under three weeks.",
      "Runner-up in the Most technically impressive category of Supabase's 2024 OSS hackathon.",
      "The implementation remains available in the public repository.",
    ],
    results: [
      "The project demonstrated a complete direct-transfer flow under a short delivery window and received external recognition for its technical execution.",
      "A focused pairing model made peer-to-peer infrastructure approachable without adding a visible account workflow.",
    ],
    currentStatus: "Archived. The product and live demo are unavailable.",
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/sangonz193/data-loom",
      },
    ],
  },
  {
    slug: "openfing",
    name: "OpenFING",
    featured: false,
    status: "Earlier work",
    summary:
      "Built a web client for a Universidad de la República project that became the official client and was maintained for about four years.",
    metadata: ["Web client", "Universidad de la República"],
    problem:
      "The OpenFING project at Universidad de la República needed a web client that could serve its users over the long term.",
    role: "Santiago built the web client. After it became the project's official client, he maintained and improved it for about four years.",
    constraints: [
      "The client served an established university project rather than a standalone greenfield product.",
      "It needed to remain maintainable as the official client over several years.",
    ],
    decisions: [
      "Continue maintaining the client after official adoption rather than treating its first release as the endpoint.",
      "Keep the implementation available in a public repository.",
    ],
    proof: [
      "The web client became OpenFING's official client.",
      "Santiago maintained it for about four years.",
      "The source remains available in the public repository.",
    ],
    results: [
      "The web client implementation became official infrastructure for a university project.",
      "Its four-year maintenance period made long-term stewardship as important as the initial implementation.",
    ],
    currentStatus:
      "Earlier work. This web client is no longer live or the project's official client.",
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/sangonz193/openfing-web",
      },
    ],
  },
] as const

export const featuredProjects = projects.filter((project) => project.featured)

export const earlierProjects = projects.filter((project) => !project.featured)

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
