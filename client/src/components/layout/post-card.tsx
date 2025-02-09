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
    <Card className="mb-4 border border-gray-300 rounded-xl shadow-sm bg-white">
      <CardContent className="pt-4 px-6">
        <div className="flex items-start gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user.avatar || undefined} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-500">@{user.username}</div>
              </div>
            </div>
            <p className="mt-2 text-gray-800">{post.content}</p>
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="Post content"
                className="mt-3 rounded-lg w-full object-cover max-h-96 border border-gray-200"
              />
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between px-6 py-3 border-t border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center text-gray-600 hover:text-red-500"
        >
          <Heart className="w-5 h-5 mr-1" />
          Like
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center text-gray-600 hover:text-blue-500"
        >
          <MessageCircle className="w-5 h-5 mr-1" />
          Comment
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center text-gray-600 hover:text-green-500"
        >
          <Share2 className="w-5 h-5 mr-1" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}
