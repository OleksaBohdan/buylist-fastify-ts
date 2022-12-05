const App = {
  data() {
    return {
      infoHtml: '',
      appTitle: 'Buylist:',
      placeholderProduct: 'Product name',
      placeholderProductCount: 'Count',
      productValue: '',
      productCountValue: '',
      products: [],
      isAuthorized: false,
    };
  },
  methods: {
    addProduct() {
      if (this.productValue !== '') {
        const socket = io();
        socket.emit('add_product', {
          productName: this.productValue,
          productCount: this.productCountValue,
          isNotDone: true,
        });
        socket.on('add_product', (data) => {
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
      const socket = io();
      if (this.products[idx].isNotDone == true) {
        socket.emit('done_products', { productName: this.products[idx].productName, isNotDone: false });
      } else {
        socket.emit('done_products', { productName: this.products[idx].productName, isNotDone: true });
      }

      socket.on('done_products', (data) => {
        if (data != true && data != false) {
          this.infoHtml = `<div class="alert alert-danger" role="alert">${data}</div>`;
        } else {
          this.products[idx].isNotDone = data;
        }
      });
    },
    deleteProducts(e) {
      const socket = io();
      socket.emit('delete_products', 'deleteAll');

      socket.on('delete_products', (data) => {
        if (data == 'ok') {
          this.products = [];
        } else {
          this.infoHtml = `<div class="alert alert-danger" role="alert">${data}</div>`;
        }
      });
    },
    deleteProduct(idx) {
      const socket = io();
      socket.emit('delete_product', { productName: this.products[idx].productName });
      socket.on('delete_product', (data) => {
        if (data == 'ok') {
          this.products.splice(idx, 1);
        } else {
          this.infoHtml = `<div class="alert alert-danger" role="alert">${data}</div>`;
        }
      });
    },
    toUpperCase(item) {
      return item.toUpperCase();
    },
  },
  computed: {},
  watch: {},
  beforeMount: function () {
    const socket = io();
    socket.emit('update_products', 'update');
    socket.on('update_products', (data) => {
      data.forEach((product) => {
        this.products.push(product);
      });
    });
  },
};

const app = Vue.createApp(App);

app.mount('#app');
