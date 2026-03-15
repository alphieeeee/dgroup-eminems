import Image from "next/image";
import Link from "next/link";

import {
  getDiscussionThumbnails
} from "@/lib/wordpress/discussions";

import {
  normalizeDiscussionThumbnail
} from "@/lib/wordpress/normalize";

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
        {posts.map((post) => (
          <Link key={post.slug || post.id} href={`/discussions/${post.slug}`}>
            <article
              className="rounded-2xl p-2 md:p-4 lg:p-6 cursor-pointer transition-opacity hover:opacity-80"
              style={{ color: "#979797" }}
            >
              {post.discussionThumbnail && (
                <div className="relative mb-3 w-full overflow-hidden rounded-xl aspect-video">
                  <Image
                    src={post.discussionThumbnail}
                    alt={post.discussionTitle || post.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )}

              <h2
                className="text-4xl font-bold"
                style={{ color: "#00C0D7" }}
              >
                {post.discussionTitle || post.title}
              </h2>

              {post.discussionSubtitle && (
                <h3 className="mt-2 text-2xl">
                  {post.discussionSubtitle}
                </h3>
              )}

              {post.discussionDescription && (
                <p className="mt-4 max-w-3xl leading-7">
                  {post.discussionDescription}
                </p>
              )}
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DiscussionThumbnails;
