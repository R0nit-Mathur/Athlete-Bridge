import { ReelCard } from "@/components/layout/reel-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { storage } from "@/lib/storage";

export default function Reels() {
  const reels = storage.getReels();
  const users = storage.getUsers();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Reels</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Reel
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {reels.map((reel) => (
          <ReelCard
            key={reel.id}
            reel={reel}
            user={users.find((u) => u.id === reel.userId)!}
          />
        ))}
      </div>
    </div>
  );
}
