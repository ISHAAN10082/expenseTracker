import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  ClockIcon,
  CalendarIcon,
  ArrowPathIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

export function Subscriptions() {
  const subscriptions = useQuery(api.subscriptions.getAll);
  const createSubscription = useMutation(api.subscriptions.create);
  const [isAddingSubscription, setIsAddingSubscription] = useState(false);
  const [newSubscription, setNewSubscription] = useState({
    name: "",
    amount: "",
    category: "",
    frequency: "monthly",
    nextCharge: "",
    lastCharge: "",
  });

  if (!subscriptions) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createSubscription({
      name: newSubscription.name,
      amount: parseFloat(newSubscription.amount),
      category: newSubscription.category,
      frequency: newSubscription.frequency,
      nextCharge: new Date(newSubscription.nextCharge).getTime(),
      lastCharge: new Date(newSubscription.lastCharge).getTime(),
    });

    setIsAddingSubscription(false);
    setNewSubscription({
      name: "",
      amount: "",
      category: "",
      frequency: "monthly",
      nextCharge: "",
      lastCharge: "",
    });
  };

  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Subscriptions</h2>
        <button
          onClick={() => setIsAddingSubscription(true)}
          className="flex items-center space-x-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Subscription</span>
        </button>
      </div>

      <div className="rounded-xl bg-white/5 p-6 backdrop-blur-lg">
        <h3 className="text-lg font-medium text-white">Monthly Recurring</h3>
        <div className="mt-2 text-3xl font-bold text-white">
          ${totalMonthly.toLocaleString()}
        </div>
      </div>

      <AnimatePresence>
        {isAddingSubscription && (
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
                    Subscription Name
                  </label>
                  <input
                    type="text"
                    value={newSubscription.name}
                    onChange={(e) =>
                      setNewSubscription({ ...newSubscription, name: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white placeholder-white/40 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter subscription name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={newSubscription.amount}
                    onChange={(e) =>
                      setNewSubscription({ ...newSubscription, amount: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white placeholder-white/40 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newSubscription.category}
                    onChange={(e) =>
                      setNewSubscription({ ...newSubscription, category: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white placeholder-white/40 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter category"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60">
                    Frequency
                  </label>
                  <select
                    value={newSubscription.frequency}
                    onChange={(e) =>
                      setNewSubscription({ ...newSubscription, frequency: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60">
                    Last Charge
                  </label>
                  <input
                    type="date"
                    value={newSubscription.lastCharge}
                    onChange={(e) =>
                      setNewSubscription({ ...newSubscription, lastCharge: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60">
                    Next Charge
                  </label>
                  <input
                    type="date"
                    value={newSubscription.nextCharge}
                    onChange={(e) =>
                      setNewSubscription({ ...newSubscription, nextCharge: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAddingSubscription(false)}
                  className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add Subscription
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subscriptions.map((subscription) => {
          const daysUntilCharge = Math.ceil(
            (subscription.nextCharge - Date.now()) / (1000 * 60 * 60 * 24)
          );

          return (
            <motion.div
              key={subscription._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-white/5 p-6 backdrop-blur-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-500">
                    <CreditCardIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{subscription.name}</h3>
                    <p className="text-sm text-white/60">{subscription.category}</p>
                  </div>
                </div>
                <div className="text-xl font-bold text-white">
                  ${subscription.amount.toLocaleString()}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-white/60">
                  <ArrowPathIcon className="h-4 w-4" />
                  <span>{subscription.frequency}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60">
                  <ClockIcon className="h-4 w-4" />
                  <span>
                    {daysUntilCharge} {daysUntilCharge === 1 ? "day" : "days"} until next charge
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center space-x-2 text-sm text-white/60">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    Last charged on{" "}
                    {new Date(subscription.lastCharge).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
