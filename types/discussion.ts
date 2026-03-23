export type ImageNode = {
  node?: {
    sourceUrl?: string | null;
  } | null;
} | null;

export type DiscussionFields = {
  discussionTitle?: string | null;
  discussionSubtitle?: string | null;
  discussionDescription?: string | null;
  discussionDate?: string | null;

  discussionThumbnails?: ImageNode;

  firstSectionHeading?: string | null;
  firstSectionContent?: string | null;
  firstSectionImage?: ImageNode;

  secondSectionHeading?: string | null;
  secondSectionContent?: string | null;
  secondSectionImage?: ImageNode;

  thirdSectionHeading?: string | null;
  thirdSectionContent?: string | null;
  thirdSectionImage?: ImageNode;

  discussionVideo?: string | null;
  sundayService?: string | null;
  groupPhoto?: ImageNode;

  titleTextColor?: string | null;
  contentTextColor?: string | null;
  backgroundColor?: string | null;
};

export type DiscussionPost = {
  title?: string | null;
  id?: string | null;
  slug?: string | null;
  featuredImage?: ImageNode;
  excerpt?: string | null;
  date?: string | null;
  discussionFields?: DiscussionFields | null;
};

export type NormalizedDiscussionThumbnail = {
  title: string;
  id: string;
  slug: string;
  featuredImage: string;
  excerpt: string;
  date: string;
  discussionTitle: string;
  discussionSubtitle: string;
  discussionDescription: string;
  discussionDate: string;
  discussionThumbnail: string;
};

export type NormalizedDiscussionPost = {
  title: string;
  id: string;
  slug: string;
  featuredImage: string;
  excerpt: string;
  date: string;

  discussionTitle: string;
  discussionSubtitle: string;
  discussionDescription: string;
  discussionDate: string;
  discussionThumbnail: string;

  firstSectionHeading: string;
  firstSectionContent: string;
  firstSectionImage: string;

  secondSectionHeading: string;
  secondSectionContent: string;
  secondSectionImage: string;

  thirdSectionHeading: string;
  thirdSectionContent: string;
  thirdSectionImage: string;

  discussionVideo: string;
  sundayService: string;
  groupPhoto: string;
  titleTextColor: string;
  contentTextColor: string;
  backgroundColor: string;
};
