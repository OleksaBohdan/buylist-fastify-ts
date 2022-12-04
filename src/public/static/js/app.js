const App = {
  data() {
    return {
      appTitle: 'Buylist:',
      placeholderProduct: 'Product name',
      placeholderProductCount: 'Count',
      productValue: '',
      productCountValue: '',
      products: [
        { productName: 'Banana', productCount: '3', isNotDone: true },
        { productName: 'Tomato', productCount: '1', isNotDone: true },
        { productName: 'Orange', isNotDone: true },
      ],
    };
  },
  methods: {
    // productChangeHadler(e) {
    //   this.productValue = e.target.value;
    // },
    productCountHandler(e) {
      this.productCountValue = e.target.value;
    },
    addProduct(e) {
      if (this.productValue !== '') {
        const productName = this.productValue;
        const productCount = this.productCountValue;
        this.products.push({ productName: productName, productCount: productCount, isNotDone: true });
        this.productValue = '';
        this.productCountValue = '';
      }
    },
    doneProduct(idx) {
      if (this.products[idx].isNotDone == true) {
        this.products[idx].isNotDone = false;
      } else {
        this.products[idx].isNotDone = true;
      }
    },
    deleteProducts(e) {
      this.products = [];
    },
    toUpperCase(item) {
      return item.toUpperCase();
    },
  },
  computed: {},
  watch: {
    productValue(value) {
      console.log(value);
    },
  },
};

const app = Vue.createApp(App);

app.mount('#app');
