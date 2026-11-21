/**
 * Sanity Schema: Homepage Singleton Document
 * Supports independent media overrides for featured project references
 */
export const homepageSchema = {
  name: "homepage",
  title: "Homepage Sections",
  type: "document",
  fieldsets: [
    { name: "hero", title: "1. Hero Section" },
    { name: "intro", title: "2. Introduction & Narrative" },
    { name: "featured", title: "3. Featured Projects Showcase" },
    { name: "services", title: "4. Technical Services & Expertise" },
    { name: "about", title: "5. About Preview" },
    { name: "contact", title: "6. Contact & Availability" },
  ],
  fields: [
    // 1. Hero
    {
      name: "heroHeadline",
      title: "Hero Headline Text",
      type: "string",
      fieldset: "hero",
      initialValue: "Designing high-throughput systems, resilient platforms & modern digital software.",
    },
    {
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
      fieldset: "hero",
      rows: 2,
      initialValue: "Full-Stack Engineer & Systems Architect focusing on distributed systems, AI/ML inference runtimes, and sub-second web applications.",
    },
    {
      name: "heroVideoUrl",
      title: "Hero Background Video URL (Cloudinary / MP4)",
      type: "string",
      fieldset: "hero",
      initialValue: "/images/skyline_banner.mp4",
      description: "Direct video stream for the looping cinematic hero banner",
    },
    {
      name: "heroPosterUrl",
      title: "Hero Poster Fallback Image URL",
      type: "string",
      fieldset: "hero",
      initialValue: "/images/skyline_twilight.jpg",
    },

    // 2. Introduction
    {
      name: "introStatement",
      title: "Mission Statement",
      type: "text",
      fieldset: "intro",
      rows: 3,
      initialValue: "I engineer high-throughput machine learning systems, low-latency model inference runtimes, and resilient cloud infrastructure built to perform deterministically under demanding production scale.",
    },
    {
      name: "introBioParagraphs",
      title: "Extended Narrative Paragraphs",
      type: "array",
      fieldset: "intro",
      of: [{ type: "text" }],
    },

    // 3. Featured Projects Showcase (With independent showcase media!)
    {
      name: "featuredProjects",
      title: "Curated Homepage Projects",
      type: "array",
      fieldset: "featured",
      description: "Reference existing projects with independently configurable showcase media",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "project",
              title: "Project Reference",
              type: "reference",
              to: [{ type: "project" }],
            },
            {
              name: "customImage",
              title: "Independent Homepage Showcase Image URL",
              type: "string",
              description: "Optional override image used only on the homepage card",
            },
            {
              name: "customVideoUrl",
              title: "Independent Homepage Showcase Video URL",
              type: "string",
              description: "Optional looping preview video for the homepage card",
            },
            {
              name: "customTagline",
              title: "Custom Homepage Tagline",
              type: "string",
            },
            {
              name: "displayOrder",
              title: "Display Order",
              type: "number",
              initialValue: 1,
            },
            {
              name: "isVisible",
              title: "Show on Homepage",
              type: "boolean",
              initialValue: true,
            },
          ],
        },
      ],
    },

    // 4. Services Showcase
    {
      name: "servicesTitle",
      title: "Services Section Title",
      type: "string",
      fieldset: "services",
      initialValue: "Technical Expertise",
    },

    // 5. About Preview
    {
      name: "aboutHeading",
      title: "About Heading",
      type: "string",
      fieldset: "about",
      initialValue: "ABOUT ME",
    },
    {
      name: "aboutButtonText",
      title: "About Button Text",
      type: "string",
      fieldset: "about",
      initialValue: "EXPLORE MY STORY",
    },

    // 6. Contact Section
    {
      name: "contactHeadline",
      title: "Contact Headline",
      type: "string",
      fieldset: "contact",
      initialValue: "Let's architect something dependable.",
    },
    {
      name: "contactEmail",
      title: "Direct Contact Email",
      type: "string",
      fieldset: "contact",
      initialValue: "dilshan.devxx@gmail.com",
    },
    {
      name: "contactAvailability",
      title: "Current Availability Status",
      type: "string",
      fieldset: "contact",
      initialValue: "Available for engineering roles & technical advisory",
    },
  ],
};
