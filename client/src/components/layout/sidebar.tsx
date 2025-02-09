import { Link, useLocation } from "wouter";
import { Home, Film, DollarSign, BookOpen, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationsDropdown } from "@/components/ui/notifications";

export function Sidebar() {
  const [location] = useLocation();

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Film, label: "Reels", path: "/reels" },
    { icon: DollarSign, label: "Funding", path: "/funding" },
    { icon: BookOpen, label: "Tutorials", path: "/tutorials" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="w-64 h-screen border-r bg-background p-4 fixed">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Athlete Bridge
          </h1>
          <NotificationsDropdown />
        </div>

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
    </div>
  );
}