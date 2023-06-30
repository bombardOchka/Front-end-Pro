
function createUpdateUser(promise) {
    promise
    .then(response => {
        const list = document.createElement('ul')
        list.id = 'newUsersListUl'

        userKeys = Object.keys(response)

        for (let i = 0; i < userKeys.length; i++) {
            const listElem = document.createElement('li')
            listElem.innerText = `${userKeys[i]}: ${response[userKeys[i]]}`
            list.append(listElem)
        }

        newUserList.append(list)
    })
    .catch(error => console.log(error))
}