const config = require("./utils/config.js");
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  console.log(message.content);
});

client.login(config.DISCORD_TOKEN);

const sendUpdate = (newMatch) => {
  console.log(newMatch);
  const canal = client.channels.cache.get(process.env.CHANNEL_ID);
  console.log("Canal: ", canal);
  let message = "";
  if (newMatch.thirdSet[0] !== 0 || newMatch.thirdSet[1] !== 0) {
    message = `¡Resultado del Partido! 🎉\n\nFecha: ${newMatch.date}\n\nResultado:\n🎾 Set 1: ${newMatch.firstSet[0]} - ${newMatch.firstSet[1]}\n🎾 Set 2: ${newMatch.secondSet[0]} - ${newMatch.secondSet[1]}\n🎾 Set 3: ${newMatch.thirdSet[0]} - ${newMatch.thirdSet[1]}\n\nParejas:\n👫 ${newMatch.coupleOne[0]} & ${newMatch.coupleOne[1]}\n👫 ${newMatch.coupleTwo[0]} & ${newMatch.coupleTwo[1]}`;
  } else {
    message = `¡Resultado del Partido! 🎉\n\nFecha: ${newMatch.date}\n\nResultado:\n🎾 Set 1: ${newMatch.firstSet[0]} - ${newMatch.firstSet[1]}\n🎾 Set 2: ${newMatch.secondSet[0]} - ${newMatch.secondSet[1]}\n\nParejas:\n👫 ${newMatch.coupleOne[0]} & ${newMatch.coupleOne[1]}\n👫 ${newMatch.coupleTwo[0]} & ${newMatch.coupleTwo[1]}`;
  }
  if (canal) {
    canal
      .send(message)
      .then(console.log)
      .catch((error) => console.error("Error al enviar el mensaje:", error));
  } else {
    console.error("No existe ese canal");
  }
};

module.exports = sendUpdate;
