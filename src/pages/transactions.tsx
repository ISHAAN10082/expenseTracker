import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  CreditCardIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { Id } from "../../convex/_generated/dataModel";

export function Transactions() {
  const transactions = useQuery(api.transactions.getAll);
  const accounts = useQuery(api.accounts.getAll);
  const createTransaction = useMutation(api.transactions.create);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [filter, setFilter] = useState("all");
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "",
    accountId: "",
  });

  if (!transactions || !accounts) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createTransaction({
      description: newTransaction.description,
      amount: parseFloat(newTransaction.amount),
      type: newTransaction.type as "expense" | "income",
      category: newTransaction.category,
      accountId: newTransaction.accountId as Id<"accounts">,
    });

    setIsAddingTransaction(false);
    setNewTransaction({
      description: "",
      amount: "",
      type: "expense",
      category: "",
      accountId: "",
    });
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "income") return t.type === "income";
    if (filter === "expense") return t.type === "expense";
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Transactions</h2>
        <button
          onClick={() => setIsAddingTransaction(true)}
          className="flex items-center space-x-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Transaction</span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-white/5 p-6 backdrop-blur-lg"
        >
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <ArrowTrendingUpIcon className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-white/60">Total Income</p>
              <p className="text-2xl font-bold text-white">
                ${totalIncome.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl bg-white/5 p-6 backdrop-blur-lg"
        >
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <ArrowTrendingDownIcon className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-white/60">Total Expenses</p>
              <p className="text-2xl font-bold text-white">
                ${totalExpenses.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 rounded-lg bg-white/5 p-2">
          <FunnelIcon className="h-5 w-5 text-white/60" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent text-sm text-white focus:outline-none"
          >
            <option value="all">All Transactions</option>
            <option value="income">Income Only</option>
            <option value="expense">Expenses Only</option>
          </select>
        </div>
      </div>

      <AnimatePresence>
        {isAddingTransaction && (
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
                    Description
                  </label>
                  <input
                    type="text"
                    value={newTransaction.description}
                    onChange={(e) =>
                      setNewTransaction({ ...newTransaction, description: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white placeholder-white/40 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter description"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) =>
                      setNewTransaction({ ...newTransaction, amount: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white placeholder-white/40 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60">
                    Type
                  </label>
                  <select
                    value={newTransaction.type}
                    onChange={(e) =>
                      setNewTransaction({ ...newTransaction, type: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newTransaction.category}
                    onChange={(e) =>
                      setNewTransaction({ ...newTransaction, category: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white placeholder-white/40 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter category"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60">
                    Account
                  </label>
                  <select
                    value={newTransaction.accountId}
                    onChange={(e) =>
                      setNewTransaction({ ...newTransaction, accountId: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select an account</option>
                    {accounts.map((account) => (
                      <option key={account._id} value={account._id}>
                        {account.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAddingTransaction(false)}
                  className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <motion.div
            key={transaction._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between rounded-xl bg-white/5 p-6 backdrop-blur-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10">
                <CreditCardIcon className="h-6 w-6 text-indigo-500" />
              </div>
              <div>
                <p className="font-medium text-white">{transaction.description}</p>
                <p className="text-sm text-white/60">{transaction.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-lg font-medium ${
                transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'
              }`}>
                {transaction.type === 'expense' ? '-' : '+'}${transaction.amount.toLocaleString()}
              </p>
              <p className="text-sm text-white/60">
                {new Date(transaction._creationTime).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
