import { PostCard } from "@/components/layout/post-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Post, User } from "@shared/schema";

export default function Home() {
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const { data: posts = [] } = useQuery<Post[]>({
    queryKey: ['/api/posts']
  });

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ['/api/users']
  });

  const createPost = useMutation({
    mutationFn: async (content: string) => {
      if (!auth.currentUser) throw new Error("Not authenticated");

      const res = await apiRequest('POST', '/api/posts', {
        userId: 1, // TODO: Get actual user ID
        content,
        imageUrl: null
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
      setContent("");
      toast({
        title: "Success",
        description: "Post created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!content.trim() || !auth.currentUser) return;
    createPost.mutate(content);
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
        <Button 
          onClick={handleSubmit} 
          disabled={!content.trim() || createPost.isPending}
        >
          {createPost.isPending ? "Posting..." : "Post"}
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