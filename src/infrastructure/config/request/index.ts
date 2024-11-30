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
