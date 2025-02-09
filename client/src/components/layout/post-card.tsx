import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import type { Post, User } from "@shared/schema";

interface PostCardProps {
  post: Post;
  user: User;
}

export function PostCard({ post, user }: PostCardProps) {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={user.avatar || undefined} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-muted-foreground">@{user.username}</div>
          </div>
        </div>
        <p className="mt-4">{post.content}</p>
        {post.imageUrl && (
          <img 
            src={post.imageUrl} 
            alt="Post content" 
            className="mt-4 rounded-lg w-full object-cover max-h-96"
          />
        )}
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button variant="ghost" size="sm">
          <Heart className="w-4 h-4 mr-2" />
          Like
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          Comment
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}