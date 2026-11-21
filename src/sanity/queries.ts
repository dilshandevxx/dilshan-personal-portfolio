/**
 * Typed GROQ Queries for Sanity CMS
 */

export const ALL_PROJECTS_QUERY = `
  *[_type == "project"] | order(orderRank asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    status,
    featured,
    date,
    tagline,
    description,
    longDescription,
    coverImage,
    "image": coalesce(image, coverImage),
    videoUrl,
    videoThumbnail,
    highlights,
    tags,
    metricsDetail,
    stackLayers,
    gallery,
    githubUrl,
    demoUrl,
    writeupUrl,
    architecture,
    challenges,
    seo,
    _updatedAt
  }
`;

export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    status,
    featured,
    date,
    tagline,
    description,
    longDescription,
    coverImage,
    "image": coalesce(image, coverImage),
    videoUrl,
    videoThumbnail,
    highlights,
    tags,
    metricsDetail,
    stackLayers,
    gallery,
    githubUrl,
    demoUrl,
    writeupUrl,
    architecture,
    challenges,
    seo,
    _updatedAt
  }
`;

export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && (featured == true || status == "Published")] | order(orderRank asc)[0...6] {
    _id,
    title,
    "slug": slug.current,
    category,
    tagline,
    coverImage,
    "image": coalesce(image, coverImage),
    videoUrl,
    tags,
    githubUrl,
    demoUrl
  }
`;

export const HOMEPAGE_SECTIONS_QUERY = `
  *[_type == "homepage"][0] {
    _id,
    heroHeadline,
    heroSubheadline,
    heroVideoUrl,
    heroPosterUrl,
    introStatement,
    introBioParagraphs,
    featuredProjects[] {
      _key,
      displayOrder,
      isVisible,
      customImage,
      customVideoUrl,
      customTagline,
      "slug": coalesce(project->slug.current, slug, ""),
      "project": project-> {
        _id,
        title,
        "slug": slug.current,
        category,
        tagline,
        coverImage,
        videoUrl,
        tags
      }
    },
    servicesTitle,
    aboutHeading,
    aboutButtonText,
    aboutStatement,
    aboutBannerUrl,
    aboutBannerAlt,
    contactHeadline,
    contactEmail,
    contactAvailability,
    contactLocation
  }
`;

export const MEDIA_ASSETS_QUERY = `
  *[_type == "mediaAsset"] | order(createdAt desc) {
    _id,
    name,
    url,
    type,
    format,
    width,
    height,
    size,
    cloudinaryPublicId,
    usedIn,
    createdAt
  }
`;

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    _id,
    brandName,
    wordmark,
    initials,
    navLinks,
    ctaButtonText,
    ctaButtonUrl,
    socials,
    copyrightStatement,
    footerTagline,
    defaultTitle,
    defaultDescription,
    ogImageUrl
  }
`;
