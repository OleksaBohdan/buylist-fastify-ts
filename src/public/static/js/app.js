const App = {
  data() {
    return {
      appTitle: 'Menulist:',
      placeholderProduct: 'Product name',
      placeholderProductCount: 'Count',
      productValue: '',
      productCountValue: '',
      products: [{ productName: 'Banana', productCount: 3 }],
    };
  },
  methods: {
    productChangeHadler(e) {
      this.productValue = e.target.value;
    },
    productCountHandler(e) {
      this.productCountValue = e.target.value;
    },
  },
};

const app = Vue.createApp(App);

app.mount('#app');
