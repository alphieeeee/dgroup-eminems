import Image from "next/image";
import Link from "next/link";

import {
  getDiscussionThumbnails
} from "@/lib/wordpress/discussions";

import {
  normalizeDiscussionThumbnail
} from "@/lib/wordpress/normalize";
import AnimPanning from "./gsap/AnimPanning";

const DiscussionThumbnails = async () => {
  const rawPosts = await getDiscussionThumbnails();
  const posts = rawPosts.map(normalizeDiscussionThumbnail);

  if (!posts.length) {
    return (
      <section className="w-full py-20 text-white">
        No discussions found.
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
        {posts.map((post, index) => (
          <Link key={post.slug || post.id} href={`/discussions/${post.slug}`}>
            <article
              className="rounded-2xl p-2 md:p-4 lg:p-6 cursor-pointer transition-opacity hover:opacity-80"
              style={{ color: "#979797" }}
            >
              {post.discussionThumbnail && (
                <AnimPanning
                  key={`discussion-thumbs-${index}`}
                  duration={0.8}
                  direction={'up'}
                  delay={(0.1 * (index + 1)+ 0.5)}
                  from={0}
                  to={0}
                  fade={'in'}
                  animOnce={true}
                  onScroll={false}
                >
                  <div className="relative mb-3 w-full overflow-hidden rounded-xl aspect-video">
                    {/* <Image
                      src={post.discussionThumbnail}
                      alt={post.discussionTitle || post.title}
                      fill
                      unoptimized
                      className="object-cover"
                    /> */}
                    <Image
                      src={`/thumb-${post.slug}.png`}
                      alt={post.discussionTitle || post.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </AnimPanning>
              )}
              <AnimPanning
                key={`discussion-title-${index}`}
                duration={0.8}
                direction={'up'}
                delay={(0.1 * (index + 1)+ 0.55)}
                from={0}
                to={0}
                fade={'in'}
                animOnce={true}
                onScroll={false}
              >
                <h2
                  className="text-4xl font-bold text-center"
                  style={{ color: "#00C0D7" }}
                >
                  {post.discussionTitle || post.title}
                </h2>
              </AnimPanning>

              {post.discussionSubtitle && (
                <AnimPanning
                  key={`discussion-subtitle-${index}`}
                  duration={0.8}
                  direction={'up'}
                  delay={(0.1 * (index + 1)+ 0.6)}
                  from={0}
                  to={0}
                  fade={'in'}
                  animOnce={true}
                  onScroll={false}
                >
                  <h3 className="mt-2 text-2xl text-center">
                    {post.discussionSubtitle}
                  </h3>
                </AnimPanning>
              )}

              {/* {post.discussionDescription && (
                <p className="mt-4 max-w-3xl leading-7">
                  {post.discussionDescription}
                </p>
              )} */}
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DiscussionThumbnails;
