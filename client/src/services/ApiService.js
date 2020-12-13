import axios from "axios";

// if not production, call the api server instead of the webserver
// in production the webserver will be the same as the api server
function proxy(route) {
    if(process.env.NODE_ENV !== 'production') {
        return `http://localhost:5000${route}`;
    }

    return route;
}

// only take body, headers, and status from response, others aren't commonly used
function mapResponse(response) {
    const {data, headers, status} = response;
    return ({ data, headers, status})
}

function _get(route, config = null) {
    return axios({method: 'GET', ...config, url: proxy(route)}).then(res => mapResponse(res));
}

function _post(route, config = null) {
    return axios({method: 'POST', ...config, url: proxy(route)}).then(res => mapResponse(res));
}

function _put(route, config = null) {
    return axios({method: 'PUT', ...config, url: proxy(route)}).then(res => mapResponse(res));
}

function _delete(route, config = null) {
    return axios({method: 'DELETE', ...config, url: proxy(route)}).then(res => mapResponse(res));
}

export {
    _get as get,
    _post as post,
    _put as put,
    _delete as delete
}
