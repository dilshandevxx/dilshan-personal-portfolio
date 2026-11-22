/**
 * Sanity Schema: Project Document
 */
export const projectSchema = {
  name: "project",
  title: "Project",
  type: "document",
  fieldsets: [
    { name: "basic", title: "1. Basic Information" },
    { name: "cover", title: "2. Cover Media & Video" },
    { name: "gallery", title: "3. Project Gallery" },
    { name: "caseStudy", title: "4. Description & Case Study" },
    { name: "tech", title: "5. Technologies & Metrics" },
    { name: "links", title: "6. Project Links" },
    { name: "seo", title: "7. SEO Metadata" },
  ],
  fields: [
    {
      name: "title",
      title: "Project Title",
      type: "string",
      fieldset: "basic",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      fieldset: "basic",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      fieldset: "basic",
      options: {
        list: [
          "AI/ML",
          "DevOps",
          "Systems",
          "Full-Stack",
          "Platform Engineering",
          "MLOps",
          "Security",
          "Distributed Systems",
          "Data Engineering",
          "Landing",
          "Others",
        ],
      },
    },
    {
      name: "status",
      title: "Publishing Status",
      type: "string",
      fieldset: "basic",
      options: {
        list: ["Published", "Draft", "Archived"],
      },
      initialValue: "Draft",
    },
    {
      name: "featured",
      title: "Featured on Portfolio",
      type: "boolean",
      fieldset: "basic",
      initialValue: false,
    },
    {
      name: "date",
      title: "Release Year / Date",
      type: "string",
      fieldset: "basic",
      initialValue: "2026",
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
      fieldset: "basic",
    },
    // Media
    {
      name: "coverImage",
      title: "Cover Image URL (Cloudinary / Local)",
      type: "string",
      fieldset: "cover",
      description: "Direct URL to Cloudinary or project asset",
    },
    {
      name: "image",
      title: "Project Thumbnail Image URL",
      type: "string",
      fieldset: "cover",
      description: "Main project thumbnail image displayed on project cards and folio grid",
    },
    {
      name: "videoUrl",
      title: "Demo Video URL (Cloudinary / MP4)",
      type: "string",
      fieldset: "cover",
      description: "Interactive video demonstration",
    },
    {
      name: "videoThumbnail",
      title: "Video Poster Thumbnail URL",
      type: "string",
      fieldset: "cover",
    },
    // Gallery
    {
      name: "gallery",
      title: "Project Screenshots & Visual Assets",
      type: "array",
      fieldset: "gallery",
      of: [
        {
          type: "object",
          fields: [
            { name: "url", title: "Image URL", type: "url" },
            { name: "title", title: "Caption Title", type: "string" },
            { name: "caption", title: "Description", type: "text" },
          ],
        },
      ],
    },
    // Case Study
    {
      name: "description",
      title: "Short Summary",
      type: "text",
      fieldset: "caseStudy",
      rows: 3,
    },
    {
      name: "longDescription",
      title: "Full Narrative & Case Study",
      type: "text",
      fieldset: "caseStudy",
      rows: 8,
    },
    {
      name: "architecture",
      title: "System Architecture & Engineering Decisions",
      type: "text",
      fieldset: "caseStudy",
      rows: 4,
    },
    {
      name: "challenges",
      title: "Technical Challenges & Solutions",
      type: "text",
      fieldset: "caseStudy",
      rows: 4,
    },
    // Tech & Tools
    {
      name: "tags",
      title: "Technology Tags",
      type: "array",
      fieldset: "tech",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "metricsDetail",
      title: "Performance Benchmarks & Key Metrics",
      type: "array",
      fieldset: "tech",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Metric Label", type: "string" },
            { name: "value", title: "Metric Value", type: "string" },
          ],
        },
      ],
    },
    // Links
    {
      name: "githubUrl",
      title: "GitHub Repository URL",
      type: "url",
      fieldset: "links",
    },
    {
      name: "demoUrl",
      title: "Live Production URL",
      type: "url",
      fieldset: "links",
    },
    {
      name: "writeupUrl",
      title: "Technical RFC / Paper URL",
      type: "url",
      fieldset: "links",
    },
    // SEO
    {
      name: "metaTitle",
      title: "SEO Meta Title",
      type: "string",
      fieldset: "seo",
    },
    {
      name: "metaDescription",
      title: "SEO Meta Description",
      type: "text",
      fieldset: "seo",
      rows: 2,
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
};
