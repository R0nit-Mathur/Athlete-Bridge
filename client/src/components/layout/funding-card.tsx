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
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar>
            <AvatarImage src={user.avatar || undefined} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{request.title}</h3>
            <p className="text-sm text-muted-foreground">@{user.username} • {user.sport}</p>
          </div>
        </div>
        <p className="text-sm mb-4">{request.description}</p>
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-lg font-semibold">
            Target: ${request.amount.toLocaleString()}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Support Athlete</Button>
      </CardFooter>
    </Card>
  );
}