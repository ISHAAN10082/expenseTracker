import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  accounts: defineTable({
    name: v.string(),
    type: v.string(),
    balance: v.number(),
    currency: v.string(),
    userId: v.id("users"),
  }).index("by_user", ["userId"]),

  transactions: defineTable({
    description: v.string(),
    amount: v.number(),
    type: v.union(v.literal("expense"), v.literal("income")),
    category: v.string(),
    accountId: v.id("accounts"),
    userId: v.id("users"),
  })
    .index("by_user", ["userId"])
    .index("by_account", ["accountId"]),

  goals: defineTable({
    name: v.string(),
    targetAmount: v.number(),
    currentAmount: v.number(),
    deadline: v.number(),
    userId: v.id("users"),
  }).index("by_user", ["userId"]),

  subscriptions: defineTable({
    name: v.string(),
    amount: v.number(),
    frequency: v.union(v.literal("monthly"), v.literal("yearly"), v.literal("weekly")),
    category: v.string(),
    nextCharge: v.number(),
    lastCharge: v.number(),
    userId: v.id("users"),
  }).index("by_user", ["userId"]),

  analytics: defineTable({
    userId: v.id("users"),
    monthlyIncome: v.number(),
    monthlyExpenses: v.number(),
    spendingTrend: v.array(
      v.object({
        date: v.number(),
        amount: v.number(),
      })
    ),
  }).index("by_user", ["userId"]),
});
