/**
 * Sanity Schema: Site Settings Singleton Document
 */
export const siteSettingsSchema = {
  name: "siteSettings",
  title: "Global Site Settings",
  type: "document",
  fieldsets: [
    { name: "branding", title: "1. Branding & Identity" },
    { name: "nav", title: "2. Navigation & Actions" },
    { name: "socials", title: "3. Social Media Links" },
    { name: "footer", title: "4. Footer Content" },
    { name: "seo", title: "5. Default SEO Metadata" },
  ],
  fields: [
    // Branding
    {
      name: "brandName",
      title: "Brand Name",
      type: "string",
      fieldset: "branding",
      initialValue: "DILSHAN.",
    },
    {
      name: "wordmark",
      title: "Header Wordmark",
      type: "string",
      fieldset: "branding",
      initialValue: "DILSHAN.",
    },
    {
      name: "initials",
      title: "Monogram Initials",
      type: "string",
      fieldset: "branding",
      initialValue: "D",
    },

    // Navigation
    {
      name: "navLinks",
      title: "Header Navigation Links",
      type: "array",
      fieldset: "nav",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Link Label", type: "string" },
            { name: "url", title: "Destination URL", type: "string" },
            { name: "order", title: "Order", type: "number" },
          ],
        },
      ],
    },
    {
      name: "ctaButtonText",
      title: "Top-Right CTA Button Text",
      type: "string",
      fieldset: "nav",
      initialValue: "Join 70K+ Readers",
    },
    {
      name: "ctaButtonUrl",
      title: "CTA Button Destination",
      type: "string",
      fieldset: "nav",
      initialValue: "/#contact",
    },

    // Socials
    {
      name: "socials",
      title: "Social Platforms",
      type: "array",
      fieldset: "socials",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", title: "Platform Name", type: "string" },
            { name: "url", title: "Profile URL", type: "string" },
            { name: "handle", title: "Display Handle", type: "string" },
          ],
        },
      ],
    },

    // Footer
    {
      name: "copyrightStatement",
      title: "Copyright Statement",
      type: "string",
      fieldset: "footer",
      initialValue: "Dilshan. All Rights Reserved.",
    },
    {
      name: "footerTagline",
      title: "Footer Bio Tagline",
      type: "string",
      fieldset: "footer",
      initialValue: "Full-Stack Engineer & Systems Architect focusing on distributed systems.",
    },

    // Default SEO
    {
      name: "defaultTitle",
      title: "Default Browser Title",
      type: "string",
      fieldset: "seo",
      initialValue: "Dilshan | Full-Stack Engineer & System Architect",
    },
    {
      name: "defaultDescription",
      title: "Default Meta Description",
      type: "text",
      fieldset: "seo",
      rows: 3,
      initialValue: "Full-stack engineer and system architect focusing on distributed systems, modern web experiences & scalable architectures.",
    },
    {
      name: "ogImageUrl",
      title: "Default Open Graph Image URL",
      type: "string",
      fieldset: "seo",
      initialValue: "/images/og_banner.jpg",
    },
  ],
};
