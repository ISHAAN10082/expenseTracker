import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getOverview = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

    const monthlyTransactions = transactions.filter(
      (t) => t._creationTime >= thirtyDaysAgo
    );

    const monthlyIncome = monthlyTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = monthlyTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    // Generate spending trend data
    const spendingTrend = [];
    for (let i = 0; i < 30; i++) {
      const date = now - i * 24 * 60 * 60 * 1000;
      const dayStart = new Date(date).setHours(0, 0, 0, 0);
      const dayEnd = new Date(date).setHours(23, 59, 59, 999);

      const dayExpenses = transactions
        .filter(
          (t) =>
            t.type === "expense" &&
            t._creationTime >= dayStart &&
            t._creationTime <= dayEnd
        )
        .reduce((sum, t) => sum + t.amount, 0);

      spendingTrend.unshift({
        date,
        amount: dayExpenses,
      });
    }

    return {
      monthlyIncome,
      monthlyExpenses,
      spendingTrend,
    };
  },
});
