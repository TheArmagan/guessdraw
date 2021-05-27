const app = Vue.createApp({
  data() {
    return {
      chatInput: "",
      chatMessages: []
    }
  },
  mounted() {
    window.__app__ = this;
  },
  methods: {
    onChatInputKeyDown(e) {
      if (e.key != "Enter") return;
      this.chatMessages.push({
        author: "Me",
        type: "Chat",
        message: this.chatInput
      });
      this.chatInput = "";
    }
  }
});
app.mount("#app");