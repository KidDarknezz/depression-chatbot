<template>
  <q-page>
    <div class="column" style="height: 100vh">
      <div class="col-1 q-pa-sm bg-grey-3">
        <div class="text-h6 text-center text-bold">Conversacion iniciada</div>
      </div>
      <div class="col q-pa-sm">
        <div class="row justify-center">
          <div class="col-xl-3 col-xs-12">
            <q-scroll-area style="height: 82.5vh">
              <q-chat-message
                :bg-color="message.me ? 'primary' : 'amber'"
                :text-color="message.me ? 'white' : 'black'"
                :text="[message.message]"
                :sent="message.me ? true : false"
                v-for="(message, i) in conversationMessages"
                :key="i"
              />
              <q-chat-message bg-color="amber" v-if="loading">
                <q-spinner-dots size="2rem" />
              </q-chat-message>
            </q-scroll-area>
          </div>
        </div>
      </div>
      <div class="col-1 q-pa-sm">
        <div class="row justify-center">
          <div class="col-xl-3 col-xs-12">
            <q-input
              label="Mensaje"
              filled
              v-model="newMessage"
              v-on:keyup.enter="sendMessage()"
              ref="newMessageInput"
            >
              <template v-slot:after>
                <q-btn round dense flat icon="send" @click="sendMessage()" />
              </template>
            </q-input>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import app from "../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(app);

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
      this.loading = true;
      this.$refs.newMessageInput.focus();
      this.conversationMessages.push({
        message: this.newMessage,
        me: true,
      });
      // API CALL
      const sendChat = httpsCallable(functions, "processNewMessage");
      let resp = await sendChat({
        sid: this.$route.params.sessionId,
        message: this.newMessage,
      });
      this.conversationMessages.push({
        message: resp.data,
      });
      // END API CALL
      this.newMessage = "";
      this.loading = false;
    },
  },
};
</script>
