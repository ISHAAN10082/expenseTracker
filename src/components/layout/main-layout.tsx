import { useState } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Dashboard } from "../../Dashboard";
import { Transactions } from "../../pages/transactions";
import { Accounts } from "../../pages/accounts";
import { Goals } from "../../pages/goals";
import { Subscriptions } from "../../pages/subscriptions";

export function MainLayout() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "transactions":
        return <Transactions />;
      case "accounts":
        return <Accounts />;
      case "goals":
        return <Goals />;
      case "subscriptions":
        return <Subscriptions />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 p-8">{renderPage()}</main>
      </div>
    </div>
  );
}
