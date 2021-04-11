import * as dotenv from "dotenv";
dotenv.config();
import * as Discord from "discord.js";
import getW2GLink from "./utils/w2g";
const client = new Discord.Client();

client.on("ready", () => console.log("Bot user online!"));

client.on("message", async (message) => {
  if (message.content.startsWith("!w2g")) {
    getW2GLink(message);
  }
});

client.login(process.env.DISCORD_TOKEN);
