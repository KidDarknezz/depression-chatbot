<template>
  <q-page class="bg-grey-3">
    <div class="row justify-center">
      <div class="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12">
        <div class="column cb-font bg-white" style="height: 100vh">
          <div class="col-1 q-pa-sm bg-cyan-8 text-white">
            <div class="row items-center" style="height: 100%">
              <div class="col-3">
                <q-btn
                  icon="arrow_back"
                  flat
                  rounded
                  to="/"
                  label="Volver"
                  no-caps
                />
              </div>
              <div class="col-9">
                <div class="text-h6 text-left text-bold">
                  Conversación iniciada
                </div>
              </div>
            </div>
          </div>
          <div class="col q-pa-sm">
            <div class="row justify-center">
              <div class="col-12">
                <div
                  class="q-px-sm"
                  style="height: 82.5vh; overflow-y: scroll"
                  id="chatDiv"
                >
                  <q-chat-message
                    :bg-color="message.me ? 'grey-3' : 'cyan-5'"
                    :text-color="message.me ? 'black' : 'white'"
                    :text="[message.message]"
                    :sent="message.me ? true : false"
                    v-for="(message, i) in conversationMessages"
                    :key="i"
                  />
                  <q-chat-message bg-color="cyan-5" v-if="loading">
                    <q-spinner-dots size="2rem" color="white" />
                  </q-chat-message>
                </div>
              </div>
            </div>
          </div>
          <div class="col-1 q-pa-sm">
            <div class="row justify-center">
              <div class="col-12">
                <q-input
                  label="Mensaje"
                  filled
                  v-model="newMessage"
                  v-on:keyup.enter="sendMessage()"
                  ref="newMessageInput"
                  color="cyan-5"
                >
                  <template v-slot:after>
                    <q-btn
                      round
                      dense
                      flat
                      icon="send"
                      @click="sendMessage()"
                      :color="newMessage.trim() ? 'cyan-5' : ''"
                    />
                  </template>
                </q-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import app from "../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const functions = getFunctions(app);
const db = getFirestore(app);

export default {
  data() {
    return {
      loading: false,
      newMessage: "",
      conversationMessages: [],
    };
  },
  methods: {
    async sendMessage() {
      var objDiv = document.getElementById("chatDiv");
      objDiv.scrollTop = objDiv.scrollHeight;
      if (!this.newMessage.trim()) return;
      let msg = this.newMessage;
      this.loading = true;
      this.$refs.newMessageInput.focus();
      this.conversationMessages.push({
        message: this.newMessage,
        me: true,
      });
      this.newMessage = "";
      // API CALL
      const sendChat = httpsCallable(functions, "processNewMessage");
      let resp = await sendChat({
        sid: this.$route.params.sessionId,
        message: msg,
      });
      this.conversationMessages.push({
        message: resp.data,
      });
      // END API CALL
      this.loading = false;
      objDiv.scrollTop = objDiv.scrollHeight;
    },
  },
  async mounted() {
    let docRef = doc(db, "chatSessions", this.$route.params.sessionId);
    const docSnap = await getDoc(docRef);
    if (docSnap._document) this.conversationMessages = docSnap.data().chatLog;
  },
};
// LONG CONVERSATION: /chat/rQD0BZ9jVvdlQPpqx7X8
</script>
