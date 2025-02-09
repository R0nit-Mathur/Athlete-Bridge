import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

    // Store user data
    const mainUser = {
      id: 1,
      uid: "main-user",
      ...formData,
      avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${formData.name}`,
    };

    storage.addUser(mainUser);

    // Redirect to home page
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <Card className="w-full max-w-lg bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-900">
            Complete Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                Full Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="p-3 text-lg border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">
                Username
              </Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
                className="p-3 text-lg border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sport" className="text-gray-700">
                Primary Sport
              </Label>
              <Select
                value={formData.sport}
                onValueChange={(value) =>
                  setFormData({ ...formData, sport: value })
                }
              >
                <SelectTrigger className="p-3 text-lg border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select your primary sport" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-md">
                  <SelectItem value="Track & Field">Track & Field</SelectItem>
                  <SelectItem value="Basketball">Basketball</SelectItem>
                  <SelectItem value="Swimming">Swimming</SelectItem>
                  <SelectItem value="Soccer">Soccer</SelectItem>
                  <SelectItem value="Tennis">Tennis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-700">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell us about yourself..."
                className="h-24 p-3 text-lg border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
            >
              Complete Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
