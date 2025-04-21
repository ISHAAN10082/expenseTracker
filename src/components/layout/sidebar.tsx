import {
  HomeIcon,
  CreditCardIcon,
  BanknotesIcon,
  FlagIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const navigation = [
    { name: "Dashboard", icon: HomeIcon, id: "dashboard" },
    { name: "Transactions", icon: CreditCardIcon, id: "transactions" },
    { name: "Accounts", icon: BanknotesIcon, id: "accounts" },
    { name: "Goals", icon: FlagIcon, id: "goals" },
    { name: "Subscriptions", icon: ClockIcon, id: "subscriptions" },
  ];

  return (
    <div className="w-64 border-r border-white/10 bg-gray-900 p-4">
      <nav className="space-y-2">
        {navigation.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium ${
              currentPage === item.id
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
