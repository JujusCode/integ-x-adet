import React from "react";
import { Navigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "../../store/AuthContext";

export function ProtectedRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();

  // 1. Show a cool cyberpunk loading state while checking the token
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#030304]">
        <div className="animate-pulse flex flex-col items-center gap-4 text-[#F7931A]">
          <ShieldAlert className="w-12 h-12" />
          <p className="font-mono text-sm tracking-widest uppercase">
            Verifying Clearance...
          </p>
        </div>
      </div>
    );
  }

  // 2. The Bouncer: If not logged in, OR not an admin, kick them to login
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // 3. If they pass the checks, render the protected component (the Dashboard)
  return children;
}
