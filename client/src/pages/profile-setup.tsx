import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { storage } from "@/lib/storage";
import { Textarea } from "@/components/ui/textarea";

export default function ProfileSetup() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    sport: "",
    bio: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a demo user
    const demoUser = {
      id: 1,
      uid: "demo-user",
      name: formData.name,
      username: formData.username,
      sport: formData.sport,
      bio: formData.bio,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${formData.name}`,
    };

    // Store the demo user
    storage.addUser(demoUser);

    // Add some sample posts for the demo user
    storage.addPost({
      id: 1,
      userId: 1,
      content: "Just finished an amazing training session! 🏃‍♂️",
      createdAt: new Date(),
      imageUrl: "https://picsum.photos/seed/training/800/600"
    });

    storage.addPost({
      id: 2,
      userId: 1,
      content: "Working on my technique today. Every detail matters! 💪",
      createdAt: new Date(),
      imageUrl: "https://picsum.photos/seed/technique/800/600"
    });

    // Redirect to home page
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <Card className="w-[600px] mx-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sport">Primary Sport</Label>
              <Select
                value={formData.sport}
                onValueChange={(value) => setFormData({ ...formData, sport: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your primary sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="soccer">Soccer</SelectItem>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="track">Track & Field</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                className="h-24"
              />
            </div>

            <Button type="submit" className="w-full">
              Complete Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
