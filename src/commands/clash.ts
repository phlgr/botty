import { Command, Message } from "discord.js";
import fetch from "node-fetch";

type SummonerInfo = {
  type: "OK" | "ERROR";
  clashTeamId: string;
  clashTeamKey: null | string;
};

export default {
  name: "clash",
  description: "WIP",
  async execute(message: Message, args: string[]) {
    const reply = [];

    if (!args[0]) {
      message.channel.send(
        "No summoner name supplied. \nPlease use command like this: `!clash <summoner name>`"
      );
      return;
    }

    const summonerName = args[0];

    const getTeamDetails = async (counter: number): Promise<SummonerInfo> => {
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
        searchResult.type === "OK" &&
        !searchResult.clashTeamKey &&
        counter < 10
      ) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return await getTeamDetails(counter + 1);
      } else {
        return searchResult;
      }
    };

    const searchResult: SummonerInfo = await getTeamDetails(0);

    if (searchResult.type === "ERROR") {
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
