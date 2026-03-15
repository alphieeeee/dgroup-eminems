export const DISCUSSION_THUMBNAILS_QUERY = `
query GetDiscussionThumbnails {
  posts {
    nodes {
      title
      id
      slug
      featuredImage {
        node {
          sourceUrl
        }
      }
      excerpt
      date
      discussionFields {
        discussionTitle
        discussionSubtitle
        discussionDescription
        discussionDate
        discussionThumbnails {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}
`;

export const DISCUSSION_POST_BY_SLUG_QUERY = `
query GetDiscussionPostBySlug($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    title
    id
    slug
    featuredImage {
      node {
        sourceUrl
      }
    }
    excerpt
    date
    discussionFields {
      discussionTitle
      discussionSubtitle
      discussionDescription
      discussionDate
      discussionThumbnails {
        node {
          sourceUrl
        }
      }
      firstSectionHeading
      firstSectionContent
      firstSectionImage {
        node {
          sourceUrl
        }
      }
      secondSectionHeading
      secondSectionContent
      secondSectionImage {
        node {
          sourceUrl
        }
      }
      thirdSectionHeading
      thirdSectionContent
      thirdSectionImage {
        node {
          sourceUrl
        }
      }
      discussionVideo
      sundayService
      titleTextColor
      contentTextColor
      backgroundColor
    }
  }
}
`;
