import { PostCard } from "@/components/layout/post-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { storage } from "@/lib/storage";
import { auth } from "@/lib/firebase";
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const posts = storage.getPosts();
  const users = storage.getUsers();

  const handleSubmit = () => {
    if (!content.trim() || !auth.currentUser) return;

    const newPost = {
      id: Date.now(),
      userId: 1, // Simplified for local storage
      content,
      imageUrl: null,
      createdAt: new Date(),
    };

    storage.addPost(newPost);
    setContent("");
    toast({
      title: "Success",
      description: "Post created successfully",
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Textarea
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleSubmit} disabled={!content.trim()}>
          Post
        </Button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            user={users.find((u) => u.id === post.userId)!}
          />
        ))}
      </div>
    </div>
  );
}