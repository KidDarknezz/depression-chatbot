<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
      <!-- <iframe
        width="350"
        height="430"
        src="https://console.dialogflow.com/api-client/demo/embedded/4c147be0-9218-4ef5-a9e4-5b92fd6b8743"
      >
      </iframe> -->
    </q-page-container>
  </q-layout>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap");

body {
  font-family: "DM Sans", sans-serif;
}
.cb-font {
  font-family: "DM Sans", sans-serif;
}
.cb-regular {
  font-weight: 400 !important;
}
.cb-medium {
  font-weight: 500 !important;
}
.cb-bold {
  font-weight: 700 !important;
}
</style>
