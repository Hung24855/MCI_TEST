class EndpointUrl {
    //Tạo tài khoản
    createAccount = () => `/create-user-account/`;

    //Đăng nhập
    login = () => `/user-login/`;
    //Tạo khách hàng
    createCustomer = () => `/customers/`;
    getCustomers = () => `/customers/`;
    deleteCustomer = (id: number) => `/customers/${id}/`;
    updateCustomer = (id: number) => `/customers/${id}/`;
    //Status
    createStatus = () => `/customer-status/`;
    getStatus = () => `/customer-status/`;
    //Tạo service
    createServices = () => `/services/`;
    getServices = () => `/services/`;
    //Tạo source
    createSource = () => `/customer-source/`;
    getSources = () => `/customer-source/`;
    //Tạo social_media
    createSocialMedia = () => `/customer-social/`;
    getSocialMedia = () => `/customer-social/`;
}

export const ENDPOINT_URL = new EndpointUrl();
