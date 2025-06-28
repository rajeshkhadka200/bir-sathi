import twilio from "twilio";
import token from "../model/tokenModal.js";

export const botHandler = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const tokenDoc = await token.findOne({ createdAt: today });

    const twiml = new twilio.twiml.MessagingResponse();

    if (!tokenDoc) {
      console.error("❌ No tokens found for today");
      twiml.message("⚠️ No tokens found for today.");
      return res.status(404).type("text/xml").send(twiml.toString());
    }

    const { ProfileName = "there", Body = "" } = req.body;
    const msg = Body.toLowerCase().trim();

    const currentlyServing = tokenDoc.currentToken;
    const todaysLimit = tokenDoc.limit;

    // 🌐 Join
    if (msg === "join") {
      twiml.message(
        `🙏 Hello *${ProfileName}*! Welcome to *Bir Sathi* 🤖\n\n` +
          `➡️ Type *status <your token>* to check your token status\n` +
          `➡️ Type *contact* to get hospital contact info`
      );
    }

    // ☎️ Contact
    else if (msg.includes("contact")) {
      twiml.message(
        `☎️ Hospital Contact:\n` +
          `📞 Counter: 9847744334\n` +
          `💊 Pharmacy: 9876735465\n` +
          `🧪 Lab: 9876565645`
      );
    }

    // 🎫 Token Status
    else if (msg.startsWith("status")) {
      const statusMatch = msg.match(/status\s*(\d+)/i);
      const userToken = statusMatch ? parseInt(statusMatch[1]) : null;

      if (!userToken || isNaN(userToken)) {
        twiml.message("⚠️ Please enter your token like: *status 90*");
      } else if (userToken > todaysLimit) {
        twiml.message("⚠️ Token *" + userToken + "* does not exist for today.");
      } else if (userToken < currentlyServing) {
        twiml.message(
          `⚠️ Token *${userToken}* was already served or you may have missed your turn.\n` +
            `🎫 Currently serving: *${currentlyServing}*`
        );
      } else if (userToken === currentlyServing) {
        twiml.message(
          `✅ Token *${userToken}* is now being served. Please proceed to the counter.`
        );
      } else {
        const away = userToken - currentlyServing;
        const waitMinutes = away * 0.5; // 30 seconds per token = 0.5 minutes
        const expectedTime = new Date(Date.now() + waitMinutes * 60 * 1000);

        const options = {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        };
        const formattedTime = expectedTime.toLocaleTimeString("en-US", options);

        twiml.message(
          `🎫 Currently Serving: *${currentlyServing}*\n` +
            `⏳ You’re *${away}* tokens away\n` +
            `⌛ Est. Wait: ~${waitMinutes.toFixed(1)} minutes\n` +
            `🕒 Expected Service Time: *${formattedTime}*`
        );
      }
    }

    // ❓ Unknown Command
    else {
      twiml.message(
        `🤖 Hello ${ProfileName}, please type *join*, *status <token>*, or *contact* for help.`
      );
    }

    res.type("text/xml").send(twiml.toString());
  } catch (err) {
    console.error("❌ Bot Error:", err);
    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message("⚠️ Internal server error. Please try again later.");
    res.type("text/xml").send(twiml.toString());
  }
};
