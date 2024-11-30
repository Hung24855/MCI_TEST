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

export default function RegisterView() {
    const { RegisterMutate, isPendingRegister } = UserServices.useUserApi();
    const router = useRouter();

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        RegisterMutate(values, {
            onSuccess(data, _, __) {
                if (data?.id) {
                    router.push("/dang-nhap");
                    toast.success("Đăng ký thành công!");
                }
            }
        });
    };

    return (
        <center className="flex h-screen items-center justify-center bg-gray-300">
            <div className="min-w-80 space-y-2 rounded border bg-white p-4">
                <h1 className="text-xl font-bold">Đăng ký</h1>
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
                        <Button type="primary" htmlType="submit" block loading={isPendingRegister}>
                            Đăng ký
                        </Button>
                    </Form.Item>
                    <div className="text-center">
                        <span>Đã có tài khoản? </span>
                        <Link href="/dang-nhap" className="text-blue-500 hover:underline">
                            Đăng nhập
                        </Link>
                    </div>
                </Form>
            </div>
        </center>
    );
}
