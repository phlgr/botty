import { Command, Message } from "discord.js";
import fetch from "node-fetch";

type SummonerInfo = {
  type: "OK" | "ERROR";
  clashTeamId: string;
  clashTeamKey: null | string;
};

export default {
  name: "clash",
  description: "Get information about the persons clash team",
  async execute(message: Message, args: string[]) {
    const reply = [];

    if (!args.length) {
      message.channel.send(
        "No summoner name supplied. \nPlease use command like this: `!clash <summoner name>`"
      );
      return;
    }

    const summonerName = args.join(" ");

    const searchResult: SummonerInfo = await fetch(
      "https://www.lolvvv.com/api/clash",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          platformId: "EUW1",
          summonerName,
        }),
      }
    ).then((response) => response.json());
    console.log(searchResult);

    if (
      searchResult.type === "ERROR" ||
      searchResult.clashTeamId === undefined
    ) {
      reply.push(
        "Either there is a typo in the name or the summoner isn't participating in the current clash!"
      );
      message.channel.send(reply);
      return;
    }

    reply.push(
      `The team was found! You can find more infos here: https://www.lolvvv.com/clash/${searchResult.clashTeamKey}/summary`
    );

    message.channel.send(reply);
  },
} as Command;
