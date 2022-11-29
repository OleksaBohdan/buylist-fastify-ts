const App = {
  data() {
    return {
      appTitle: 'Menulist:',
      placeholderProduct: 'Product name',
      placeholderProductCount: 'Count',
      productValue: '',
      productCountValue: '',
      products: [
        { productName: 'Banana', productCount: '3', isNotDone: true },
        { productName: 'Tomato', productCount: '1', isNotDone: true },
      ],
    };
  },
  methods: {
    productChangeHadler(e) {
      this.productValue = e.target.value;
    },
    productCountHandler(e) {
      this.productCountValue = e.target.value;
    },
    addProduct(e) {
      const productName = this.productValue;
      const productCount = this.productCountValue;
      this.products.push({ productName: productName, productCount: productCount, isNotDone: true });
      this.productValue = '';
      this.productCountValue = '';
    },
    doneProduct(e) {},
    deleteProducts(e) {
      this.products = [];
    },
  },
};

const app = Vue.createApp(App);

app.mount('#app');
