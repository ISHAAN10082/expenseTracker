import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
  args: {
    name: v.string(),
    amount: v.number(),
    frequency: v.union(v.literal("monthly"), v.literal("yearly"), v.literal("weekly")),
    category: v.string(),
    nextCharge: v.number(),
    lastCharge: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("subscriptions", {
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
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});
