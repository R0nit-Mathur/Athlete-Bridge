import { FundingCard } from "@/components/layout/funding-card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { storage } from "@/lib/storage";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Funding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
  });
  const { toast } = useToast();

  // Add sample funding requests if none exist
  if (storage.getFundingRequests().length === 0) {
    const demoUser = storage.getUsers()[0];
    if (demoUser) {
      storage.addFundingRequest({
        id: 1,
        userId: demoUser.id,
        title: "Olympic Training Support",
        description: "Help me prepare for the upcoming Olympic trials. Funds will be used for specialized training equipment and coaching.",
        amount: 5000,
        createdAt: new Date(Date.now() - 3600000)
      });

      storage.addFundingRequest({
        id: 2,
        userId: demoUser.id,
        title: "Competition Travel Expenses",
        description: "Support my journey to the national championships. Covering travel, accommodation, and entry fees.",
        amount: 2500,
        createdAt: new Date(Date.now() - 7200000)
      });

      storage.addFundingRequest({
        id: 3,
        userId: demoUser.id,
        title: "New Training Equipment",
        description: "Need to upgrade my training equipment to stay competitive at the international level.",
        amount: 1500,
        createdAt: new Date(Date.now() - 10800000)
      });
    }
  }

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.amount) return;

    setIsSubmitting(true);
    try {
      const user = storage.getUsers()[0];
      if (!user) throw new Error("No user found");

      storage.addFundingRequest({
        id: Date.now(),
        userId: user.id,
        title: formData.title,
        description: formData.description,
        amount: parseInt(formData.amount),
        createdAt: new Date()
      });

      setFormData({ title: "", description: "", amount: "" });
      toast({
        title: "Success",
        description: "Funding request created successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create funding request",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const requests = storage.getFundingRequests();
  const users = storage.getUsers();

  return (
    <div className="container py-6">
      <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Funding Requests</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Funding Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter a title for your request"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what the funds will be used for..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount Needed ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="Enter amount needed"
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleSubmit}
                disabled={!formData.title || !formData.description || !formData.amount || isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Request"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {requests.map((request) => (
          <FundingCard
            key={request.id}
            request={request}
            user={users.find((u) => u.id === request.userId)!}
          />
        ))}
      </div>
    </div>
  );
}