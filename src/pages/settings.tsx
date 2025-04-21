import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";

export function Settings() {
  const [settings, setSettings] = useState({
    currency: "USD",
    theme: "dark",
    notifications: true,
    language: "en",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
      </div>

      <form onSubmit={handleSave}>
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/60">Default Currency</label>
                <Select
                  value={settings.currency}
                  onChange={(e) =>
                    setSettings({ ...settings, currency: e.target.value })
                  }
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                </Select>
              </div>
              <div>
                <label className="text-sm text-white/60">Theme</label>
                <Select
                  value={settings.theme}
                  onChange={(e) =>
                    setSettings({ ...settings, theme: e.target.value })
                  }
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </Select>
              </div>
              <div>
                <label className="text-sm text-white/60">Language</label>
                <Select
                  value={settings.language}
                  onChange={(e) =>
                    setSettings({ ...settings, language: e.target.value })
                  }
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-500"
                />
                <label className="text-sm text-white/60">
                  Enable Notifications
                </label>
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit">Save Settings</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
