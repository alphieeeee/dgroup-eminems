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
      className={`${styles.container} relative mx-auto w-[min(90vw,1920px)] flex min-h-screen items-center justify-center flex-col py-[5vw]`}
      style={{
        backgroundColor: post.backgroundColor || "transparent",
        color: post.contentTextColor || "#fff",
      }}
    >
      <section className={`w-full max-w-3xl relative hero-section pb-[5vw]`}>
        <h1
          className="text-center text-4xl font-bold md:text-4xl lg:text-5xl pb-[2rem]"
          style={{ color: post.titleTextColor || "#fff" }}
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
            <h2 className="text-xl md:text-2xl">{post.discussionSubtitle}</h2>
          )}
          {post.discussionDescription && (
            <p className="leading-7 md:text-lg">{post.discussionDescription}</p>
          )}
        </article>
      </section>

      {hasFirstSection && (<section className={`w-full max-w-3xl relative first-section pb-[3vw]`}>
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
            <h3
              className="text-3xl font-semibold"
              style={{ color: post.titleTextColor || "#fff" }}
            >
              {post.firstSectionHeading}
            </h3>
          )}
          {post.firstSectionContent && (
            <div className="whitespace-pre-line leading-7">
              {post.firstSectionContent}
            </div>
          )}
        </article>
      </section>
      )}

      {hasSecondSection && (<section className={`w-full max-w-3xl relative second-section pb-[5vw]`}>
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
            <h3
              className="text-3xl font-semibold"
              style={{ color: post.titleTextColor || "#fff" }}
            >
              {post.secondSectionHeading}
            </h3>
          )}
          {post.secondSectionContent && (
            <div className="whitespace-pre-line leading-7">
              {post.secondSectionContent}
            </div>
          )}
        </article>
      </section>
      )}

      {hasThirdSection && (<section className={`w-full max-w-3xl relative third-section pb-[5vw]`}>
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
            <h3
              className="text-3xl font-semibold"
              style={{ color: post.titleTextColor || "#fff" }}
            >
              {post.thirdSectionHeading}
            </h3>
          )}
          {post.thirdSectionContent && (
            <div className="whitespace-pre-line leading-7">
              {post.thirdSectionContent}
            </div>
          )}
        </article>
      </section>
      )}

      {post.discussionVideo && (<section className={`w-full max-w-3xl relative discussion-video pb-[5vw]`}>
        <article className="space-y-4">
          <h3
            className="text-3xl font-semibold"
            style={{ color: post.titleTextColor || "#fff" }}
          >
            Discussion Video
          </h3>
          <div
            className="prose prose-invert max-w-none aspect-video"
            dangerouslySetInnerHTML={{ __html: post.discussionVideo }}
          />
        </article>
      </section>
      )}

      {post.sundayService && (<section className={`w-full max-w-3xl relative sunday-video`}>
        <article>
          <h3
            className="text-3xl font-semibold"
            style={{ color: post.titleTextColor || "#fff" }}
          >
            Sunday Service
          </h3>
          <div
            className="prose prose-invert max-w-none aspect-video"
            dangerouslySetInnerHTML={{ __html: post.sundayService }}
          />
        </article>
      </section>
      )}
    </main>
  );
};

export default DiscussionSinglePage;
