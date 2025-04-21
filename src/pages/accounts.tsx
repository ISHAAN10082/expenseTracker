import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

export function Accounts() {
  const accounts = useQuery(api.accounts.getAll);
  const createAccount = useMutation(api.accounts.create);
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: "",
    type: "checking",
    balance: "",
    currency: "USD",
  });

  if (!accounts) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createAccount({
      name: newAccount.name,
      type: newAccount.type,
      balance: parseFloat(newAccount.balance),
      currency: newAccount.currency,
    });

    setIsAddingAccount(false);
    setNewAccount({
      name: "",
      type: "checking",
      balance: "",
      currency: "USD",
    });
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Accounts</h2>
        <button
          onClick={() => setIsAddingAccount(true)}
          className="flex items-center space-x-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Account</span>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-white/5 p-6 backdrop-blur-lg"
      >
        <div className="flex items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10">
            <BanknotesIcon className="h-6 w-6 text-indigo-500" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-white/60">Total Balance</p>
            <p className="text-2xl font-bold text-white">
              ${totalBalance.toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isAddingAccount && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="rounded-xl bg-white/5 p-6 backdrop-blur-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-white/60">
                    Account Name
                  </label>
                  <input
                    type="text"
                    value={newAccount.name}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, name: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white placeholder-white/40 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter account name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60">
                    Account Type
                  </label>
                  <select
                    value={newAccount.type}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, type: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="checking">Checking</option>
                    <option value="savings">Savings</option>
                    <option value="credit">Credit Card</option>
                    <option value="investment">Investment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60">
                    Initial Balance
                  </label>
                  <input
                    type="number"
                    value={newAccount.balance}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, balance: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white placeholder-white/40 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60">
                    Currency
                  </label>
                  <select
                    value={newAccount.currency}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, currency: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAddingAccount(false)}
                  className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add Account
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <motion.div
            key={account._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white/5 p-6 backdrop-blur-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10">
                  <BuildingLibraryIcon className="h-6 w-6 text-indigo-500" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{account.name}</h3>
                  <p className="text-sm text-white/60">{account.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-white">
                  {account.currency} ${account.balance.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
