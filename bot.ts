import * as dotenv from "dotenv";
dotenv.config();
import * as fs from "fs";
import * as Discord from "discord.js";
import { Message } from "discord.js";

const client: Discord.Client = new Discord.Client();
client.commands = new Discord.Collection();
const prefix = "!";

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".ts"));

commandFiles.map((commandFile) => {
  import(`./commands/${commandFile}`).then((command) =>
    client.commands.set(command.default.name, command.default)
  );
});

client.on("ready", () => {
  console.log("Bot user online!");
  if (process.env.NODE_ENV === "production") {
    client.user.setActivity("!help");
  } else {
    client.user.setActivity("Dev Mode", { type: "WATCHING" });
  }
});

client.on("message", async (message: Message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) {
    return;
  }

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.login(process.env.DISCORD_TOKEN);
