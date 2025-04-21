import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
  args: {
    name: v.string(),
    targetAmount: v.number(),
    currentAmount: v.number(),
    deadline: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("goals", {
      ...args,
      userId,
    });
  },
});

export const getAll = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("goals")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const updateProgress = mutation({
  args: {
    goalId: v.id("goals"),
    currentAmount: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const goal = await ctx.db.get(args.goalId);
    if (!goal) throw new Error("Goal not found");
    if (goal.userId !== userId) throw new Error("Not authorized");

    await ctx.db.patch(args.goalId, {
      currentAmount: args.currentAmount,
    });
  },
});
