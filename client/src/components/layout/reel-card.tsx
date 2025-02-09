import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Reel, User } from "@shared/schema";

interface ReelCardProps {
  reel: Reel;
  user: User;
}

export function ReelCard({ reel, user }: ReelCardProps) {
  return (
    <Card className="w-72">
      <CardContent className="p-0 relative">
        <div className="aspect-[9/16] bg-muted rounded-t-lg relative">
          <video
            src={reel.videoUrl}
            className="w-full h-full object-cover rounded-t-lg"
            controls
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.avatar || undefined} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">{reel.title}</h3>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}