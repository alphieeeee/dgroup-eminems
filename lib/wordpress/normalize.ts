import type {
  DiscussionPost,
  NormalizedDiscussionPost,
  NormalizedDiscussionThumbnail
} from "@/types/discussion";
import { formatDate } from "@/utils/helpers";

function forceHttp(url?: string | null): string {
  if (!url) return "";

  return url.replace(
    "https://dgroup-cms.archfortedesignstudio.com",
    "http://dgroup-cms.archfortedesignstudio.com"
  );
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
    discussionDate: formatDate(fields?.discussionDate) ?? "",

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
    discussionDate: formatDate(fields?.discussionDate) ?? "",

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
