import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { SignOutButton } from "../../SignOutButton";

export function Header() {
  const user = useQuery(api.accounts.getCurrentUser);

  return (
    <header className="border-b border-white/10 bg-gray-900">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-white">Personal Finance</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-white">{user?.name}</div>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
