import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RightSidebar() {
  // Sample trending topics
  const trendingTopics = [
    { tag: "#Olympics2024", posts: "2.3K" },
    { tag: "#TrainingCamp", posts: "1.8K" },
    { tag: "#TeamSpirit", posts: "1.2K" },
    { tag: "#PersonalBest", posts: "950" },
  ];

  // Sample suggested athletes
  const suggestedAthletes = [
    {
      name: "Sarah Johnson",
      username: "sarahj",
      sport: "Track & Field",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Sarah",
    },
    {
      name: "Michael Chen",
      username: "mchenathlete",
      sport: "Swimming",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Michael",
    },
    {
      name: "Lisa Rodriguez",
      username: "lisarodriguez",
      sport: "Basketball",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Lisa",
    },
  ];

  return (
    <div className="w-[350px] p-4 space-y-6 h-screen bg-background sticky top-0 overflow-y-auto border-l border-r border-border">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Trending Section */}
      <Card className="bg-white rounded-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Trending for you
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trendingTopics.map((topic) => (
              <div
                key={topic.tag}
                className="flex justify-between items-center"
              >
                <span className="font-medium text-gray-900 hover:text-blue-600 hover:underline cursor-pointer">
                  {topic.tag}
                </span>
                <span className="text-sm text-gray-500">
                  {topic.posts} posts
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggested Athletes */}
      <Card className="bg-white rounded-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Who to follow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suggestedAthletes.map((athlete) => (
              <div key={athlete.username} className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={athlete.avatar} />
                  <AvatarFallback>{athlete.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate text-gray-900">
                    {athlete.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    @{athlete.username}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-blue-500 border-blue-500 hover:bg-blue-50"
                >
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
