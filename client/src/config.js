
var url = "";
if (process.env.NODE_ENV === 'development') {
    url = 'http://127.0.0.1:8080/api';
} else {
    url = '/api';
}

export const APIConfig = {
    apiUrl: url,
    // apiUrl: '/api',
};