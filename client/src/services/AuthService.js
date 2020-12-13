

export function saveAuth(token) {
    if(token) {
        localStorage.setItem('jwt', JSON.stringify(token));
    }
}

export function getAuth() {
    return localStorage.getItem('jwt');
}

export function getUserId() {
    return JSON.parse(localStorage.getItem('jwt')).id
}

export function getUsername() {
    return JSON.parse(localStorage.getItem('jwt')).username;
}

export function getToken() {
    return JSON.parse(localStorage.getItem('jwt')).token;
}