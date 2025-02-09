import { ReelCard } from "@/components/layout/reel-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
    isYouTube: false,
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
        videoUrl: "https://www.youtube.com/watch?v=824804225",
        thumbnail: null,
        createdAt: new Date(Date.now() - 3600000),
      });

      storage.addReel({
        id: 2,
        userId: demoUser.id,
        title: "Match Highlights",
        videoUrl: "https://www.youtube.com/watch?v=824804225",
        thumbnail: null,
        createdAt: new Date(Date.now() - 7200000),
      });

      storage.addReel({
        id: 3,
        userId: demoUser.id,
        title: "Training Tips",
        videoUrl: "https://www.youtube.com/watch?v=824804225",
        thumbnail: null,
        createdAt: new Date(Date.now() - 10800000),
      });
    }
  }

  const handleSubmit = () => {
    if (!formData.title || !formData.videoUrl) return;

    setIsUploading(true);
    try {
      const user = storage.getUsers()[0];
      if (!user) throw new Error("No user found");

      // If video is from YouTube, we need to embed it
      const finalVideoUrl = formData.isYouTube
        ? `https://www.youtube.com/embed/${formData.videoUrl.split("v=")[1]}`
        : formData.videoUrl;

      storage.addReel({
        id: Date.now(),
        userId: user.id,
        title: formData.title,
        videoUrl: finalVideoUrl,
        thumbnail: null,
        createdAt: new Date(),
      });

      setFormData({ title: "", videoUrl: "", isYouTube: false });
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
    <div className="py-6 flex flex-col items-center w-full min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full max-w-3xl px-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Reels</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600">
              <Plus className="w-5 h-5" />
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
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter a title for your reel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="video">Video URL or Upload</Label>
                <Input
                  id="video"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                  placeholder="Enter a YouTube URL or upload a video"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoUpload">Or Upload Video</Label>
                <Input
                  id="videoUpload"
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setFormData({
                        ...formData,
                        videoUrl: url,
                        isYouTube: false,
                      });
                    }
                  }}
                />
              </div>
              <DialogClose asChild>
                <Button
                  className="w-full bg-blue-500 text-white hover:bg-blue-600 mt-4"
                  onClick={handleSubmit}
                  disabled={
                    !formData.title || !formData.videoUrl || isUploading
                  }
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

      {/* Reels Section with Snap Scrolling */}
      <div className="w-full max-w-3xl px-6 overflow-y-auto snap-y snap-mandatory flex flex-col items-center">
        <div className="space-y-6 w-full">
          {reels.length > 0 ? (
            reels.map((reel) => (
              <div
                key={reel.id}
                className="snap-start w-full h-screen flex justify-center items-center"
              >
                <ReelCard
                  reel={reel}
                  user={users.find((u) => u.id === reel.userId)!}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No reels uploaded yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
