import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function Notifications() {
  const notifications = useQuery(api.notifications.list) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Notifications</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className="flex items-center justify-between rounded-xl border border-white/10 p-4"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      notification.type === "alert"
                        ? "bg-red-500/20 text-red-400"
                        : notification.type === "warning"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {notification.type === "alert"
                      ? "!"
                      : notification.type === "warning"
                      ? "⚠"
                      : "✓"}
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {notification.title}
                    </div>
                    <div className="text-sm text-white/60">
                      {notification.message}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={notification.type === "alert" ? "error" : notification.type === "warning" ? "warning" : "success"}>
                    {notification.type}
                  </Badge>
                  <div className="text-sm text-white/60">
                    {new Date(notification.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
