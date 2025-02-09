import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { storage } from "@/lib/storage";

export default function Tutorials() {
  const tutorials = storage.getTutorials();
  const users = storage.getUsers();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Tutorials & Equipment</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Tutorial
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => {
          const user = users.find((u) => u.id === tutorial.userId)!;
          return (
            <Card key={tutorial.id}>
              <CardContent className="p-0">
                <div className="aspect-video bg-muted">
                  <iframe
                    src={tutorial.videoUrl}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{tutorial.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    by {user.name} • {tutorial.sport}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
