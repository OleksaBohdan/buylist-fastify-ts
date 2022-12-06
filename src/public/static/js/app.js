const App = {
  data() {
    return {
      infoHtml: '',
      createAccountHtml: '',
      appTitle: 'Hommy!',
      placeholderProduct: 'Product name',
      placeholderProductCount: 'Count',
      productValue: '',
      productCountValue: '',
      homeNameValue: '',
      emailValue: '',
      passwordValue: '',
      products: [],
      isAuthorized: false,
      isActiveLogin: true,
      isActiveRegistration: false,
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
    showRegistration() {
      this.infoHtml = '';
      this.isActiveLogin = false;
      this.isActiveRegistration = true;
    },
    async createAccount() {
      const EMAIL_REGEXP =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
      console.log('Create account');
      this.infoHtml = '';
      const homeName = this.homeNameValue;
      const email = this.emailValue;
      const password = this.passwordValue;
      console.log(`homeName: ${homeName} email: ${email}: password: ${password}`);

      if (homeName.length < 3) {
        console.log('Home name < 3');
        this.infoHtml = `<div class="alert alert-warning" role="alert">Home name should have 3 or more symbols</div>`;
        return;
      }

      if (!EMAIL_REGEXP.test(email)) {
        console.log('Home name < 3');
        this.infoHtml = `<div class="alert alert-warning" role="alert">Invalid email</div>`;
        return;
      }

      if (password.length < 4) {
        console.log('Home name < 3');
        this.infoHtml = `<div class="alert alert-warning" role="alert">Password should have 4 or more symbols</div>`;
        return;
      }

      await fetch('/api/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ homeName: homeName, email: email, password: password }),
      })
        .then((response) => {
          console.log(response);
          console.log('response.status', response.status);

          if ((response.status = 201)) {
            this.isActiveLogin = true;
            this.isActiveRegistration = false;
            this.infoHtml = `<div class="alert alert-success" role="alert">You have successfully registered!</div>`;
            return;
          } else {
            return response.json();
          }
        })
        .then((response) => {
          this.infoHtml = `<div class="alert alert-light" role="alert">${response.body}</div>`;
        });
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
