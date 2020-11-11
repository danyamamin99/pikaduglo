// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})

// переменные формы - авторизация
const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passInput = document.querySelector('.login-password');
const loginSingUp = document.querySelector('.login-signup');

// переменные .user(информация о пользователе)
const userElem = document.querySelector('.user');
const userName = document.querySelector('.user-name');


// массив пользователей
const listUsers = [
  {
    id: '01',
    email: 'maks@mail.ru',
    password: '12345',
    displayName: 'maks',
  },
  {
    id: '02',
    email: 'danya@mail.ru',
    password: '12345D',
    displayName: 'danya',
  },
];

// настройки пользователей
const setUsers = {
  user: null,
  logIn(emailValue, passwordValue, handler) {
    const user = this.getUser(emailValue);
    if (user && user.password === passwordValue) {
      this.authUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не существует!');
      loginForm.reset();
    }
  },
  logOut() {
    console.log('Выход');
  },
  singUp(emailValue, passwordValue, handler) {
    if (!this.getUser(emailValue)) {
      const user = {email: emailValue, password: passwordValue, displayName: emailValue.split('@')[0]};
      listUsers.push(user);
      this.authUser(user);
      handler();
    } else {
      alert('Пользователь с таким email уже существует!');
      loginForm.reset();
    }
  },
  getUser(emailValue) {
    // метод find перебирает массив с объктами с определенным условием
    // если есть такой элемент возвращает true, а иначе false
    return listUsers.find(item => item.email === emailValue);
  },
  authUser(user) {
    this.user = user;
  }
  
};

// функция callback для отображения user/формой авторизацией
const toggleAuthDom = () => {
  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userName.textContent = user.displayName;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};

// добавление события submit форме
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const emailValue = emailInput.value;
  const passwordValue = passInput.value;

  setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
});

// добавление события click - регистрация
loginSingUp.addEventListener('click', (event) => {
  event.preventDefault();

  const emailValue = emailInput.value;
  const passwordValue = passInput.value;

  setUsers.singUp(emailValue, passwordValue, toggleAuthDom);
});

toggleAuthDom();