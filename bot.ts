import * as dotenv from "dotenv";
dotenv.config();
import { Client, Message } from "discord.js";
import getW2GLink from "./commands/w2g";
import getClashTeam from "./commands/clash";
import showHelp from "./commands/help";
const client = new Client();

client.on("ready", () => {
  console.log("Bot user online!");
  if (process.env.NODE_ENV === "production") {
    client.user.setActivity("!help");
  } else {
    client.user.setActivity("Dev Mode", { type: "WATCHING" });
  }
});

const prefix = "!";

client.on("message", async (message: Message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();

  if (command === "w2g") {
    getW2GLink(message, args);
  } else if (command === "clash") {
    getClashTeam(message);
  } else if (command === "help") {
    showHelp(message);
  }
});

client.login(process.env.DISCORD_TOKEN);
