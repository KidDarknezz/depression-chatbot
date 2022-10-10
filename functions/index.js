const admin = require("firebase-admin");
const functions = require("firebase-functions");
const dialogflow = require("dialogflow");

const cred = require("./credentials.json");

admin.initializeApp();

exports.startNewChatSession = functions.https.onCall(async (data, context) => {
  let doc = await admin
    .firestore()
    .collection("chatSessions")
    .add({ chatLog: [] });
  return doc.id;
});

exports.processNewMessage = functions.https.onCall(async (data, context) => {
  // SEND MESSAGE TO DIALOGFLOW
  const sid = data.sid;
  const message = data.message;
  const sessionClient = new dialogflow.SessionsClient({
    credentials: cred,
  });
  const sessionPath = sessionClient.sessionPath(
    "project-depression-chatbot",
    sid
  );
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: "es-ES",
      },
    },
  };
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  let botResponse = result.fulfillmentText;
  // GET CHAT SESSION LOG FROM DB
  let querySession = await admin
    .firestore()
    .collection("chatSessions")
    .doc(data.sid)
    .get();
  // UPDATE CHAT SESSION LOG IN DB WITH MY MESSAGE & BOT RESPONSE
  let log = querySession.data().chatLog;
  log.push({ message: message, me: true });
  log.push({ message: botResponse });
  await admin
    .firestore()
    .collection("chatSessions")
    .doc(data.sid)
    .update({ chatLog: log });
  // RETURN RESPONSE
  return botResponse;
});
