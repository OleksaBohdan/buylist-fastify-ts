const App = {
  data() {
    return {
      homeName: '',
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
      showExit: false,
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
          token: window.localStorage.getItem('token'),
        });
        socket.on('add_product', (data) => {
          if (data === 'ok') {
            const productName = this.productValue;
            const productCount = this.productCountValue;
            this.products.push({ productName: productName, productCount: productCount, isNotDone: true });
            this.productValue = '';
            this.productCountValue = '';
            this.infoHtml = '';
          } else if (data === 'Invalid token') {
            this.isAuthorized = false;
            this.isActiveLogin = true;
            this.infoHtml = `<div class="alert alert-danger" role="alert">Invalid token. Please, log In again</div>`;
          } else if (data.includes('E11000')) {
            this.infoHtml = `<div class="alert alert-warning" role="alert">"${this.productValue}" already exist</div>`;
          } else {
            this.infoHtml = `<div class="alert alert-warning" role="alert">"${data}" already exist</div>`;
          }
        });
      }
    },
    doneProduct(idx) {
      const socket = io();
      if (this.products[idx].isNotDone == true) {
        socket.emit('done_products', {
          productName: this.products[idx].productName,
          isNotDone: false,
          token: window.localStorage.getItem('token'),
        });
      } else {
        socket.emit('done_products', {
          productName: this.products[idx].productName,
          isNotDone: true,
          token: window.localStorage.getItem('token'),
        });
      }

      socket.on('done_products', (data) => {
        if (data != true && data != false) {
          this.infoHtml = `<div class="alert alert-danger" role="alert">${data}</div>`;
        } else if (data === 'Invalid token') {
          this.isAuthorized = false;
          this.isActiveLogin = true;
          this.infoHtml = `<div class="alert alert-danger" role="alert">Invalid token. Please, log In again</div>`;
        } else {
          this.products[idx].isNotDone = data;
        }
      });
    },
    deleteProducts(e) {
      this.productValue = '';
      this.productCountValue = '';
      const socket = io();
      socket.emit('delete_products', { token: window.localStorage.getItem('token') });

      socket.on('delete_products', (data) => {
        if (data == 'ok') {
          this.products = [];
        } else if (data === 'Invalid token') {
          this.isAuthorized = false;
          this.isActiveLogin = true;
          this.infoHtml = `<div class="alert alert-danger" role="alert">Invalid token. Please, log In again</div>`;
        } else {
          this.infoHtml = `<div class="alert alert-danger" role="alert">${data}</div>`;
        }
      });
    },
    deleteProduct(idx) {
      const socket = io();
      socket.emit('delete_product', {
        productName: this.products[idx].productName,
        token: window.localStorage.getItem('token'),
      });
      socket.on('delete_product', (data) => {
        if (data == 'ok') {
          this.products.splice(idx, 1);
        } else if (data === 'Invalid token') {
          this.isAuthorized = false;
          this.isActiveLogin = true;
          this.infoHtml = `<div class="alert alert-danger" role="alert">Invalid token. Please, log In again</div>`;
        } else {
          this.infoHtml = `<div class="alert alert-danger" role="alert">${data}</div>`;
        }
      });
    },
    toUpperCase(item) {
      return item.toUpperCase();
    },
    showRegistration() {
      this.homeNameValue = '';
      this.emailValue = '';
      this.passwordValue = '';
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
          if (response.status == 201) {
            this.isActiveLogin = true;
            this.isActiveRegistration = false;
            this.infoHtml = `<div class="alert alert-success" role="alert">You have successfully registered!</div>`;
            this.homeNameValue = '';
            this.emailValue = '';
            this.passwordValue = '';
            return;
          } else if (response.status == 200) {
            return response.json();
          }
        })
        .then((response) => {
          if (response) {
            if (response.body.includes('E11000'))
              this.infoHtml = `<div class="alert alert-warning" role="alert">This Home name or Email already exist</div>`;
          }
        });
    },
    async login() {
      const homeName = this.homeNameValue;
      const password = this.passwordValue;

      if (!homeName || !password) {
        this.infoHtml = `<div class="alert alert-warning" role="alert">All fields should be filled</div>`;
        return;
      }
      this.infoHtml = '';

      await fetch('/api/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ homeName: homeName, password: password }),
      }).then((response) => {
        if (response.status == 404) {
          this.infoHtml = `<div class="alert alert-warning" role="alert">User not found</div>`;
        }
        if (response.status == 401) {
          this.infoHtml = `<div class="alert alert-warning" role="alert">Incorrect password</div>`;
        }
        if (response.status == 200) {
          const token = response.headers.get('token');

          if (!token) {
            this.infoHtml = `<div class="alert alert-warning" role="alert">Server error... Try again</div>`;
          }

          this.homeName = response.headers.get('homename');
          window.localStorage.setItem('token', token);
          this.isAuthorized = true;
          this.isActiveLogin = false;
          this.showExit = true;
        }
      });
    },
    async exit() {
      window.localStorage.clear();
      this.homeNameValue = '';
      this.emailValue = '';
      this.passwordValue = '';
      this.infoHtml = '';
      this.isAuthorized = false;
      this.isActiveLogin = true;
      this.showExit = false;
    },
  },
  computed: {},
  watch: {},
  beforeMount: async function () {
    const socket = io();

    const token = window.localStorage.getItem('token');
    await fetch('/api/auth', {
      method: 'get',
      headers: {
        token: token,
      },
    }).then((response) => {
      if (response.status == 200) {
        socket.emit('update_products', { token: window.localStorage.getItem('token') });
        socket.on('update_products', (data) => {
          data.forEach((product) => {
            this.products.push(product);
          });
        });
        this.homeName = response.headers.get('homename');

        this.isAuthorized = true;
        this.isActiveLogin = false;
        this.showExit = true;
      }
    });
  },
};

const app = Vue.createApp(App);

app.mount('#app');
