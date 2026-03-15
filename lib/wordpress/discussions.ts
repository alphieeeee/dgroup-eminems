import { fetchGraphQL } from "./client";
import { DISCUSSION_THUMBNAILS_QUERY, DISCUSSION_POST_BY_SLUG_QUERY } from "./queries";
import type { DiscussionPost } from "@/types/discussion";

type DiscussionThumbnailsResponse = {
  posts?: {
    nodes?: DiscussionPost[];
  };
};

type DiscussionPostBySlugResponse = {
  post?: DiscussionPost | null;
};

export async function getDiscussionThumbnails(): Promise<DiscussionPost[]> {
  const data = await fetchGraphQL<DiscussionThumbnailsResponse>(
    DISCUSSION_THUMBNAILS_QUERY
  );

  return data.posts?.nodes ?? [];
}

export async function getDiscussionPostBySlug(
  slug: string
): Promise<DiscussionPost | null> {
  const data = await fetchGraphQL<DiscussionPostBySlugResponse>(
    DISCUSSION_POST_BY_SLUG_QUERY,
    { slug }
  );

  return data.post ?? null;
}
