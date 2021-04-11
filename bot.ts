import * as dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";
import * as Discord from "discord.js";
const client = new Discord.Client();

client.on("ready", () => console.log("Bot user online!"));

client.on("message", async (message) => {
  if (message.content.startsWith("!w2g")) {
    if (!message.content.split(" ")[1]) {
      message.channel.send("Please supply a link to a video! \n `!w2g [link]`");
    } else {
      const videoLink = message.content.split(" ")[1];
      if (
        (!videoLink.startsWith("https://www.youtube") &&
          !videoLink.startsWith("https://www.youtu.be")) ||
        !videoLink.includes("/watch?v=")
      ) {
        message.channel.send(
          "At the moment this Bot only supports valid YouTube Links."
        );
      } else {
        const w2gRoomLink = await fetch("https://w2g.tv/rooms/create.json", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            w2g_api_key: process.env.W2G_API_KEY,
            share: videoLink,
            bg_color: "#363636",
            bg_opacity: "100",
          }),
        })
          .then((response) => response.json())
          .then((response) => response.streamkey);

        message.channel.send(
          `Here is your W2G Room: \n https://w2g.tv/rooms/${w2gRoomLink}`
        );
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
