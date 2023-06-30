const api = (() => {
    const API_URL = "https://reqres.in/api/"
    class API{
        constructor() {
            this._xhr = new XMLHttpRequest
        }
        login(user) {
            return fetch(`${API_URL}login`, {
                method: 'POST',
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(user)
                
            })
            .then(response => response.json()) 
            
        }

        setToken(token) {
            fetch(`${API_URL}users/1`, {
                method: 'PUT',
                headers: {
                    'Authorization': token
                }
            })
        }

        loadUserList(page) {
            return fetch(`${API_URL}users?page=${page}`)
            .then(response => response.json())
        }


        getTotalPages() {
            this._xhr.open('GET', 'https://reqres.in/api/users?page=1', false)
            this._xhr.send()
            return JSON.parse(this._xhr.response)["total_pages"]

        }

        createNewUsers(user) {
            return fetch(`${API_URL}users`, {
                method: 'POST',
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(user)
                
            })
            .then(response => response.json())
        }

        updateNewUsers(user, id) {
            return fetch(`${API_URL}users/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(user)
                
            })
            .then(response => response.json())
        }

        deleteNewUsers(id) {
            fetch(`${API_URL}users/${id}`, {
                method: 'DELETE'
            })
        }



}
    return new API()
})()











