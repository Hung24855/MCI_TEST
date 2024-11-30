"use client";
import { UserServices } from "@/domain/user/services";
import { Button, Form, FormProps, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type FieldType = {
    username: string;
    password: string;
};

const KEY_TOKEN = "access_token";
export default function LoginView() {
    const { LoginMutate, isPendingLogin } = UserServices.useUserApi();
    const router = useRouter();

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        LoginMutate(values, {
            onSuccess(data, _, __) {
                if (data?.access_token) {
                    localStorage.setItem(KEY_TOKEN, data.access_token);
                    fetch("/api", {
                        method: "POST",
                        body: JSON.stringify({
                            access_token: data.access_token
                        })
                    }).then(() => {
                        router.push("/");
                    });
                } else {
                    toast.error("Sai thông tin đăng nhập!");
                }
            }
        });
    };

    return (
        <center className="flex h-screen items-center justify-center bg-gray-300">
            <div className="min-w-80 space-y-2 rounded border bg-white p-4">
                <h1 className="text-xl font-bold">Đăng nhập</h1>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        label="Tên tài khoản"
                        rules={[{ required: true, message: "Vui lòng nhập tên tài khoản!" }]}
                    >
                        <Input placeholder="Tên tài khoản" allowClear />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                    >
                        <Input.Password placeholder="Mật khẩu" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={isPendingLogin}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                    <div className="text-center">
                        <span>Chưa có tài khoản? </span>
                        <Link href="/dang-ky" className="text-blue-500 hover:underline">
                            Đăng ký
                        </Link>
                    </div>
                </Form>
            </div>
        </center>
    );
}
