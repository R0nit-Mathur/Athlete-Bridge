import { ReelCard } from "@/components/layout/reel-card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Upload } from "lucide-react";
import { storage } from "@/lib/storage";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export default function Reels() {
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
  });
  const { toast } = useToast();

  // Add sample reels if none exist
  if (storage.getReels().length === 0) {
    const demoUser = storage.getUsers()[0];
    if (demoUser) {
      storage.addReel({
        id: 1,
        userId: demoUser.id,
        title: "Morning Training Routine",
        videoUrl: "https://player.vimeo.com/video/824804225",
        thumbnail: null,
        createdAt: new Date(Date.now() - 3600000)
      });

      storage.addReel({
        id: 2,
        userId: demoUser.id,
        title: "Match Highlights",
        videoUrl: "https://player.vimeo.com/video/824804225",
        thumbnail: null,
        createdAt: new Date(Date.now() - 7200000)
      });

      storage.addReel({
        id: 3,
        userId: demoUser.id,
        title: "Training Tips",
        videoUrl: "https://player.vimeo.com/video/824804225",
        thumbnail: null,
        createdAt: new Date(Date.now() - 10800000)
      });
    }
  }

  const handleSubmit = () => {
    if (!formData.title || !formData.videoUrl) return;

    setIsUploading(true);
    try {
      const user = storage.getUsers()[0];
      if (!user) throw new Error("No user found");

      storage.addReel({
        id: Date.now(),
        userId: user.id,
        title: formData.title,
        videoUrl: formData.videoUrl,
        thumbnail: null,
        createdAt: new Date()
      });

      setFormData({ title: "", videoUrl: "" });
      toast({
        title: "Success",
        description: "Reel uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload reel",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const reels = storage.getReels();
  const users = storage.getUsers();

  return (
    <div className="ml-72 mr-80 py-6">
      <div className="flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-12 px-6">
          <h1 className="text-2xl font-bold">Reels</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Reel
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload New Reel</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter a title for your reel"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="video">Upload Video</Label>
                  <Input
                    id="video"
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setFormData({ ...formData, videoUrl: url });
                      }
                    }}
                  />
                </div>
                <DialogClose asChild>
                  <Button 
                    className="w-full" 
                    onClick={handleSubmit}
                    disabled={!formData.title || !formData.videoUrl || isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Upload className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Reel
                      </>
                    )}
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col gap-6">
          {reels.map((reel) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              user={users.find((u) => u.id === reel.userId)!}
            />
          ))}
        </div>
      </div>
    </div>
  );
}