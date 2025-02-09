import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { storage } from "@/lib/storage";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Tutorials() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    sport: "",
    equipment: false,
  });
  const { toast } = useToast();

  // Add sample tutorials if none exist
  if (storage.getTutorials().length === 0) {
    const demoUser = storage.getUsers()[0];
    if (demoUser) {
      storage.addTutorial({
        id: 1,
        userId: demoUser.id,
        title: "Advanced Sprint Techniques",
        videoUrl: "https://player.vimeo.com/video/824804225",
        sport: "Track & Field",
        equipment: false,
        createdAt: new Date(Date.now() - 3600000)
      });

      storage.addTutorial({
        id: 2,
        userId: demoUser.id,
        title: "Essential Training Equipment Guide",
        videoUrl: "https://player.vimeo.com/video/824804225",
        sport: "Athletics",
        equipment: true,
        createdAt: new Date(Date.now() - 7200000)
      });

      storage.addTutorial({
        id: 3,
        userId: demoUser.id,
        title: "Pre-Competition Warm-up Routine",
        videoUrl: "https://player.vimeo.com/video/824804225",
        sport: "Track & Field",
        equipment: false,
        createdAt: new Date(Date.now() - 10800000)
      });
    }
  }

  const handleSubmit = () => {
    if (!formData.title || !formData.videoUrl || !formData.sport) return;

    setIsSubmitting(true);
    try {
      const user = storage.getUsers()[0];
      if (!user) throw new Error("No user found");

      storage.addTutorial({
        id: Date.now(),
        userId: user.id,
        title: formData.title,
        videoUrl: formData.videoUrl,
        sport: formData.sport,
        equipment: formData.equipment,
        createdAt: new Date()
      });

      setFormData({ title: "", videoUrl: "", sport: "", equipment: false });
      toast({
        title: "Success",
        description: "Tutorial added successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add tutorial",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const tutorials = storage.getTutorials();
  const users = storage.getUsers();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Tutorials & Equipment</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Tutorial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Tutorial</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter tutorial title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="video">Video URL</Label>
                <Input
                  id="video"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="Enter video URL (e.g., Vimeo, YouTube)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sport">Sport</Label>
                <Select
                  value={formData.sport}
                  onValueChange={(value) => setFormData({ ...formData, sport: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sport category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Track & Field">Track & Field</SelectItem>
                    <SelectItem value="Basketball">Basketball</SelectItem>
                    <SelectItem value="Football">Football</SelectItem>
                    <SelectItem value="Soccer">Soccer</SelectItem>
                    <SelectItem value="Tennis">Tennis</SelectItem>
                    <SelectItem value="Swimming">Swimming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="equipment"
                  checked={formData.equipment}
                  onChange={(e) => setFormData({ ...formData, equipment: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="equipment">This is an equipment guide</Label>
              </div>
              <Button 
                className="w-full" 
                onClick={handleSubmit}
                disabled={!formData.title || !formData.videoUrl || !formData.sport || isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Tutorial"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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