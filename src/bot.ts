import "dotenv/config";
import fs from "fs";
import Discord, { Message, Command, Client } from "discord.js";

const client: Client = new Discord.Client();
client.commands = new Discord.Collection();
const prefix = "!";

const commandPath =
  process.env.NODE_ENV === "production" ? "dist/commands" : "./commands";
const commandFileType = process.env.NODE_ENV === "production" ? ".js" : ".ts";

const commandFiles = fs
  .readdirSync(commandPath)
  .filter((file) => file.endsWith(commandFileType));

commandFiles.map((commandFile) => {
  import(`./commands/${commandFile}`).then((command) => {
    client.commands.set(command.default.name, command.default);
    console.log(command);
  });
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
    client.commands.get(command).execute(message, args) as Command;
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.login(process.env.DISCORD_TOKEN);
