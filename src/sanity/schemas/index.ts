import { projectSchema } from "./project";
import { homepageSchema } from "./homepage";
import { mediaAssetSchema } from "./mediaAsset";
import { siteSettingsSchema } from "./siteSettings";

export const schemaTypes = [
  projectSchema,
  homepageSchema,
  mediaAssetSchema,
  siteSettingsSchema,
];

export { projectSchema, homepageSchema, mediaAssetSchema, siteSettingsSchema };
