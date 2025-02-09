import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Reel, User } from "@shared/schema";

interface ReelCardProps {
  reel: Reel;
  user: User;
}

export function ReelCard({ reel, user }: ReelCardProps) {
  return (
    <Card className="w-[400px] overflow-hidden rounded-lg shadow-lg border border-gray-300">
      <CardContent className="p-0 relative">
        <div className="aspect-[9/16] bg-black relative">
          {/* Video without controls */}
          <video
            src={reel.videoUrl}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-white">
              <AvatarImage src={user.avatar || undefined} />
              <AvatarFallback className="text-white">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-white text-sm">{reel.title}</h3>
              <p className="text-xs text-gray-300">@{user.username}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
