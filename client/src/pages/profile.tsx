import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PostCard } from "@/components/layout/post-card";
import { storage } from "@/lib/storage";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(storage.getUsers()[0]);

  useEffect(() => {
    const updateUser = () => {
      const currentUser = storage.getUsers()[0];
      if (currentUser) {
        setUser(currentUser);
      }
    };

    updateUser();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="p-6 shadow-lg">
          <CardContent>
            <p className="text-center text-gray-500 text-lg">User not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const posts = storage.getPosts().filter((post) => post.userId === user.id);

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-6">
      {/* Profile Header */}
      <div className="bg-blue-500 h-24 w-full"></div>

      {/* Profile Info */}
      <div className="bg-white shadow-md p-6 relative w-full max-w-3xl">
        {/* Avatar */}
        <div className="absolute -top-12 left-6 md:left-6 sm:relative sm:top-0 sm:left-0 sm:mb-4">
          <Avatar className="w-24 h-24 border-4 border-white">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </div>

        {/* Profile Details */}
        <div className="mt-12 ml-32 sm:ml-0 sm:mt-4">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600 text-lg">@{user.username}</p>
          <p className="text-gray-700 text-base mt-2">{user.bio}</p>
          <Button className="mt-4 px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 transition">
            Edit Profile
          </Button>
        </div>
      </div>

      {/* User Posts */}
      <div className="w-full max-w-3xl mt-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} user={user} />
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No posts yet</p>
        )}
      </div>
    </div>
  );
}
