import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { storage } from "@/lib/storage";
import { Textarea } from "@/components/ui/textarea";

const SAMPLE_USERS = [
  {
    name: "Emily Chen",
    username: "emilychen_track",
    sport: "Track & Field",
    bio: "Olympic hopeful 🏃‍♀️ | 400m specialist",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Emily"
  },
  {
    name: "Marcus Johnson",
    username: "mjhoops",
    sport: "Basketball",
    bio: "College athlete 🏀 | Point guard | Living my dream",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Marcus"
  },
  {
    name: "Sofia Rodriguez",
    username: "sofia_swim",
    sport: "Swimming",
    bio: "National champion 🏊‍♀️ | Butterfly specialist",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Sofia"
  },
  {
    name: "Alex Thompson",
    username: "alexthompson",
    sport: "Soccer",
    bio: "Professional soccer player ⚽ | Midfielder",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Alex"
  },
  {
    name: "James Wilson",
    username: "jwilson_tennis",
    sport: "Tennis",
    bio: "Rising tennis star 🎾 | ATP Tour",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=James"
  }
];

const SAMPLE_POSTS = [
  "Just finished a killer training session! 💪 #NoExcuses",
  "New personal best today! Hard work pays off 🏆",
  "Beautiful morning for practice ☀️ #RiseAndGrind",
  "Competition prep mode: Activated 🎯",
  "Recovery day is just as important as training day 🧘‍♂️",
  "Team bonding session was amazing! 🤝",
  "Working on new techniques today 📈",
  "Pre-competition nerves kicking in! 😅",
  "Thanks to my amazing coaches and teammates! 🙏",
  "Back to basics - sometimes you need to reset 🔄"
];

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

    // Create the main user
    const mainUser = {
      id: 1,
      uid: "main-user",
      name: formData.name,
      username: formData.username,
      sport: formData.sport,
      bio: formData.bio,
      avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${formData.name}`,
    };

    // Add the main user and sample users
    storage.addUser(mainUser);

    // Add sample users starting from ID 2
    SAMPLE_USERS.forEach((user, index) => {
      storage.addUser({
        id: index + 2,
        uid: `sample-user-${index}`,
        ...user,
      });
    });

    // Generate sample posts from all users
    const allUsers = [mainUser, ...SAMPLE_USERS.map((user, index) => ({ ...user, id: index + 2 }))];

    allUsers.forEach(user => {
      // Generate 5-6 posts per user
      for (let i = 0; i < Math.floor(Math.random() * 2) + 5; i++) {
        const hasImage = Math.random() > 0.5;
        storage.addPost({
          id: Date.now() + Math.random(),
          userId: user.id,
          content: SAMPLE_POSTS[Math.floor(Math.random() * SAMPLE_POSTS.length)],
          imageUrl: hasImage ? `https://picsum.photos/seed/${user.username}-${i}/800/600` : null,
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random time within last week
        });
      }
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
                  <SelectItem value="Track & Field">Track & Field</SelectItem>
                  <SelectItem value="Basketball">Basketball</SelectItem>
                  <SelectItem value="Swimming">Swimming</SelectItem>
                  <SelectItem value="Soccer">Soccer</SelectItem>
                  <SelectItem value="Tennis">Tennis</SelectItem>
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