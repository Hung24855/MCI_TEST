import Modal, { ModalRef } from "@/base/lib/modal-ref";
import { CreateCustomerDTO } from "@/domain/account/dto";
import { AccountServices } from "@/domain/account/services";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { useQueryClient } from "@tanstack/react-query";
import { Space, Table, Tooltip } from "antd";
import type { TableProps } from "antd";
import { Edit } from "iconsax-react";
import { Dispatch, Fragment, SetStateAction, useRef, useState } from "react";
import { toast } from "react-toastify";

type Props = {
    setInfoUser: Dispatch<SetStateAction<CreateCustomerDTO | undefined>>;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    filter: {
        limit: number;
        page: number;
    };
    setFilter: Dispatch<
        SetStateAction<{
            limit: number;
            page: number;
        }>
    >;
};

export default function BodyHomeView({ setInfoUser, setIsOpen, filter, setFilter }: Props) {
    const { custmers } = AccountServices.useAccount(filter);
    const { DeleteCustomer, isPending } = AccountServices.useHandleData();
    const queryClient = useQueryClient();
    const modalRef = useRef<ModalRef>(null);

    const [id, setId] = useState(0);

    const columns: TableProps["columns"] = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            render: (_: any, __: any, index: number) => index + 1
        },
        {
            title: "Mã KH",
            dataIndex: "id",
            key: "id",
            render: (text) => <a>{text}</a>
        },
        {
            title: "Họ và tên",
            dataIndex: "full_name",
            key: "full_name"
        },
        {
            title: "SĐT",
            dataIndex: "phone_number",
            key: "phone_number"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Người tiếp thị",
            dataIndex: "address",
            key: "address"
        },
        {
            title: "Nguồn",
            dataIndex: ["source", "title"],
            key: "source"
        },
        {
            title: "Ghi chú",
            dataIndex: "notes",
            key: "notes"
        },
        {
            title: "Ngày tạo",
            dataIndex: "created_at",
            key: "created_at",
            render: (text) => new Date(text).toLocaleDateString("vi-VN")
        },
        {
            title: "Thao tác",
            dataIndex: "",
            key: "action",
            align: "center",
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Tooltip title="Sửa">
                        <div
                            className="p-2"
                            onClick={() => {
                                setInfoUser(record);
                                setIsOpen(true);
                            }}
                        >
                            <Edit
                                className="cursor-pointer text-primary"
                                size={20}
                                onClick={() => setInfoUser(record)}
                            />
                        </div>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <div
                            className="size-7 cursor-pointer rounded border leading-7 text-red-500"
                            onClick={() => {
                                if (modalRef.current) {
                                    setId(record.id);
                                    modalRef.current.open();
                                }
                            }}
                        >
                            X
                        </div>
                    </Tooltip>
                </Space>
            )
        }
    ];

    const handleDeleteCustomer = () => {
        if (id) {
            DeleteCustomer(id, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_ALL_CUSTOMER, filter] });
                    toast.success("Xóa khách hàng thành công!");
                    modalRef?.current?.close();
                },
                onError: () => {
                    toast.error("Có lỗi xảy ra!");
                }
            });
        }
    };

    return (
        <Fragment>
            <Table
                columns={columns}
                className="rounded-lg border"
                dataSource={custmers?.results}
                scroll={{ x: "max-content" }}
                pagination={{
                    total: custmers?.count ?? 0,
                    pageSize: filter.limit,
                    onChange: (page) => setFilter({ ...filter, page }),
                    onShowSizeChange(_, size) {
                        setFilter({ ...filter, limit: size });
                    }
                }}
            />
            <Modal
                ref={modalRef}
                onClose={() => {
                    if (modalRef.current) {
                        modalRef.current.close();
                    }
                }}
                onOk={handleDeleteCustomer}
                modalContainerClassName="w-1/4 "
                textOk="Xóa"
                okButtonClassName="!bg-red-500"
                textHeader="Xác nhận xóa"
                loading={isPending}
            >
                Bạn có xác nhận xóa người dùng này không?
            </Modal>
        </Fragment>
    );
}
