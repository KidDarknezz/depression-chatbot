const { firestore } = require("firebase-admin");
const admin = require("firebase-admin");
const functions = require("firebase-functions");

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
  //
  let botResponse = "bot-response";
  //
  // GET CHAT SESSION LOG FROM DB
  let querySession = await admin
    .firestore()
    .collection("chatSessions")
    .doc(data.sid)
    .get();
  // UPDATE CHAT SESSION LOG IN DB WITH MY MESSAGE & BOT RESPONSE
  let log = querySession.data().chatLog;
  log.push({ message: data.message, me: true });
  log.push({ message: botResponse });
  await admin
    .firestore()
    .collection("chatSessions")
    .doc(data.sid)
    .update({ chatLog: log });
  // RETURN RESPONSE
  return botResponse;
});
