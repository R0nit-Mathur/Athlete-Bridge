import { PostCard } from "@/components/layout/post-card";
import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { storage } from "@/lib/storage";
import { useState, useRef } from "react";
import { Image, X } from "lucide-react";

export default function Home() {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Add sample posts if none exist
  if (storage.getPosts().length === 0) {
    const demoUser = storage.getUsers()[0];
    if (demoUser) {
      storage.addPost({
        id: 1,
        userId: demoUser.id,
        content:
          "Just finished an intense training session! 🏃‍♂️ Working on improving my sprint times. The grind never stops! #Athletics #Training",
        imageUrl: "https://picsum.photos/seed/training1/800/600",
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      });

      storage.addPost({
        id: 2,
        userId: demoUser.id,
        content:
          "Big news! Qualified for the national championships! 🎉 Thank you to everyone who supported me on this journey. The real work begins now! #Achievements #Sports",
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
      });

      storage.addPost({
        id: 3,
        userId: demoUser.id,
        content:
          "New personal best in today's practice! 💪 Remember: progress is progress, no matter how small. Keep pushing! #Motivation #PersonalBest",
        imageUrl: "https://picsum.photos/seed/training2/800/600",
        createdAt: new Date(Date.now() - 10800000), // 3 hours ago
      });
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (!content.trim() && !imagePreview) return;

    setIsPosting(true);
    try {
      const user = storage.getUsers()[0];
      if (!user) throw new Error("No user found");

      storage.addPost({
        id: Date.now(),
        userId: user.id,
        content: content.trim(),
        imageUrl: imagePreview,
        createdAt: new Date(),
      });

      setContent("");
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast({
        title: "Success",
        description: "Post created successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create post",
        variant: "destructive",
      });
    } finally {
      setIsPosting(false);
    }
  };

  const posts = storage.getPosts();
  const users = storage.getUsers();

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto px-6 py-8 border-none">
        {" "}
        {/* Ensures no border */}
        {/* Create Post Section */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-8 border-none">
          <Textarea
            placeholder="What's happening in your sports journey?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mb-2 min-h-[100px] border-none rounded-lg text-lg p-4"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="hover:bg-gray-100"
              >
                <Image className="w-4 h-4" />
              </Button>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={(!content.trim() && !imagePreview) || isPosting}
              className="bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isPosting ? "Posting..." : "Post"}
            </Button>
          </div>
          {imagePreview && (
            <div className="mt-2 relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="rounded-lg max-h-96 w-full object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                onClick={removeImage}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        {/* Posts Section */}
        <div className="space-y-4 border-none">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              user={users.find((u) => u.id === post.userId)!}
            />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
