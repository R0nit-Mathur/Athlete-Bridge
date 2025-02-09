import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RightSidebar() {
  // Sample trending topics
  const trendingTopics = [
    { tag: "#Olympics2024", posts: "2.3K" },
    { tag: "#TrainingCamp", posts: "1.8K" },
    { tag: "#TeamSpirit", posts: "1.2K" },
    { tag: "#PersonalBest", posts: "950" }
  ];

  // Sample suggested athletes
  const suggestedAthletes = [
    { name: "Sarah Johnson", username: "sarahj", sport: "Track & Field", avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Sarah" },
    { name: "Michael Chen", username: "mchenathlete", sport: "Swimming", avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Michael" },
    { name: "Lisa Rodriguez", username: "lisarodriguez", sport: "Basketball", avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Lisa" }
  ];

  return (
    <div className="w-[350px] p-4 space-y-6 border-l h-screen bg-background fixed right-auto top-0 overflow-y-auto">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-full bg-muted/50 border focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Trending Section */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl">Trending in Sports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trendingTopics.map((topic) => (
              <div key={topic.tag} className="flex justify-between items-center">
                <span className="font-medium text-blue-600 hover:underline cursor-pointer">
                  {topic.tag}
                </span>
                <span className="text-sm text-muted-foreground">{topic.posts} posts</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggested Athletes */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl">Suggested Athletes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suggestedAthletes.map((athlete) => (
              <div key={athlete.username} className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={athlete.avatar} />
                  <AvatarFallback>{athlete.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{athlete.name}</p>
                  <p className="text-sm text-muted-foreground truncate">@{athlete.username}</p>
                </div>
                <Button variant="outline" size="sm">Follow</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}