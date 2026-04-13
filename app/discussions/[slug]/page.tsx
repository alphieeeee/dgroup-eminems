import Image from "next/image";
import { notFound } from "next/navigation";
import { getDiscussionPostBySlug } from "@/lib/wordpress/discussions";
import { normalizeDiscussionPost } from "@/lib/wordpress/normalize";
import styles from "@/styles/SinglePage.module.scss";
import AnimPanning from "@/app/components/gsap/AnimPanning";

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
          <AnimPanning
            key={`${slug}-title`}
            duration={0.8}
            direction={'up'}
            delay={0.5}
            from={10}
            to={0}
            fade={'in'}
            animOnce={true}
            onScroll={false}
          >
            <h1
              className="relative max-w-[600px] lg:max-w-[575px] mx-auto text-center text-6xl font-bold pb-[2rem]"
              style={{ color: post.titleTextColor || "#00C0D7" }}
            >
              {post.discussionTitle || post.title}
            </h1>
            </AnimPanning>
            {post.discussionThumbnail && (
              <AnimPanning
                key={`${slug}-image`}
                duration={0.8}
                direction={'up'}
                delay={0.5}
                from={0}
                to={0}
                fade={'in'}
                animOnce={true}
                onScroll={false}
              >
                <div className="relative mx-auto aspect-video overflow-hidden rounded-2xl mb-2">
                  <Image
                    src={`/thumb-${slug}.png`}
                    alt={post.discussionTitle || post.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              </AnimPanning>
          )}
          <div className={`relative text-right`}>
            {post.discussionDate && (
              <AnimPanning
                key={`${slug}-date`}
                duration={0.8}
                direction={'up'}
                from={0}
                to={0}
                fade={'in'}
              >
                <p className="text-sm md:text-base">{post.discussionDate}</p>
              </AnimPanning>
            )}
          </div>
          <article className="relative space-y-5">
            {post.discussionSubtitle && (
              <AnimPanning
                key={`${slug}-subtitle`}
                duration={0.8}
                direction={'up'}
                from={0}
                to={0}
                fade={'in'}
              >
                <p className="text-xl">{post.discussionSubtitle}</p>
              </AnimPanning>
            )}
            {post.discussionDescription && (
              <AnimPanning
                key={`${slug}-desc`}
                duration={0.8}
                direction={'up'}
                from={0}
                to={0}
                fade={'in'}
              >
                <p className="leading-7 text-lg break-words">{post.discussionDescription}</p>
              </AnimPanning>
            )}
          </article>
        </div>

        {hasFirstSection && (<div className={`w-full flex flex-col justify-center max-w-3xl min-w-0 relative first-section py-[5vw]`}>
          {post.firstSectionImage && (
            <AnimPanning
              key={`${slug}-firstSection-image`}
              duration={0.8}
              direction={'up'}
              from={0}
              to={0}
              fade={'in'}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-[2rem]">
                <Image
                  src={post.firstSectionImage}
                  alt={post.firstSectionHeading}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </AnimPanning>
          )}
          <article className="space-y-4">
            {post.firstSectionHeading && (
              <AnimPanning
                key={`${slug}-firstSection-heading`}
                duration={0.8}
                direction={'up'}
                from={0}
                to={0}
                fade={'in'}
              >
              <h2
                className="text-5xl font-semibold"
                style={{ color: post.titleTextColor || "#00C0D7" }}
              >
                {post.firstSectionHeading}
              </h2>
              </AnimPanning>
            )}
            {post.firstSectionContent && (
              <AnimPanning
                key={`${slug}-firstSection-content`}
                duration={0.8}
                direction={'up'}
                from={0}
                to={0}
                fade={'in'}
              >
                <div className="text-lg whitespace-pre-line leading-7 break-words">
                  {post.firstSectionContent}
                </div>
              </AnimPanning>
            )}
          </article>
        </div>
        )}

        {hasSecondSection && (
          <div className={`w-full flex flex-col justify-center max-w-3xl min-w-0 relative second-section py-[5vw]`}>
          {post.secondSectionImage && (
            <AnimPanning
              key={`${slug}-secondSection-image`}
              duration={0.8}
              direction={'up'}
              from={0}
              to={0}
              fade={'in'}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-[2rem]">
                <Image
                  src={post.secondSectionImage}
                  alt={post.secondSectionHeading}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </AnimPanning>
          )}
          <article className="space-y-4">
            {post.secondSectionHeading && (
              <AnimPanning
                key={`${slug}-secondSection-heading`}
                duration={0.8}
                direction={'up'}
                from={0}
                to={0}
                fade={'in'}
              >
                <h2
                  className="text-5xl font-semibold"
                  style={{ color: post.titleTextColor || "#00C0D7" }}
                >
                  {post.secondSectionHeading}
                </h2>
              </AnimPanning>
            )}
            {post.secondSectionContent && (
              <AnimPanning
                key={`${slug}-secondSection-content`}
                duration={0.8}
                direction={'up'}
                from={0}
                to={0}
                fade={'in'}
              >
                <div className="whitespace-pre-line leading-7 break-words">
                  {post.secondSectionContent}
                </div>
              </AnimPanning>
            )}
          </article>
        </div>
        )}

        {hasThirdSection && (<div className={`w-full flex flex-col justify-center max-w-3xl min-w-0 relative third-section py-[5vw]`}>
          {post.thirdSectionImage && (
            <AnimPanning
                key={`${slug}-thirdSection-image`}
                duration={0.8}
                direction={'up'}
                from={0}
                to={0}
                fade={'in'}
              >
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-[2rem]">
                <Image
                  src={post.thirdSectionImage}
                  alt={post.thirdSectionHeading}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </AnimPanning>
          )}
          <article className="space-y-4">
            {post.thirdSectionHeading && (
              <AnimPanning
                key={`${slug}-thirdSection-heading`}
                duration={0.8}
                direction={'up'}
                from={0}
                to={0}
                fade={'in'}
              >
                <h2
                  className="text-5xl font-semibold"
                  style={{ color: post.titleTextColor || "#00C0D7" }}
                >
                  {post.thirdSectionHeading}
                </h2>
              </AnimPanning>
            )}
            {post.thirdSectionContent && (
              <AnimPanning
                key={`${slug}-thirdSection-content`}
                duration={0.8}
                direction={'up'}
                from={0}
                to={0}
                fade={'in'}
              >
                <div className="whitespace-pre-line leading-7 break-words">
                  {post.thirdSectionContent}
                </div>
              </AnimPanning>
            )}
          </article>
        </div>
        )}

        {post.discussionVideo && (
        <div className={`w-full flex flex-col justify-center max-w-3xl min-w-0 relative discussion-video py-[5vw]`}>
          <article className="space-y-4">
            <AnimPanning
              key={`${slug}-discussionVideo-heading`}
              duration={0.8}
              direction={'up'}
              from={0}
              to={0}
              fade={'in'}
            >
              <h2
                className="text-5xl font-semibold"
                style={{ color: post.titleTextColor || "#00C0D7" }}
              >
                Discussion Video
              </h2>
            </AnimPanning>
            <AnimPanning
              key={`${slug}-discussionVideo-video`}
              duration={0.8}
              direction={'up'}
              from={0}
              to={0}
              fade={'in'}
            >
              <div
                className="relative prose prose-invert max-w-none aspect-video"
                dangerouslySetInnerHTML={{ __html: post.discussionVideo }}
              ></div>
            </AnimPanning>
          </article>
        </div>
        )}

        {post.sundayService && (<div className={`w-full flex flex-col justify-center max-w-3xl min-w-0 relative sunday-video py-[5vw]`}>
          <article className="space-y-4">
            <AnimPanning
              key={`${slug}-sundayService-heading`}
              duration={0.8}
              direction={'up'}
              from={0}
              to={0}
              fade={'in'}
            >
              <h2
                className="text-5xl font-semibold"
                style={{ color: post.titleTextColor || "#00C0D7" }}
              >
                Sunday Service
              </h2>
            </AnimPanning>
            <AnimPanning
              key={`${slug}-sundayService-video`}
              duration={0.8}
              direction={'up'}
              from={0}
              to={0}
              fade={'in'}
            >
              <div
                className="prose prose-invert max-w-none aspect-video"
                dangerouslySetInnerHTML={{ __html: post.sundayService }}
              ></div>
            </AnimPanning>
          </article>
        </div>
        )}
        {post.groupPhoto && (<div className={`w-full flex flex-col justify-center max-w-3xl min-w-0 relative sunday-video py-[5vw]`}>
          <article className="space-y-4">
            <AnimPanning
              duration={0.8}
              direction={'up'}
              from={0}
              to={0}
              fade={'in'}
            >
              <h2
                className="text-5xl font-semibold"
                style={{ color: post.titleTextColor || "#00C0D7" }}
              >
                Group Photo
              </h2>
            </AnimPanning>
            <AnimPanning

                duration={0.8}
                direction={'up'}
                from={0}
                to={0}
                fade={'in'}
              >
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-[2rem]">
                <Image
                  src={`/group-pic-${slug}.png`}
                  alt={`group-pic-${slug}.png`}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </AnimPanning>
          </article>
        </div>
        )}
      </section>
    </main>
  );
};

export default DiscussionSinglePage;
