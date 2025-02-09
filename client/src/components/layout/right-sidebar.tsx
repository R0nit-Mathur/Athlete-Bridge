import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RightSidebar() {
  // Sample trending topics
  const trendingTopics = [
    { tag: "#Basketball", posts: "2.3K" },
    { tag: "#Olympics2024", posts: "1.8K" },
    { tag: "#TrainingTips", posts: "1.2K" },
    { tag: "#Athletics", posts: "950" }
  ];

  // Sample suggested athletes
  const suggestedAthletes = [
    { name: "Sarah Johnson", username: "sarahj", sport: "Track & Field", avatar: "https://i.pravatar.cc/150?u=sarah" },
    { name: "Michael Chen", username: "mchenathlete", sport: "Swimming", avatar: "https://i.pravatar.cc/150?u=michael" },
    { name: "Lisa Rodriguez", username: "lisarodriguez", sport: "Basketball", avatar: "https://i.pravatar.cc/150?u=lisa" }
  ];

  return (
    <div className="w-80 p-4 space-y-6 hidden lg:block">
      {/* Trending Section */}
      <Card>
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
      <Card>
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
                <div className="flex-1">
                  <p className="font-medium">{athlete.name}</p>
                  <p className="text-sm text-muted-foreground">@{athlete.username}</p>
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
