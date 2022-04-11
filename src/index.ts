import { App, LogLevel } from '@slack/bolt';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  deferInitialization: true,
  logLevel: LogLevel.DEBUG,
});
if (process.env.DEBUG) {
  app.use(async (args: any) => {
    console.log(JSON.stringify(args));
    return await args.next();
  });
}
app.message(/hello/, async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  if (message.subtype === undefined || message.subtype === 'bot_message') {
    await say(`Hey there <@${message.user}>!`);
  }
});

(async () => {
  try {
    await app.init();
    // Start your app
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

