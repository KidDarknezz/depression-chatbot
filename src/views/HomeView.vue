<template>
  <q-page class="bg-cyan-4">
    <q-card
      flat
      class="absolute-center"
      style="border-radius: 15px; width: 80vw"
    >
      <q-card-section>
        <div class="row justify-center">
          <q-img
            src="https://cdn.technologyadvice.com/wp-content/uploads/2018/02/friendly-chatbot.jpg"
            style="width: 200px"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h5 text-bold text-center">¡Bienvenido!</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-body2 text-center">
          Para iniciar una nueva conversación, haz clic en el botón de abajo.
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <q-btn
          label="Iniciar conversación"
          class="full-width cb-font cb-bold"
          unelevated
          color="cyan-8"
          @click="startChatSession()"
          :disable="loading"
          :loading="loading"
        />
      </q-card-actions>
      <q-card-section>
        <div class="text-caption text-center">
          Tópicos Avanzados I - Asignación 4 <br /><span class="cb-bold"
            >Alejandro Millán</span
          >
        </div>
      </q-card-section>
    </q-card>
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
    };
  },
  methods: {
    async startChatSession() {
      try {
        this.loading = true;
        const startChat = httpsCallable(functions, "startNewChatSession");
        let resp = await startChat();
        this.$router.push(`/chat/${resp.data}`);
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
  },
};
</script>
