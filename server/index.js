const line = require("@line/bot-sdk");
const express = require("express");
const env = require("dotenv").config().parsed;
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));

const lineConfig = {
  channelAccessToken: env.CHANNEL_ACCESS_TOKEN,
  channelSecret: env.CHANNEL_SECRET,
};

const client = new line.Client(lineConfig);

app.post("/sendmessage", (req, res) => {
  try {
    client
      .pushMessage(env.GROUP_ID, {
        type: "text",
        text: `เครื่องที่ ${req.body.id} อีก 1 นาทีจะเสร็จแล้วลงมารอได้`,
      })
      .then(() => res.status(201).send("Ok"));
  } catch (error) {
    console.log(error);
  }
});

app.post("/webhook", line.middleware(lineConfig), async (req, res) => {
  try {
    const events = req.body.events;
    console.log(events);
    // return events.length > 0
    //   ? await events.map((item) => handleEvent(item))
    //   : res.status(200).send("ok");
  } catch (error) {
    res.status(500).end();
  }
});

// const handleEvent = (event) => {
//   console.log(event);
//   return client.replyMessage(event.replyToken, { type: "text", text: "Hello" });
// };

app.listen(3333, () => console.log("Server is running on port 3333"));
