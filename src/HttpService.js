export class HttpService {
    constructor({ url = window.location.origin }) {
        this.baseURL = url;
    }
    collect() {
        return fetch(this.baseURL, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
    }
}