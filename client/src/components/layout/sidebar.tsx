import { Link, useLocation } from "wouter";
import { Home, Film, DollarSign, BookOpen, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationsDropdown } from "@/components/ui/notifications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { storage } from "@/lib/storage";

export function Sidebar() {
  const [location] = useLocation();
  const currentUser = storage.getUserById(1);

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Film, label: "Reels", path: "/reels" },
    { icon: DollarSign, label: "Funding", path: "/funding" },
    { icon: BookOpen, label: "Tutorials", path: "/tutorials" },
  ];

  return (
    <div className="w-[275px] h-screen bg-background flex flex-col sticky top-0">
      {/* Header with logo and notifications */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Athlete Bridge
          </h1>
          <NotificationsDropdown />
        </div>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <Button
                variant={location === item.path ? "default" : "ghost"}
                className="w-full justify-start gap-2"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </nav>

      {/* Profile section at bottom */}
      <div className="p-4 border-t mt-auto">
        <Link href="/profile">
          <Button
            variant={location === "/profile" ? "default" : "ghost"}
            className="w-full justify-start gap-3"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={currentUser?.avatar} />
              <AvatarFallback>{currentUser?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <p className="font-medium line-clamp-1">{currentUser?.name || 'Guest'}</p>
              <p className="text-sm text-muted-foreground">@{currentUser?.username || 'guest'}</p>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
}