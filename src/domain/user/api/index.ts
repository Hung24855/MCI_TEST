import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl"
import http from "@/infrastructure/config/request"
import { LoginBody, RegisterBody } from "../model"
import { LoginDTO, RegisterDTO } from "../dto"



export class UserApi {
    static Register = async(body:RegisterBody)=>{
        try {
            const {data} = await http.post<RegisterDTO>(ENDPOINT_URL.createAccount(),body)
            return data
        } catch (error) {
            console.log("Đăng ký lỗi!")
        }
    }

    static Login = async(body:LoginBody)=>{
        try {     
            const {data} = await http.post<LoginDTO>(ENDPOINT_URL.login(),body)
            return data
        } catch (error) {
            console.log("Đăng nhập lỗi!")
        }
    }
}