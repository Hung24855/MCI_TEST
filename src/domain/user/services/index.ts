import { useMutation } from "@tanstack/react-query";
import { UserApi } from "../api";
import { LoginBody, RegisterBody } from "../model";

export class UserServices {
    static useUserApi() {
        const { mutate: RegisterMutate, isPending: isPendingRegister } = useMutation({
            mutationFn: (body: RegisterBody) => UserApi.Register(body)
        });
        const { mutate: LoginMutate, isPending: isPendingLogin } = useMutation({
            mutationFn: (body: LoginBody) => UserApi.Login(body)
        });
        return {
            RegisterMutate,
            LoginMutate,
            isPendingRegister,
            isPendingLogin
        };
    }
}
