const App = {
  data() {
    return {
      infoHtml: '',
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
    addProduct() {
      if (this.productValue !== '') {
        const socket = io();
        socket.emit('add_product', 'lala');
        socket.on('add_product', (data) => {
          console.log(data);
          if (data === 'ok') {
            const productName = this.productValue;
            const productCount = this.productCountValue;
            this.products.push({ productName: productName, productCount: productCount, isNotDone: true });
            this.productValue = '';
            this.productCountValue = '';
          } else {
            this.infoHtml = `<div class="alert alert-danger" role="alert">${data}</div>`;
          }
        });
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
    deleteProduct(idx) {
      console.log('deleted', idx);
      this.products[idx].splice(0, 1);
      console.log(this.products[idx]);
    },
    toUpperCase(item) {
      return item.toUpperCase();
    },
  },
  computed: {},
  watch: {},
};

const app = Vue.createApp(App);

app.mount('#app');
