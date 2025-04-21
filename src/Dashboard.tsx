import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCardIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { Id } from "../convex/_generated/dataModel";

export function Dashboard() {
  const accounts = useQuery(api.accounts.getAll);
  const transactions = useQuery(api.transactions.getRecent);
  const goals = useQuery(api.goals.getAll);
  const subscriptions = useQuery(api.subscriptions.getAll);
  const analytics = useQuery(api.analytics.getOverview);
  const createTransaction = useMutation(api.transactions.create);

  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: 0,
    type: "expense" as const,
    category: "",
    accountId: "" as Id<"accounts">,
  });

  if (!accounts || !transactions || !goals || !subscriptions || !analytics) {
    return null;
  }

  const handleQuickTransaction = async () => {
    if (!newTransaction.accountId) return;

    await createTransaction({
      description: newTransaction.description,
      amount: newTransaction.amount,
      type: newTransaction.type,
      category: newTransaction.category,
      accountId: newTransaction.accountId,
    });

    setNewTransaction({
      description: "",
      amount: 0,
      type: "expense" as const,
      category: "",
      accountId: "" as Id<"accounts">,
    });
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl bg-white/5 p-6 backdrop-blur-lg"
        >
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <ArrowTrendingUpIcon className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-white/60">Monthly Income</p>
              <p className="text-2xl font-bold text-white">
                ${analytics.monthlyIncome.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl bg-white/5 p-6 backdrop-blur-lg"
        >
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <ArrowTrendingDownIcon className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-white/60">Monthly Expenses</p>
              <p className="text-2xl font-bold text-white">
                ${analytics.monthlyExpenses.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl bg-white/5 p-6 backdrop-blur-lg"
        >
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
              <ChartBarIcon className="h-6 w-6 text-purple-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-white/60">Savings Rate</p>
              <p className="text-2xl font-bold text-white">
                {analytics.monthlyIncome > 0
                  ? Math.round(
                      ((analytics.monthlyIncome - analytics.monthlyExpenses) /
                        analytics.monthlyIncome) *
                        100
                    )
                  : 0}
                %
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-white/5 p-6 backdrop-blur-lg"
        >
          <h3 className="mb-4 text-lg font-medium text-white">Recent Transactions</h3>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="flex items-center justify-between rounded-lg bg-white/5 p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10">
                    <CreditCardIcon className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{transaction.description}</p>
                    <p className="text-sm text-white/60">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-lg font-medium ${
                      transaction.type === "expense"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {transaction.type === "expense" ? "-" : "+"}$
                    {transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-white/60">
                    {new Date(transaction._creationTime).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl bg-white/5 p-6 backdrop-blur-lg"
        >
          <h3 className="mb-4 text-lg font-medium text-white">Upcoming Bills</h3>
          <div className="space-y-4">
            {subscriptions.map((subscription) => (
              <div
                key={subscription._id}
                className="flex items-center justify-between rounded-lg bg-white/5 p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                    <CalendarIcon className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{subscription.name}</p>
                    <p className="text-sm text-white/60">
                      {subscription.frequency} · ${subscription.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/60">Next charge</p>
                  <p className="font-medium text-white">
                    {new Date(subscription.nextCharge).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-white/5 p-6 backdrop-blur-lg"
      >
        <h3 className="mb-4 text-lg font-medium text-white">Quick Transaction</h3>
        <div className="grid gap-4 md:grid-cols-5">
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60">Amount</label>
            <input
              type="number"
              value={newTransaction.amount}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  amount: parseFloat(e.target.value) || 0,
                })
              }
              className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white placeholder-white/40 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60">Type</label>
            <select
              value={newTransaction.type}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  type: e.target.value as "expense" | "income",
                })
              }
              className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60">Category</label>
            <input
              type="text"
              value={newTransaction.category}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, category: e.target.value })
              }
              className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white placeholder-white/40 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter category"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60">Account</label>
            <select
              value={newTransaction.accountId}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  accountId: e.target.value as Id<"accounts">,
                })
              }
              className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white focus:border-indigo-500 focus:ring-indigo-500"
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
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleQuickTransaction}
            disabled={!newTransaction.description || !newTransaction.accountId}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Add Transaction
          </button>
        </div>
      </motion.div>
    </div>
  );
}
