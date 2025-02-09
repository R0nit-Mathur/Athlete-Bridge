import { FundingCard } from "@/components/layout/funding-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { storage } from "@/lib/storage";

export default function Funding() {
  const requests = storage.getFundingRequests();
  const users = storage.getUsers();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Funding Requests</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Request
        </Button>
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
