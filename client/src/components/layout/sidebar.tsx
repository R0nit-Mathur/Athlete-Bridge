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
    <div className="w-[300px] h-screen bg-background flex flex-col sticky top-0 p-4 border-r border-l border-border">
      {/* Logo */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">Athlete Bridge</h1>
        <NotificationsDropdown />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <Button
              variant={location === item.path ? "default" : "ghost"}
              className={`w-full justify-start gap-4 text-lg py-3 px-4 rounded-full 
                ${location === item.path ? "" : "hover:bg-accent"} 
                transition`}
            >
              <item.icon className="w-6 h-6" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Profile Section */}
      <div className="border-t pt-4 mt-auto flex flex-col gap-3">
        <Link href="/profile">
          <Button
            variant={location === "/profile" ? "default" : "ghost"}
            className="w-full justify-start gap-3 py-3 px-4 rounded-full hover:bg-accent hover:text-primary transition focus:bg-accent"
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={currentUser?.avatar} />
              <AvatarFallback>{currentUser?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="font-medium">{currentUser?.name || "Guest"}</p>
              <p className="text-sm text-muted-foreground">
                @{currentUser?.username || "guest"}
              </p>
            </div>
          </Button>
        </Link>

        {/* Logout */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 py-3 px-4 rounded-full text-red-500 hover:bg-red-100 transition"
        >
          <LogOut className="w-6 h-6" />
          Logout
        </Button>
      </div>
    </div>
  );
}
