import http from "@/infrastructure/config/request";
import { CreateCustomerBody, UpdateCustomerBody } from "../model";
import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";

export class AccountApi {
    static CreateCustomer = async (body: CreateCustomerBody) => {
        try {
            const { data } = await http.post(ENDPOINT_URL.createCustomer(), body);
            return data;
        } catch (error) {
            console.log("Tạo khách hàng lỗi!");
        }
    };
    static DeleteCustomer = async (id: number) => {
        try {
            const { data } = await http.delete(ENDPOINT_URL.deleteCustomer(id));
            return data;
        } catch (error) {
            console.log("Xóa khách hàng lỗi!");
        }
    };
    static UpateCustomer = async (body: UpdateCustomerBody, id: number) => {
        try {
            const { data } = await http.put(ENDPOINT_URL.updateCustomer(id), body);
            return data;
        } catch (error) {
            console.log("Cập nhật khách hàng lỗi!");
        }
    };

    static GetCustomers = async (filter: { limit?: number; page?: number }) => {
        try {
            const { data } = await http.get(ENDPOINT_URL.getCustomers(), {
                params: {
                    limit: filter?.limit ?? 10,
                    page: filter?.page ?? 1
                }
            });
            return data;
        } catch (error) {
            console.log("Tạo khách hàng lỗi!");
        }
    };

    static getStatus = async () => {
        try {
            const { data } = await http.get(ENDPOINT_URL.getStatus());
            return data;
        } catch (error) {
            console.log("Get status lỗi!");
        }
    };

    static getSource = async () => {
        try {
            const { data } = await http.get(ENDPOINT_URL.getSources());
            return data;
        } catch (error) {
            console.log("Get source lỗi!");
        }
    };
    static getSocialMedia = async () => {
        try {
            const { data } = await http.get(ENDPOINT_URL.getSocialMedia());
            return data;
        } catch (error) {
            console.log("Get social media lỗi!");
        }
    };

    static getServices = async () => {
        try {
            const { data } = await http.get(ENDPOINT_URL.getServices());
            return data;
        } catch (error) {
            console.log("Get service lỗi!");
        }
    };
}
