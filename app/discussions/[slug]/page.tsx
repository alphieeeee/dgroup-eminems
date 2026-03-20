import Image from "next/image";
import { notFound } from "next/navigation";
import { getDiscussionPostBySlug } from "@/lib/wordpress/discussions";
import { normalizeDiscussionPost } from "@/lib/wordpress/normalize";
import styles from "@/styles/SinglePage.module.scss";

type DiscussionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const DiscussionSinglePage = async ({ params }: DiscussionPageProps) => {
  const { slug } = await params;

  const rawPost = await getDiscussionPostBySlug(slug);

  if (!rawPost) {
    notFound();
  }

  const post = normalizeDiscussionPost(rawPost);
  const hasFirstSection = !!(post.firstSectionImage || post.firstSectionHeading || post.firstSectionContent);
  const hasSecondSection = !!(post.secondSectionImage ||post.secondSectionHeading || post.secondSectionContent);
  const hasThirdSection = !!(post.thirdSectionImage || post.thirdSectionHeading || post.thirdSectionContent);

  return (
    <main
      className={`${styles.container} relative w-full`}
      style={{
        backgroundColor: post.backgroundColor || "transparent",
        color: post.contentTextColor || "#979797",
      }}
    >
      <section className={`relative mx-auto w-[min(90vw,1920px)] flex min-h-screen items-center justify-center flex-col`}>
        <div className={`w-full max-w-3xl min-w-0 relative hero-section py-[5vw]`}>
          <h1
            className="max-w-[600px] lg:max-w-[575px] mx-auto text-center text-6xl font-bold pb-[2rem]"
            style={{ color: post.titleTextColor || "#00C0D7" }}
          >
            {post.discussionTitle || post.title}
          </h1>
          {post.discussionThumbnail && (
            <div className="relative mx-auto aspect-video overflow-hidden rounded-2xl mb-2">
              <Image
                src={post.discussionThumbnail}
                alt={post.discussionTitle || post.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}
          <div className={`relative text-right`}>
            {post.discussionDate && (
              <p className="text-sm md:text-base">{post.discussionDate}</p>
            )}
          </div>
          <article className="relative space-y-5">
            {post.discussionSubtitle && (
              <p className="text-xl">{post.discussionSubtitle}</p>
            )}
            {post.discussionDescription && (
              <p className="leading-7 text-lg break-words">{post.discussionDescription}</p>
            )}
          </article>
        </div>

        {hasFirstSection && (<div className={`w-full flex flex-col justify-center max-w-3xl min-w-0 relative first-section py-[5vw]`}>
          {post.firstSectionImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-[2rem]">
              <Image
                src={post.firstSectionImage}
                alt={post.firstSectionHeading}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}
          <article className="space-y-4">
            {post.firstSectionHeading && (
              <h2
                className="text-5xl font-semibold"
                style={{ color: post.titleTextColor || "#00C0D7" }}
              >
                {post.firstSectionHeading}
              </h2>
            )}
            {post.firstSectionContent && (
              <div className="text-lg whitespace-pre-line leading-7 break-words">
                {post.firstSectionContent}
              </div>
            )}
          </article>
        </div>
        )}

        {hasSecondSection && (<div className={`w-full flex flex-col justify-center max-w-3xl min-w-0 relative second-section py-[5vw]`}>
          {post.secondSectionImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-[2rem]">
              <Image
                src={post.secondSectionImage}
                alt={post.secondSectionHeading}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}
          <article className="space-y-4">
            {post.secondSectionHeading && (
              <h2
                className="text-5xl font-semibold"
                style={{ color: post.titleTextColor || "#00C0D7" }}
              >
                {post.secondSectionHeading}
              </h2>
            )}
            {post.secondSectionContent && (
              <div className="whitespace-pre-line leading-7 break-words">
                {post.secondSectionContent}
              </div>
            )}
          </article>
        </div>
        )}

        {hasThirdSection && (<div className={`w-full flex flex-col justify-center max-w-3xl min-w-0 relative third-section py-[5vw]`}>
          {post.thirdSectionImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-[2rem]">
              <Image
                src={post.thirdSectionImage}
                alt={post.thirdSectionHeading}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}
          <article className="space-y-4">
            {post.thirdSectionHeading && (
              <h2
                className="text-5xl font-semibold"
                style={{ color: post.titleTextColor || "#00C0D7" }}
              >
                {post.thirdSectionHeading}
              </h2>
            )}
            {post.thirdSectionContent && (
              <div className="whitespace-pre-line leading-7 break-words">
                {post.thirdSectionContent}
              </div>
            )}
          </article>
        </div>
        )}

        {post.discussionVideo && (<div className={`w-full flex flex-col justify-center max-w-3xl min-w-0 relative discussion-video py-[5vw]`}>
          <article className="space-y-4">
            <h2
              className="text-5xl font-semibold"
              style={{ color: post.titleTextColor || "#00C0D7" }}
            >
              Discussion Video
            </h2>
            <div
              className="prose prose-invert max-w-none aspect-video"
              dangerouslySetInnerHTML={{ __html: post.discussionVideo }}
            />
          </article>
        </div>
        )}

        {post.sundayService && (<div className={`w-full flex flex-col justify-center max-w-3xl min-w-0 relative sunday-video py-[5vw]`}>
          <article className="space-y-4">
            <h2
              className="text-5xl font-semibold"
              style={{ color: post.titleTextColor || "#00C0D7" }}
            >
              Sunday Service
            </h2>
            <div
              className="prose prose-invert max-w-none aspect-video"
              dangerouslySetInnerHTML={{ __html: post.sundayService }}
            />
          </article>
        </div>
        )}
      </section>
    </main>
  );
};

export default DiscussionSinglePage;
