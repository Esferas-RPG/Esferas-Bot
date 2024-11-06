import "reflect-metadata";
import { dirname, importx } from "@discordx/importer";
import type { Interaction, Message } from "discord.js";
import { IntentsBitField } from "discord.js";
import { Client, DIService } from "discordx";
import "dotenv/config";


export const bot = new Client({

  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
  ],

  silent: false,

  simpleCommand: {
    prefix: "!",
  },
});

bot.once("ready", async () => {

  await bot.guilds.fetch();

  await bot.initApplicationCommands()
//   await bot.clearApplicationCommands()
//   await bot.clearApplicationCommands(...bot.guilds.cache.map((g) => g.id))

  console.log("Bot started");

});

bot.on("interactionCreate", (interaction: Interaction) => {
  bot.executeInteraction(interaction);
});

bot.on("messageCreate", async (message: Message) => {
  await bot.executeCommand(message);
});

async function run() {

  await importx(`${dirname(import.meta.url)}/{events,commands,services}/**/*.{ts,js}`);

  if (!process.env.BOT_TOKEN) {
    throw Error("Could not find BOT_TOKEN in your environment");
  }

  await bot.login(process.env.BOT_TOKEN);
}

void run();
