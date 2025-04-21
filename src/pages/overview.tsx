import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion } from "framer-motion";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CreditCardIcon,
  BanknotesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function Overview() {
  const accounts = useQuery(api.accounts.getAll);
  const transactions = useQuery(api.transactions.getRecent);
  const analytics = useQuery(api.analytics.getOverview);
  const goals = useQuery(api.goals.getAll);

  if (!accounts || !transactions || !analytics || !goals) return null;

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const monthlyIncome = analytics.monthlyIncome;
  const monthlyExpenses = analytics.monthlyExpenses;
  const monthlySavings = monthlyIncome - monthlyExpenses;

  const chartData = {
    labels: analytics.spendingTrend.map(d => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: "Spending",
        data: analytics.spendingTrend.map(d => d.amount),
        fill: true,
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.6)",
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.6)",
        },
      },
    },
  };

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
                ${monthlyIncome.toLocaleString()}
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
                ${monthlyExpenses.toLocaleString()}
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
              <p className="text-sm text-white/60">Monthly Savings</p>
              <p className="text-2xl font-bold text-white">
                ${monthlySavings.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl bg-white/5 p-6 backdrop-blur-lg"
        >
          <h3 className="mb-4 text-lg font-medium text-white">Spending Trend</h3>
          <div className="h-[300px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl bg-white/5 p-6 backdrop-blur-lg"
        >
          <h3 className="mb-4 text-lg font-medium text-white">Recent Transactions</h3>
          <div className="space-y-4">
            {transactions.slice(0, 5).map((transaction) => (
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
                <p className={`text-lg font-medium ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                  {transaction.type === 'expense' ? '-' : '+'}${transaction.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-xl bg-white/5 p-6 backdrop-blur-lg"
      >
        <h3 className="mb-4 text-lg font-medium text-white">Financial Goals</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            return (
              <div
                key={goal._id}
                className="rounded-lg bg-white/5 p-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-white">{goal.name}</h4>
                  <p className="text-sm text-white/60">{progress.toFixed(0)}%</p>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-sm text-white/60">
                  <span>${goal.currentAmount.toLocaleString()}</span>
                  <span>${goal.targetAmount.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
