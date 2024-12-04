import axios, { AxiosInstance } from "axios";
const BASE_URL = "https://dev.thabicare.zenix.com.vn/api/v1";

const ACCESS_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzMTI2NTM1LCJpYXQiOjE3MzI4NjczMzUsImp0aSI6ImQ1OTVlY2MyNzlkYzQzMmVhMDgxMDA2ZjVkYmZhNjgzIiwidXNlcl9pZCI6NTl9.LeHE_C75fDwybY3GJObozVSCFLElLzQHXRHZAXdWoHA";
class HTTP {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: BASE_URL,
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }
        });
    }
}
const http = new HTTP().instance;
export default http;

// import axios, { AxiosInstance, AxiosHeaders } from "axios";
// import { parseCookies } from "nookies";

// const BASE_URL = "https://dev.thabicare.zenix.com.vn/api/v1";

// class HTTP {
//     instance: AxiosInstance;

//     constructor() {
//         const cookies = parseCookies();
//         const ACCESS_TOKEN = cookies.access_token || "";

//         this.instance = axios.create({
//             baseURL: BASE_URL,
//             headers: new AxiosHeaders({
//                 Authorization: ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : ""
//             })
//         });
//     }
// }

// const http = new HTTP().instance;
// export default http;
