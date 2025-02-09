
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PostCard } from "@/components/layout/post-card";
import { storage } from "@/lib/storage";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(storage.getUsers()[0]);

  useEffect(() => {
    // Update user data when storage changes
    const updateUser = () => {
      const currentUser = storage.getUsers()[0];
      if (currentUser) {
        setUser(currentUser);
      }
    };
    
    // Initial load
    updateUser();
  }, []);

  if (!user) {
    return (
      <div className="container py-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="py-6">
              <p className="text-center text-muted-foreground">User not found</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const posts = storage.getPosts().filter((post) => post.userId === user.id);

  return (
    <div className="container py-6">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">@{user.username}</p>
                <p className="mt-2">{user.bio}</p>
                <div className="mt-4">
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
