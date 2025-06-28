import token from "../model/tokenModal.js";
// Utility to get today's date in YYYY-MM-DD format
const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

export const increaseToken = async (req, res) => {
  try {
    const today = getToday();
    console.log("Today's date:", today);

    // Find today's token doc
    let tokenDoc = await token.findOne({ createdAt: today });

    if (!tokenDoc) {
      // If not exists, create a new doc for today
      tokenDoc = await token.create({
        currentToken: 1,
        limit: 100, // or any default limit
        createdAt: today,
      });
    } else {
      // Increment currentToken
      if (tokenDoc.currentToken < tokenDoc.limit) {
        tokenDoc.currentToken += 1;
        await tokenDoc.save();
      } else {
        return res.status(400).json({ error: "Token limit reached" });
      }
    }

    res.status(200).json({
      message: "Token increased",
      date: tokenDoc.createdAt,
      currentToken: tokenDoc.currentToken,
      limit: tokenDoc.limit,
    });
  } catch (error) {
    console.error("Error increasing patient token:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// fetch the currrent  serving patient token

export const currentPatient = async (req, res) => {
  console.log("Fetching current patient token...");
  try {
    const today = getToday();
    console.log("Today's date:", today);

    // Find today's token doc
    const tokenDoc = await token.findOne({ createdAt: today });

    if (!tokenDoc) {
      return res.status(404).json({ error: "No tokens found for today" });
    }

    res.status(200).json({
      message: "Current patient token fetched",
      currentToken: tokenDoc.currentToken,
      limit: tokenDoc.limit,
      date: tokenDoc.createdAt,
    });
  } catch (error) {
    console.error("Error fetching current patient token:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const setLimit = async (req, res) => {
  try {
    console.log("Setting limit for today's token...");

    const { limit } = req.body;
    if (!limit || isNaN(limit) || parseInt(limit) <= 0) {
      return res.status(400).json({ error: "Invalid limit value" });
    }

    const today = getToday();
    console.log("Today's date for setting limit:", today);

    // Find today's token doc
    let tokenDoc = await token.findOne({ createdAt: today });

    if (!tokenDoc) {
      // If not exists, create a new doc for today
      tokenDoc = await token.create({
        currentToken: 1,
        limit: parseInt(limit),
        createdAt: today,
      });
    } else {
      // Update the limit
      tokenDoc.limit = parseInt(limit);
      await tokenDoc.save();
    }

    res.status(200).json({
      message: "Limit set successfully",
      currentToken: tokenDoc.currentToken,
      limit: tokenDoc.limit,
      date: tokenDoc.createdAt,
    });
  } catch (error) {
    console.error("Error setting limit:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
