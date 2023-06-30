
const usersList = document.getElementById('usersList');
const newUserList = document.getElementById('newUserList');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sendBtn = document.getElementById('sendBtn');
const updBtn = document.getElementById('updBtn');
const delBtn = document.getElementById('delBtn');

const inputFirstName = document.getElementById('inputFirstName');
const inputLastName = document.getElementById('inputLastName');
const inputEmail = document.getElementById('inputEmail');
const inputJob = document.getElementById('inputJob');
const inputID = document.getElementById('inputID');

const loginForm = document.getElementById('loginForm');




// ======================================================================================================



const login = document.getElementById('email');
const password = document.getElementById('password');
const buttonLogin = document.getElementById('loginBtn');
const pAlert = document.getElementById('alert');
buttonLogin.disabled = true;
let emailValidation = false;
let passwordValidation = false;
let redirectValue = false;


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
    let firstPart = mail.slice(0, mail.indexOf('@')).split('').map(function(x) {
        if (x === '.'){
            return '!';
        }
        else
            return x;
      })
      mail = firstPart.join('') + mail.slice(mail.indexOf('@'));
  

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
    pAlert.innerText = 'Valid Erorr: Incorrect login and password';
  }
  else if (!emailValidation) {
    pAlert.innerText = 'Valid Erorr: Incorrect login';
  }
  else if (passwordValidation) {
    pAlert.innerText = 'Valid Erorr: Incorrect password';
  }
  else  {
    pAlert.innerText = '';
    redirectValue = true;
  }

}



login.addEventListener('blur', checkError);
password.addEventListener('blur', checkError);



buttonLogin.addEventListener('click', () => {
  checkError()
  if (redirectValue === true) {
    
    const promise = api.login({
        "email": login.value,
        "password": password.value
    });
    

    promise
    .then(response => {
        if ("error" in response) {
            pAlert.innerText = `Server Error: ${response["error"]}`;
        }
        else {
            loginForm.style.display = 'none';
            let token = response["token"];
    
            api.setToken(token);
        }
    })
    .catch(error => console.log(error));
    }
    else {
    password.value = '';
    }
  
})




// ======================================================================================================



let currentPage = 1;
let request = null;
let totalPages = api.getTotalPages();



if (totalPages === 1) {
    nextBtn.disabled = true;
}
prevBtn.disabled = true;




function loadUsersList() {
    api.loadUserList(currentPage)
    .then(response => {
        const list = document.createElement('ul')
        list.id = 'usersListUl'

        for (let i = 0; i < response['data'].length; i++) {
            const listElem = document.createElement('li')
            listElem.innerText = `${response['data'][i]['first_name']} ${response['data'][i]['last_name']}, ${response['data'][i]['email']}`
            list.append(listElem)
        }

        usersList.append(list);
    })
    .catch(error => console.log(error));

}

prevBtn.addEventListener('click', function() {
    try{
        document.getElementById('usersListUl').remove()
    }
    catch{}

    currentPage -=1;
    if (currentPage === 1) {
        prevBtn.disabled = true;
    }
    nextBtn.disabled = false;

    loadUsersList();
})



nextBtn.addEventListener('click', function() {
    try{
        document.getElementById('usersListUl').remove();
    }
    catch{}
    

    currentPage +=1;
    if (currentPage === totalPages) {
        nextBtn.disabled = true;
    }
    prevBtn.disabled = false;

    loadUsersList();
})



function createUser() {

    try{
        document.getElementById('newUsersListUl').remove();
    }
    catch{}
    
 
    user = {
        first_name: inputFirstName.value,
        last_name: inputLastName.value,
        email: inputEmail.value,
        job: inputJob.value,
    }


    if (request==="CREATE") {
        const promise = api.createNewUsers(user);
        createUpdateUser(promise);
    }
    else if (request === 'UPDATE') {
        const promise = api.updateNewUsers(user, inputID.value);
        createUpdateUser(promise);
    }

    else if (request === 'DELETE') {
        api.deleteNewUsers(inputID.value);
    }


    if (request === 'DELETE') {
        const list = document.createElement('ul');
        list.id = 'newUsersListUl';
        const text = document.createElement('p');
        text.innerText = 'Succesfull Delete';
        list.append(text);
        newUserList.append(list);
    }
}

sendBtn.addEventListener('click', function() {
    request = "CREATE";
    createUser();
})

updBtn.addEventListener('click', function() {
    request = "UPDATE";
    createUser();
})

delBtn.addEventListener('click', function() {
    request = "DELETE";
    createUser();
})



loadUsersList();






