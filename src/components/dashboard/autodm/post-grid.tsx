"use client";

import { useEffect, useState } from "react";
import { Check, ImageOff } from "lucide-react";

import { getAccessToken } from "@/context/auth-context";
import { autoDmApi, type InstagramPost } from "@/lib/autodm-api";
import { cn } from "@/lib/utils";

export function PostGrid({
  selectedId,
  onSelectAction,
}: {
  selectedId?: string;
  onSelectAction: (post: InstagramPost) => void;
}) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    autoDmApi
      .getInstagramPosts(token)
      .then(setPosts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-2.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton aspect-square rounded-xl" />
        ))}
      </div>
    );
  }

  if (error || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 py-10 text-center dark:border-white/15">
        <ImageOff className="h-6 w-6 text-neutral-300" />
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Couldn&apos;t load recent posts.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {posts.map((post) => {
        const active = selectedId === post.id;
        return (
          <button
            key={post.id}
            onClick={() => onSelectAction(post)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl border-2 bg-neutral-100 dark:bg-white/5",
              active ? "border-orange-500" : "border-transparent"
            )}
          >
            {post.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.thumbnail} alt={post.title || "Post"} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-neutral-300">
                <ImageOff className="h-5 w-5" />
              </div>
            )}
            {active && (
              <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white">
                <Check className="h-3 w-3" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
