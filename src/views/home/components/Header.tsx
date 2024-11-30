import { Dispatch, SetStateAction } from "react";

import { Button } from "antd";
import { CreateCustomerDTO } from "@/domain/account/dto";

type Props = {
    infoUser: CreateCustomerDTO | undefined;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
   
};

export default function HeaderHomeView({ infoUser, setIsOpen }: Props) {
    return (
        <div className="mb-14 flex justify-between">
            <div className="space-y-2">
                <div className="flex items-end gap-1">
                    <img src="/icon-KH.png" alt="img" className="size-9" />
                    <span className="text-xl font-medium">Quản lý khách hàng</span>
                </div>
                <div className="flex items-center gap-6">
                    <input
                        type="text"
                        className="h-10 w-[348px] rounded border border-[#828282] px-1 outline-none"
                        placeholder="Tên, SĐT, Email"
                    />
                    <img src="/iconFilter.png" alt="img" className="size-9" />
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex gap-x-2">
                    <div className="space-y-1 text-right font-medium">
                        <p>Mrs Conan</p>
                        <p>Nhân viên kinh doanh</p>
                    </div>
                    <img src="/avatar.jpg" alt="img" className="size-12 rounded-full" />
                </div>
                <Button
                    className="float-right h-10 w-40 rounded-lg bg-primary font-semibold text-white"
                    onClick={() => setIsOpen(true)}
                >
                    Thêm khách hàng
                </Button>
            </div>
        </div>
    );
}
