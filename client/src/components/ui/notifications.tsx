import * as React from "react"
import { Bell } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: 1,
      title: "New Follower",
      message: "John Doe started following you",
      read: false,
      timestamp: new Date()
    },
    {
      id: 2,
      title: "Post Liked",
      message: "Your recent post received 10 likes",
      read: false,
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 3,
      title: "New Comment",
      message: "Someone commented on your training video",
      read: true,
      timestamp: new Date(Date.now() - 7200000)
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px]">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have {unreadCount} unread notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`mb-2 cursor-pointer ${!notification.read ? 'bg-muted' : ''}`}
                onClick={() => {
                  setNotifications(notifications.map(n =>
                    n.id === notification.id ? { ...n, read: true } : n
                  ))
                }}
              >
                <div className="flex flex-col gap-1">
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-sm text-muted-foreground">{notification.message}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </CardContent>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
