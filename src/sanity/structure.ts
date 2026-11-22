/**
 * Sanity Studio Desk Structure Builder
 * Implements the exact hierarchical navigation requested for Dilshan Studio CMS
 */

export const structure = (S: any) =>
  S.list()
    .title("DILSHAN STUDIO CMS")
    .items([
      // 1. Overview
      S.listItem()
        .title("Overview Dashboard")
        .child(
          S.document()
            .schemaType("homepage")
            .documentId("homepage")
            .title("Overview Telemetry & Quick Actions")
        ),

      S.divider(),

      // 2. Homepage Sections Group
      S.listItem()
        .title("Homepage")
        .child(
          S.list()
            .title("Homepage Sections")
            .items([
              S.listItem()
                .title("Hero Section")
                .child(S.document().schemaType("homepage").documentId("homepage")),
              S.listItem()
                .title("Introduction")
                .child(S.document().schemaType("homepage").documentId("homepage")),
              S.listItem()
                .title("Featured Projects Showcase")
                .child(S.document().schemaType("homepage").documentId("homepage")),
              S.listItem()
                .title("Technical Expertise (Services)")
                .child(S.document().schemaType("homepage").documentId("homepage")),
              S.listItem()
                .title("About Preview")
                .child(S.document().schemaType("homepage").documentId("homepage")),
              S.listItem()
                .title("Contact Section")
                .child(S.document().schemaType("homepage").documentId("homepage")),
            ])
        ),

      // 3. Projects Management Group
      S.listItem()
        .title("Projects")
        .child(
          S.list()
            .title("Projects Management")
            .items([
              S.listItem()
                .title("All Projects")
                .child(S.documentTypeList("project").title("All Projects")),
              S.listItem()
                .title("Featured Projects")
                .child(
                  S.documentList()
                    .title("Featured Projects")
                    .filter('_type == "project" && featured == true')
                ),
              S.listItem()
                .title("Published Projects")
                .child(
                  S.documentList()
                    .title("Published Projects")
                    .filter('_type == "project" && status == "Published"')
                ),
              S.listItem()
                .title("Draft Projects")
                .child(
                  S.documentList()
                    .title("Drafts")
                    .filter('_type == "project" && status == "Draft"')
                ),
              S.listItem()
                .title("Card Layout & Line Limits")
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .documentId("siteSettings")
                    .title("Project Card Layout & Line Limits")
                ),
            ])
        ),

      // 4. Website Pages Group
      S.listItem()
        .title("Website Pages")
        .child(
          S.list()
            .title("Website Pages")
            .items([
              S.listItem()
                .title("About Page (/about)")
                .child(S.document().schemaType("homepage").documentId("aboutPage")),
              S.listItem()
                .title("Projects Directory (/projects)")
                .child(S.documentTypeList("project").title("All Projects")),
              S.listItem()
                .title("Contact Page (/#contact)")
                .child(S.document().schemaType("homepage").documentId("homepage")),
            ])
        ),

      // 5. Media Library
      S.listItem()
        .title("Media Library")
        .child(
          S.documentTypeList("mediaAsset").title("Cloudinary & Media Assets")
        ),

      S.divider(),

      // 6. Global Settings Group
      S.listItem()
        .title("Global Settings")
        .child(
          S.list()
            .title("Global Settings")
            .items([
              S.listItem()
                .title("Navigation")
                .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
              S.listItem()
                .title("Branding & Theme")
                .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
              S.listItem()
                .title("Social Links")
                .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
              S.listItem()
                .title("Footer")
                .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
              S.listItem()
                .title("SEO Settings")
                .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
              S.listItem()
                .title("Card Layout & Line Limits")
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .documentId("siteSettings")
                    .title("Card Layout & Line Limits")
                ),
            ])
        ),
    ]);
