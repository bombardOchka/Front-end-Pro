const usersList = document.getElementById('usersList');
const newUserList = document.getElementById('newUserList');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sendBtn = document.getElementById('sendBtn');

const inputFirstName = document.getElementById('inputFirstName');
const inputLastName = document.getElementById('inputLastName');
const inputEmail = document.getElementById('inputEmail');
const inputJob = document.getElementById('inputJob');







const xhr = new XMLHttpRequest();
let currentPage = 1;
xhr.open('GET', 'https://reqres.in/api/users?page='+`${currentPage}`, false);
xhr.send();
let totalPages = JSON.parse(xhr.response)['total_pages'];



if (totalPages === 1) {
    nextBtn.disabled = true
}

prevBtn.disabled = true;



function loadUsersList() {
    xhr.open('GET', 'https://reqres.in/api/users?page='+`${currentPage}`, false);
    xhr.send();
    let response = JSON.parse(xhr.response);

    const list = document.createElement('ul');
    list.id = 'usersListUl';

    for (let i = 0; i < response['data'].length; i++) {
        const listElem = document.createElement('li');
        listElem.innerText = `${response['data'][i]['first_name']} ${response['data'][i]['last_name']}, ${response['data'][i]['email']}`;
        list.append(listElem);
    }

    usersList.append(list);
}

prevBtn.addEventListener('click', function() {
    try {
        document.getElementById('usersListUl').remove();
    }
    catch {}

    currentPage -= 1;
    if (currentPage === 1) {
        prevBtn.disabled = true;
    }
    nextBtn.disabled = false;

    loadUsersList();
})



nextBtn.addEventListener('click', function() {
    try {
        document.getElementById('usersListUl').remove()
    }
    catch {}
    

    currentPage += 1;
    if (currentPage === totalPages) {
        nextBtn.disabled = true;
    }
    prevBtn.disabled = false;

    loadUsersList();
})



function createUser() {

    try {
        document.getElementById('newUsersListUl').remove();
    }
    catch {}
    
 
    user = {
        first_name: inputFirstName.value,
        last_name: inputLastName.value,
        email: inputEmail.value,
        job: inputJob.value,
    }

    xhr.open('POST', 'https://reqres.in/api/users', false);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(user));
    let response = JSON.parse(xhr.response);

    
    const list = document.createElement('ul');
    list.id = 'newUsersListUl';

    userKeys = Object.keys(response);

    for (let i = 0; i < userKeys.length; i++) {
        const listElem = document.createElement('li');
        listElem.innerText = `${userKeys[i]}: ${response[userKeys[i]]}`;
        list.append(listElem);
    }

    newUserList.append(list);

}


sendBtn.addEventListener('click', () => createUser());

loadUsersList();




