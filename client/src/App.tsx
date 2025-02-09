import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/layout/sidebar";

import Login from "@/pages/login";
import Home from "@/pages/home";
import Profile from "@/pages/profile";
import Reels from "@/pages/reels";
import Funding from "@/pages/funding";
import Tutorials from "@/pages/tutorials";
import NotFound from "@/pages/not-found";

function PrivateRoute({ component: Component }: { component: React.ComponentType }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 p-6">
        <Component />
      </div>
    </div>
  );
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