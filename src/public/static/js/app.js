const App = {
  data() {
    return {
      counter: 0,
      appTitle: 'Counter',
    };
  },
};

const app = Vue.createApp(App);

app.mount('#app');
