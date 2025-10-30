import { gameAnalytics } from "../Model/GameActivity.js";

export const gameAnalytics = async (req, res) => {
  try {
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

    // Create the summary array
    const summary = [
      {
        name: "guduRun",
        OverallUsers: guduRun.length,
        percentageIncrease:
          guduRun.length > 0 ? (recentGuduRun.length / guduRun.length) * 100 : 0,
      },
      {
        name: "guduFx",
        OverallUsers: guduFx.length,
        percentageIncrease:
          guduFx.length > 0 ? (recentGuduFx.length / guduFx.length) * 100 : 0,
      },
      {
        name: "guduWarFront",
        OverallUsers: guduWarFront.length,
        percentageIncrease:
          guduWarFront.length > 0 ? (recentGuduWarFront.length / guduWarFront.length) * 100 : 0,
      },
      {
        name: "guduCrash",
        OverallUsers: guduCrash.length,
        percentageIncrease:
          guduCrash.length > 0 ? (recentGuduCrash.length / guduCrash.length) * 100 : 0,
      },
    ];

    return res.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
