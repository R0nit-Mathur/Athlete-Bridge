import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { FundingRequest, User } from "@shared/schema";

interface FundingCardProps {
  request: FundingRequest;
  user: User;
}

export function FundingCard({ request, user }: FundingCardProps) {
  return (
    <Card className="shadow-md rounded-lg border border-gray-200">
      <CardContent className="pt-4 pb-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="border-2 border-white">
            <AvatarImage src={user.avatar || undefined} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              {request.title}
            </h3>
            <p className="text-sm text-gray-600">
              @{user.username} • {user.sport}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-4">{request.description}</p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-lg font-semibold text-gray-800">
            Target: ${request.amount.toLocaleString()}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md">
          Support Athlete
        </Button>
      </CardFooter>
    </Card>
  );
}
