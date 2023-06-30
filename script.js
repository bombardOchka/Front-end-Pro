
const login = document.getElementById('login');
const password = document.getElementById('password');
const buttonLogin = document.getElementById('buttonLogin');
const pAlert = document.getElementById('alert');
buttonLogin.disabled = true;
let emailValidation = false;
let passwordValidation = false;
let redirectValue = false


function checkInputs() {
  if (login.value.trim() !== '' && password.value.trim() !== '') {
    buttonLogin.disabled = false;
  }
  else {
    buttonLogin.disabled = true;
  }
}

login.addEventListener('input', checkInputs);
password.addEventListener('input', checkInputs);


function checkEmail() {
  let mail = login.value;
  let userName = mail.slice(0, mail.indexOf('@'));
  let domainName = mail.slice(mail.indexOf('@') + 1, mail.indexOf('.'));
  let domainExtens = mail.slice(mail.indexOf('.') + 1);

  let accessAt = mail.split("@").length - 1 === 1;
  let accessDot = mail.split(".").length - 1 === 1;
  let accessPos = mail.indexOf('@') < mail.indexOf('.');
  let accessLength = userName.length > 3 && domainName.length > 2 && domainExtens.length > 1;

  emailValidation = accessAt && accessDot && accessPos && accessLength;
}


function checkPassword() {
  passwordValidation = password.value.length < 6;
}

function checkError(){
  checkEmail()
  checkPassword()
  if (!emailValidation && passwordValidation) {
    pAlert.innerText = 'Неверный логин и пароль';
    password.value = '';
  }
  else if (!emailValidation) {
    pAlert.innerText = 'Неверный логин';
    password.value = '';
  }
  else if (passwordValidation) {
    pAlert.innerText = 'Неверный пароль';
    password.value = '';
  }
  else if (login.value != 'admin@gmail.com' || password.value != "password123") {
    pAlert.innerText = 'Ваш логин не зарегистрирован или неверный пароль';
    password.value = '';
  }
  else {
    pAlert.innerText = '';
    window.location.replace("https://www.google.com/");
  } 
}



login.addEventListener('blur', checkError)
password.addEventListener('blur', checkError)



buttonLogin.addEventListener('click', () => {
  checkError()
  if (redirectValue === true){
  window.location.replace("https://www.google.com/")
  }
})

