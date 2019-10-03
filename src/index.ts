import { App } from '@slack/bolt';

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});
if (process.env.DEBUG) {
    app.use((args: any) => {
        console.log(JSON.stringify(args));
        args.next();
    });
}
app.message('hello', ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    say(`Hey there <@${message.user}>\!`);
});
(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
})();

