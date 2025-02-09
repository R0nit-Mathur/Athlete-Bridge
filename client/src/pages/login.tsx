import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiGoogle } from "react-icons/si";
import { useLocation } from "wouter";
import { useState } from "react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate loading for a better UX
    setTimeout(() => {
      setLocation("/profile-setup");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
            Athlete Bridge
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-600 text-lg">
            Connect with athletes, share your journey, and find support.
          </p>
          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all"
          >
            <SiGoogle className="w-5 h-5" />
            {isLoading ? (
              <span className="animate-pulse" aria-live="polite">
                Signing in...
              </span>
            ) : (
              "Sign in with Google"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
