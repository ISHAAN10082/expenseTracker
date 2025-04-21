import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
  args: {
    description: v.string(),
    amount: v.number(),
    type: v.union(v.literal("expense"), v.literal("income")),
    category: v.string(),
    accountId: v.id("accounts"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const account = await ctx.db.get(args.accountId);
    if (!account) throw new Error("Account not found");
    if (account.userId !== userId) throw new Error("Not authorized");

    // Update account balance
    const balanceChange = args.type === "expense" ? -args.amount : args.amount;
    await ctx.db.patch(args.accountId, {
      balance: account.balance + balanceChange,
    });

    return await ctx.db.insert("transactions", {
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
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const getRecent = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(10);
  },
});
