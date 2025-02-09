import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/layout/sidebar";
import { useEffect } from "react";
import { storage } from "@/lib/storage";
import { wsService } from "@/lib/websocket";
import { RightSidebar } from "@/components/layout/right-sidebar";

import Login from "@/pages/login";
import ProfileSetup from "@/pages/profile-setup";
import Home from "@/pages/home";
import Profile from "@/pages/profile";
import Reels from "@/pages/reels";
import Funding from "@/pages/funding";
import Tutorials from "@/pages/tutorials";
import NotFound from "@/pages/not-found";

function PrivateRoute({ component: Component }: { component: React.ComponentType }) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const users = storage.getUsers();
    if (users.length === 0) {
      setLocation("/login");
    }
  }, [setLocation]);

  const users = storage.getUsers();
  if (users.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-center w-full min-h-screen bg-background">
      <div className="flex w-full max-w-7xl mx-auto">
        <Sidebar />
        <main className="w-[600px] min-h-screen border-x border-border">
          <Component />
        </main>
        <RightSidebar />
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/profile-setup" component={ProfileSetup} />
      <Route path="/" component={() => <PrivateRoute component={Home} />} />
      <Route path="/profile" component={() => <PrivateRoute component={Profile} />} />
      <Route path="/reels" component={() => <PrivateRoute component={Reels} />} />
      <Route path="/funding" component={() => <PrivateRoute component={Funding} />} />
      <Route path="/tutorials" component={() => <PrivateRoute component={Tutorials} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  useEffect(() => {
    wsService.connect();
    return () => {
      wsService.removeMessageHandler(() => {});
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}