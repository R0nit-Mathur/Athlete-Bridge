import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/layout/sidebar";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

import Login from "@/pages/login";
import Home from "@/pages/home";
import Profile from "@/pages/profile";
import Reels from "@/pages/reels";
import Funding from "@/pages/funding";
import Tutorials from "@/pages/tutorials";
import NotFound from "@/pages/not-found";

function PrivateRoute({ component: Component }: { component: React.ComponentType }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        setLocation("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setLocation]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="container mx-auto p-6">
          <Component />
        </div>
      </main>
    </div>
  ) : null;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={() => <PrivateRoute component={Home} />} />
      <Route path="/profile" component={() => <PrivateRoute component={Profile} />} />
      <Route path="/reels" component={() => <PrivateRoute component={Reels} />} />
      <Route path="/funding" component={() => <PrivateRoute component={Funding} />} />
      <Route path="/tutorials" component={() => <PrivateRoute component={Tutorials} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;