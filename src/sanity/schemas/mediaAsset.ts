/**
 * Sanity Schema: Media Asset (Cloudinary & Local Assets)
 */
export const mediaAssetSchema = {
  name: "mediaAsset",
  title: "Media Asset",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Asset Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "url",
      title: "Cloudinary or Static Asset URL",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "type",
      title: "Asset Type",
      type: "string",
      options: { list: ["image", "video"] },
      initialValue: "image",
    },
    {
      name: "format",
      title: "Format (e.g. JPG, PNG, WEBP, MP4)",
      type: "string",
    },
    {
      name: "width",
      title: "Width (px)",
      type: "number",
    },
    {
      name: "height",
      title: "Height (px)",
      type: "number",
    },
    {
      name: "cloudinaryPublicId",
      title: "Cloudinary Public ID",
      type: "string",
    },
    {
      name: "usedIn",
      title: "Referenced In Projects / Pages",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "type",
      media: "url",
    },
  },
};
