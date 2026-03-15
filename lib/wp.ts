import type { DiscussionPost, NormalizedDiscussionPost, NormalizedDiscussionThumbnail } from "@/types/discussion";

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

const DISCUSSION_THUMBNAILS_QUERY = `
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

const DISCUSSION_POST_BY_SLUG_QUERY = `
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

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

function forceHttp(url?: string | null): string {
  if (!url) return "";
  return url.replace(
    "https://dgroup-cms.archfortedesignstudio.com",
    "http://dgroup-cms.archfortedesignstudio.com"
  );
}

async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!WORDPRESS_API_URL) {
    throw new Error("Missing WORDPRESS_API_URL in .env.local");
  }

  const res = await fetch(WORDPRESS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json: GraphQLResponse<T> = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors.map((err) => err.message).join(", "));
  }

  if (!json.data) {
    throw new Error("No data returned from GraphQL.");
  }

  return json.data;
}

export async function getDiscussionThumbnails(): Promise<DiscussionPost[]> {
  const data = await fetchGraphQL<{
    posts?: {
      nodes?: DiscussionPost[];
    };
  }>(DISCUSSION_THUMBNAILS_QUERY);

  return data.posts?.nodes ?? [];
}

export async function getDiscussionPostBySlug(
  slug: string
): Promise<DiscussionPost | null> {
  const data = await fetchGraphQL<{
    post?: DiscussionPost | null;
  }>(DISCUSSION_POST_BY_SLUG_QUERY, { slug });

  return data.post ?? null;
}

export function normalizeDiscussionThumbnail(
  post: DiscussionPost
): NormalizedDiscussionThumbnail {
  const fields = post.discussionFields;

  return {
    title: post.title ?? "",
    id: post.id ?? "",
    slug: post.slug ?? "",
    featuredImage: forceHttp(post.featuredImage?.node?.sourceUrl),
    excerpt: post.excerpt ?? "",
    date: post.date ?? "",
    discussionTitle: fields?.discussionTitle ?? "",
    discussionSubtitle: fields?.discussionSubtitle ?? "",
    discussionDescription: fields?.discussionDescription ?? "",
    discussionDate: fields?.discussionDate ?? "",
    discussionThumbnail:
      forceHttp(fields?.discussionThumbnails?.node?.sourceUrl) ||
      forceHttp(post.featuredImage?.node?.sourceUrl),
  };
}

export function normalizeDiscussionPost(
  post: DiscussionPost
): NormalizedDiscussionPost {
  const fields = post.discussionFields;

  return {
    title: post.title ?? "",
    id: post.id ?? "",
    slug: post.slug ?? "",
    featuredImage: forceHttp(post.featuredImage?.node?.sourceUrl),
    excerpt: post.excerpt ?? "",
    date: post.date ?? "",

    discussionTitle: fields?.discussionTitle ?? "",
    discussionSubtitle: fields?.discussionSubtitle ?? "",
    discussionDescription: fields?.discussionDescription ?? "",
    discussionDate: fields?.discussionDate ?? "",
    discussionThumbnail:
      forceHttp(fields?.discussionThumbnails?.node?.sourceUrl) ||
      forceHttp(post.featuredImage?.node?.sourceUrl),

    firstSectionHeading: fields?.firstSectionHeading ?? "",
    firstSectionContent: fields?.firstSectionContent ?? "",
    firstSectionImage: forceHttp(fields?.firstSectionImage?.node?.sourceUrl),

    secondSectionHeading: fields?.secondSectionHeading ?? "",
    secondSectionContent: fields?.secondSectionContent ?? "",
    secondSectionImage: forceHttp(fields?.secondSectionImage?.node?.sourceUrl),

    thirdSectionHeading: fields?.thirdSectionHeading ?? "",
    thirdSectionContent: fields?.thirdSectionContent ?? "",
    thirdSectionImage: forceHttp(fields?.thirdSectionImage?.node?.sourceUrl),

    discussionVideo: fields?.discussionVideo ?? "",
    sundayService: fields?.sundayService ?? "",
    titleTextColor: fields?.titleTextColor ?? "",
    contentTextColor: fields?.contentTextColor ?? "",
    backgroundColor: fields?.backgroundColor ?? "",
  };
}
