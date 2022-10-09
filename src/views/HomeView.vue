<template>
  <q-page class="bg-grey-3">
    <q-card class="absolute-center" flat>
      <q-card-section>
        <div class="text-h5 text-bold">Bienvenido</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-body2">
          Para iniciar una nueva sesion, haz clic en el boton de abajo.
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <q-btn
          label="Iniciar sesion"
          class="full-width"
          unelevated
          color="green-5"
          @click="startChatSession()"
          :disable="loading"
          :loading="loading"
        />
      </q-card-actions>
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
