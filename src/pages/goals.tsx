import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  FlagIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

export function Goals() {
  const goals = useQuery(api.goals.getAll);
  const createGoal = useMutation(api.goals.create);
  const updateProgress = useMutation(api.goals.updateProgress);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
  });

  if (!goals) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createGoal({
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: parseFloat(newGoal.currentAmount),
      deadline: new Date(newGoal.deadline).getTime(),
    });

    setIsAddingGoal(false);
    setNewGoal({
      name: "",
      targetAmount: "",
      currentAmount: "",
      deadline: "",
    });
  };

  const handleUpdateProgress = async (goalId: string, newAmount: number) => {
    await updateProgress({
      goalId,
      currentAmount: newAmount,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Financial Goals</h2>
        <button
          onClick={() => setIsAddingGoal(true)}
          className="flex items-center space-x-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Goal</span>
        </button>
      </div>

      <AnimatePresence>
        {isAddingGoal && (
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
                    Goal Name
                  </label>
                  <input
                    type="text"
                    value={newGoal.name}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, name: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white placeholder-white/40 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter goal name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60">
                    Target Amount
                  </label>
                  <input
                    type="number"
                    value={newGoal.targetAmount}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, targetAmount: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white placeholder-white/40 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60">
                    Current Amount
                  </label>
                  <input
                    type="number"
                    value={newGoal.currentAmount}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, currentAmount: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white placeholder-white/40 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60">
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, deadline: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/5 text-white placeholder-white/40 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAddingGoal(false)}
                  className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <motion.div
            key={goal._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white/5 p-6 backdrop-blur-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10">
                  <FlagIcon className="h-6 w-6 text-indigo-500" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{goal.name}</h3>
                  <p className="text-sm text-white/60">
                    Due {new Date(goal.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>Progress</span>
                <span>
                  ${goal.currentAmount.toLocaleString()} of $
                  {goal.targetAmount.toLocaleString()}
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-indigo-500"
                  style={{
                    width: `${Math.min(
                      100,
                      (goal.currentAmount / goal.targetAmount) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() =>
                  handleUpdateProgress(
                    goal._id,
                    goal.currentAmount + goal.targetAmount * 0.1
                  )
                }
                className="flex items-center space-x-2 rounded-lg bg-white/5 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10"
              >
                <ArrowUpIcon className="h-4 w-4" />
                <span>Add Progress</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
