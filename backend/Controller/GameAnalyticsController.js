import { gameAnalytics } from "../Model/GameActivity.js";
import { gamePurchase } from "../Model/GamePurchase.js";

export const gameAnalytics = async (req, res) => {
  try {
    // =========================
    // 1️⃣  GAME ANALYTICS PART
    // =========================
    const allAnalytics = await gameAnalytics.find({});

    // Helper: remove duplicates by name
    const removeDuplicates = (arr) => {
      const unique = new Map();
      arr.forEach((item) => {
        if (!unique.has(item.name)) unique.set(item.name, item);
      });
      return Array.from(unique.values());
    };

    // Filter and deduplicate all data
    const guduRun = removeDuplicates(allAnalytics.filter((a) => a.game === "guduRun"));
    const guduFx = removeDuplicates(allAnalytics.filter((a) => a.game === "guduFx"));
    const guduWarFront = removeDuplicates(allAnalytics.filter((a) => a.game === "guduWarFront"));
    const guduCrash = removeDuplicates(allAnalytics.filter((a) => a.game === "guduCrash"));

    // Get two weeks ago
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    // Fetch only those updated within last 2 weeks
    const recentAnalytics = await gameAnalytics.find({
      updatedAt: { $gte: twoWeeksAgo },
    });

    const recentGuduRun = removeDuplicates(recentAnalytics.filter((a) => a.game === "guduRun"));
    const recentGuduFx = removeDuplicates(recentAnalytics.filter((a) => a.game === "guduFx"));
    const recentGuduWarFront = removeDuplicates(recentAnalytics.filter((a) => a.game === "guduWarFront"));
    const recentGuduCrash = removeDuplicates(recentAnalytics.filter((a) => a.game === "guduCrash"));

    // Summary for analytics
    const analyticsSummary = [
      {
        name: "guduRun",
        OverallUsers: guduRun.length,
        totalActiveUsers:recentGuduRun.length,
        percentageIncrease:
          guduRun.length > 0 ? (recentGuduRun.length / guduRun.length) * 100 : 0,
      },
      {
        name: "guduFx",
        OverallUsers: guduFx.length,
        totalActiveUsers: recentGuduFx.length,
        percentageIncrease:
          guduFx.length > 0 ? (recentGuduFx.length / guduFx.length) * 100 : 0,
      },
      {
        name: "guduWarFront",
        OverallUsers: guduWarFront.length,
        totalActiveUsers: recentGuduWarFront.length,
        percentageIncrease:
          guduWarFront.length > 0 ? (recentGuduWarFront.length / guduWarFront.length) * 100 : 0,
      },
      {
        name: "guduCrash",
        OverallUsers: guduCrash.length,
        totalActiveUsers:recentGuduCrash.length,
        percentageIncrease:
          guduCrash.length > 0 ? (recentGuduCrash.length / guduCrash.length) * 100 : 0,
      },
    ];

    // =========================
    // 2️⃣  GAME PURCHASE PART
    // =========================
    const allPurchases = await gamePurchase.find({});

    // Filter by game (no deduplication)
    const guduRunPurchases = allPurchases.filter((p) => p.game === "guduRun");
    const guduFxPurchases = allPurchases.filter((p) => p.game === "guduFx");
    const guduWarFrontPurchases = allPurchases.filter((p) => p.game === "guduWarFront");
    const guduCrashPurchases = allPurchases.filter((p) => p.game === "guduCrash");

    // Fetch purchases created within last 2 weeks
    const recentPurchases = await gamePurchase.find({
      createdAt: { $gte: twoWeeksAgo },
    });

    const recentGuduRunPurchases = recentPurchases.filter((p) => p.game === "guduRun");
    const recentGuduFxPurchases = recentPurchases.filter((p) => p.game === "guduFx");
    const recentGuduWarFrontPurchases = recentPurchases.filter((p) => p.game === "guduWarFront");
    const recentGuduCrashPurchases = recentPurchases.filter((p) => p.game === "guduCrash");

    // Summary for purchases
    const summary = [
      {
        name: "guduRun",
        totalInGamePurchases: guduRunPurchases.length,
        percentagePurchaseIncrease:
          guduRunPurchases.length > 0
            ? (recentGuduRunPurchases.length / guduRunPurchases.length) * 100
            : 0,
        OverallUsers: guduRun.length,
        totalActiveUsers:recentGuduRun.length,
        percentageActivityIncrease:
          guduRun.length > 0 ? (recentGuduRun.length / guduRun.length) * 100 : 0,
      },
      {
        name: "guduFx",
        totalInGamePurchases: guduFxPurchases.length,
        percentagePurchaseIncrease:
          guduFxPurchases.length > 0
            ? (recentGuduFxPurchases.length / guduFxPurchases.length) * 100
            : 0,
        OverallUsers: guduFx.length,
        totalActiveUsers: recentGuduFx.length,
        percentageActivityIncrease:
          guduFx.length > 0 ? (recentGuduFx.length / guduFx.length) * 100 : 0,
      },
      {
        name: "guduWarFront",
        totalInGamePurchases: guduWarFrontPurchases.length,
        percentagePurchaseIncrease:
          guduWarFrontPurchases.length > 0
            ? (recentGuduWarFrontPurchases.length / guduWarFrontPurchases.length) * 100
            : 0,
        OverallUsers: guduWarFront.length,
        totalActiveUsers: recentGuduWarFront.length,
        percentageActivityIncrease:
          guduWarFront.length > 0 ? (recentGuduWarFront.length / guduWarFront.length) * 100 : 0,
      },
      {
        name: "guduCrash",
        totalInGamePurchases: guduCrashPurchases.length,
        percentagePurchaseIncrease:
          guduCrashPurchases.length > 0
            ? (recentGuduCrashPurchases.length / guduCrashPurchases.length) * 100
            : 0,
        OverallUsers: guduCrash.length,
        totalActiveUsers:recentGuduCrash.length,
        percentageActivityIncrease:
          guduCrash.length > 0 ? (recentGuduCrash.length / guduCrash.length) * 100 : 0,
      },
    ];

    // =========================
    // 3️⃣  FINAL RESPONSE
    // =========================
    return res.json({
      success: true,
      summary
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
