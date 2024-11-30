import dayjs from "dayjs";
import { Dispatch, forwardRef, SetStateAction, useState } from "react";
import { CreateCustomerDTO } from "@/domain/account/dto";
import { AccountServices } from "@/domain/account/services";
import { Button, DatePicker, Form, Input, Radio, Select, Space, Table, TimePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { addressData } from "@/infrastructure/constant/fake-address";

const { Option } = Select;

interface CustomerCareRecord {
    time: string;
    title: string;
    status_id: number;
}

type Props = {
    onClose: () => void;
    infoUser: CreateCustomerDTO | undefined;
    setInfoUser: Dispatch<SetStateAction<CreateCustomerDTO | undefined>>;
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

const initCommentList = [
    {
        time: dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
        title: "",
        status_id: 1
    }
];
export const ModalCreateCustomer = forwardRef<HTMLDivElement, Props>(
    ({ onClose, infoUser, setInfoUser, filter, setFilter }, ref) => {
        const [form] = Form.useForm();
        const { statusList, sourceList, servicesList, socialMediaList } = AccountServices.useDataSelect();
        const { CreateCustomer, isPendingCreate, UpdateCustomer, isPendingUpdate } = AccountServices.useHandleData();
        const [commentList, setCommentList] = useState<CustomerCareRecord[]>(() => {
            if (infoUser?.comment && infoUser?.comment.length > 0) {
                return infoUser.comment.map((item) => ({
                    id: item.id,
                    time: item.time,
                    status_id: item.status_id,
                    title: item.title
                }));
            } else {
                return initCommentList;
            }
        });
        const queryClient = useQueryClient();

        const handleAddRow = () => {
            setCommentList((prevList) => [
                ...prevList,
                {
                    order: prevList.length + 1,
                    time: dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
                    title: "",
                    status_id: 1
                }
            ]);
        };

        const columns: ColumnsType<CustomerCareRecord> = [
            {
                title: "Lần",
                dataIndex: "",
                key: "time",
                width: 200,
                align: "center",
                render(_, __, index) {
                    return <span>{index + 1}</span>;
                }
            },
            {
                title: "Ngày",
                dataIndex: "time",
                key: "time",
                width: 250,
                align: "center",
                render: (time, __, index) => (
                    <DatePicker
                        size="large"
                        format="YYYY-MM-DD"
                        defaultValue={time ? dayjs(time) : dayjs(new Date())}
                        onChange={(date) => {
                            setCommentList((prevList) =>
                                prevList.map((item, i) =>
                                    i === index ? { ...item, time: dayjs(date).format("YYYY-MM-DDTHH:mm:ss") } : item
                                )
                            );
                        }}
                    />
                )
            },
            {
                title: "Kết quả chăm sóc",
                dataIndex: "title",
                key: "title",
                render: (text, __, index) => (
                    <Input
                        size="large"
                        placeholder="Nhập kết quả"
                        defaultValue={text}
                        onChange={(e) => {
                            const value = e.target.value;
                            setCommentList((prevList) =>
                                prevList.map((item, i) => (i === index ? { ...item, title: value } : item))
                            );
                        }}
                    />
                )
            },
            {
                title: "Cập nhật trạng thái",
                dataIndex: "status_id",
                align: "center",
                key: "status_id",
                render: (status_id, __, index) => (
                    <Select
                        placeholder="Chọn trạng thái"
                        style={{ width: 200 }}
                        size="large"
                        defaultValue={status_id}
                        onChange={(value) => {
                            setCommentList((prevList) =>
                                prevList.map((item, i) => (i === index ? { ...item, status_id: value } : item))
                            );
                        }}
                    >
                        {statusList?.map(
                            (status) =>
                                status.count > 0 && (
                                    <Option value={status.customers[0].status} key={JSON.stringify(status)}>
                                        {status.status}
                                    </Option>
                                )
                        )}
                    </Select>
                )
            }
        ];

        const handleCloseModal = () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_ALL_CUSTOMER, filter]
            });
            form.resetFields(), setCommentList(initCommentList);
            setInfoUser(undefined);
            onClose();
        };

        const handleSubmit = (values: any) => {
            if (infoUser) {
                UpdateCustomer(
                    {
                        body: {
                            ...values,
                            comments: commentList.filter((item) => item.title !== "")
                        },
                        id: infoUser.id
                    },
                    {
                        onSuccess: (response) => {
                            if (response.id) {
                                toast.success("Cập nhật khách hàng thành công!");
                                handleCloseModal();
                            }
                        }
                    }
                );
            } else {
                CreateCustomer(
                    { ...values, comments: commentList.filter((item) => item.title !== "") },
                    {
                        onSuccess: (response) => {
                            if (response?.id) {
                                toast.success("Tạo khách hàng thành công!");
                                handleCloseModal();
                            }
                        }
                    }
                );
            }
        };

        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
                onClick={(e) => {
                    e.stopPropagation();
                    form.resetFields(), setCommentList(initCommentList);
                    setInfoUser(undefined);
                    onClose();
                }}
            >
                <div
                    className="flex h-[90vh] w-[80vw] animate-fade-in-down flex-col gap-5 overflow-hidden rounded-lg bg-white pb-5"
                    ref={ref}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex h-10 items-center justify-between bg-primary px-4 text-white">
                        <span className="text-xl">{infoUser ? "Cập nhật thông tin khách hàng" : "Tạo khách hàng"}</span>
                        <span
                            className="size-6 cursor-pointer rounded border text-center text-xl leading-6"
                            onClick={onClose}
                        >
                            X
                        </span>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="px-4">
                            <Form
                                form={form}
                                layout="vertical"
                                className="mx-auto"
                                onFinish={async (values) => {
                                    handleSubmit(values);
                                }}
                            >
                                {/* Thông tin cơ bản */}
                                <div className="mb-4 border-b">
                                    <div className="grid grid-cols-3 gap-4">
                                        {/* Họ tên */}
                                        <Form.Item
                                            label="Họ tên khách hàng"
                                            name="full_name"
                                            initialValue={infoUser?.full_name}
                                            rules={[{ required: true, message: "Vui lòng nhập họ tên khách hàng" }]}
                                        >
                                            <Input placeholder="Tên khách hàng" size="large" />
                                        </Form.Item>
                                        {/* Giới tính */}
                                        <Form.Item
                                            label="Giới tính"
                                            name="gender"
                                            initialValue={infoUser?.gender ?? "Nam"}
                                            layout="horizontal"
                                            className="mb-0 flex items-center justify-center"
                                        >
                                            <Radio.Group>
                                                <Radio value="Nam">Nam</Radio>
                                                <Radio value="Nữ">Nữ</Radio>
                                                <Radio value="Khác">Khác</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                        {/* Ngày sinh */}
                                        <Form.Item label="Ngày sinh">
                                            <DatePicker
                                                placeholder="20/08/2002"
                                                className="w-full"
                                                size="large"
                                                format="DD/MM/YYYY"
                                                defaultValue={dayjs(infoUser?.date_of_birth)}
                                                onChange={(date) => {
                                                    form.setFieldsValue({
                                                        date_of_birth: date ? date.format("YYYY-MM-DDTHH:mm:ss") : null
                                                    });
                                                }}
                                            />
                                        </Form.Item>
                                        {/* Ngày sinh */}
                                        <Form.Item name="date_of_birth" hidden initialValue={infoUser?.date_of_birth}>
                                            <input type="hidden" />
                                        </Form.Item>
                                        {/* Surce và status */}
                                        <Space size="large" className="grid w-full grid-cols-2">
                                            <Form.Item
                                                label="Nguồn khách hàng"
                                                name="source"
                                                initialValue={infoUser?.source.id}
                                                rules={[{ required: true, message: "Không thể để trống!" }]}
                                            >
                                                <Select size="large">
                                                    {sourceList?.results?.map((source) => (
                                                        <Option value={source.id} key={JSON.stringify(source)}>
                                                            {source.title}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>

                                            <Form.Item
                                                label="Trạng thái"
                                                name="status"
                                                initialValue={infoUser?.status.id}
                                                rules={[{ required: true, message: "Không thể để trống!" }]}
                                            >
                                                <Select size="large">
                                                    {statusList?.map(
                                                        (status) =>
                                                            status.count > 0 && (
                                                                <Option
                                                                    value={status.customers[0].status}
                                                                    key={JSON.stringify(status)}
                                                                >
                                                                    {status.status}
                                                                </Option>
                                                            )
                                                    )}
                                                </Select>
                                            </Form.Item>
                                        </Space>
                                    </div>
                                </div>

                                {/* Thông tin liên hệ*/}
                                <div className="mb-4 border-b pb-4">
                                    <h3 className="mb-4 text-lg font-medium">Thông tin liên hệ</h3>

                                    <div className="grid grid-cols-3 gap-16">
                                        <div className="flex flex-col gap-4">
                                            {/* Số điện thoại */}
                                            <Form.Item
                                                label="Số điện thoại"
                                                name="phone_number"
                                                initialValue={infoUser?.phone_number}
                                                rules={[{ required: true, message: "Không thể để trống!" }]}
                                            >
                                                <Input placeholder="Số điện thoại" size="large" />
                                            </Form.Item>

                                            {/* Thông tin chi tiết */}
                                            <div>
                                                <h3 className="mb-4 text-lg font-medium">Thông tin chi tiết</h3>
                                                {/* Sản phẩm quan tâm */}
                                                <Form.Item
                                                    label="Sản phẩm quan tâm"
                                                    name="service"
                                                    initialValue={infoUser?.service?.map((service) => service.id)}
                                                    rules={[{ required: true, message: "Không thể để trống" }]}
                                                >
                                                    <Select size="large" mode="multiple">
                                                        {servicesList?.results?.map((service) => (
                                                            <Option value={service.id} key={JSON.stringify(service)}>
                                                                {service.title}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                                {/* Ghi chú */}
                                                <Form.Item label="Ghi chú" name="notes" initialValue={infoUser?.notes}>
                                                    <Input placeholder="Thông tin ghi chú" size="large" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            {/* Email */}
                                            <Form.Item label="Email" name="email" initialValue={infoUser?.email}>
                                                <Input placeholder="Email" size="large" />
                                            </Form.Item>

                                            {/* Địa chỉ */}
                                            <Form.Item label="Địa chỉ liên hệ">
                                                <Space direction="vertical" className="w-full space-y-0">
                                                    <Form.Item
                                                        name="city"
                                                        className="mb-0"
                                                        initialValue={infoUser?.city}
                                                    >
                                                        <Select
                                                            placeholder="Thành phố"
                                                            style={{ width: "100%" }}
                                                            size="large"
                                                        >
                                                            {addressData.provinces.map((province: any) => (
                                                                <Option
                                                                    value={province.province_name}
                                                                    key={province.province_id}
                                                                >
                                                                    {province.province_name}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="district"
                                                        className="mb-0"
                                                        initialValue={infoUser?.district}
                                                    >
                                                        <Select
                                                            placeholder="Quận huyện"
                                                            style={{ width: "100%" }}
                                                            size="large"
                                                        >
                                                            {addressData.districts.map((district: any) => (
                                                                <Option
                                                                    value={district.district_name}
                                                                    key={district.district_id}
                                                                >
                                                                    {district.district_name}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="ward"
                                                        className="mb-0"
                                                        initialValue={infoUser?.ward}
                                                    >
                                                        <Select
                                                            placeholder="Thị xã"
                                                            style={{ width: "100%" }}
                                                            size="large"
                                                        >
                                                            {addressData.wards.map((ward: any) => (
                                                                <Option value={ward.ward_name} key={ward.ward_id}>
                                                                    {ward.ward_name}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item name="address" initialValue={infoUser?.address}>
                                                        <Input placeholder="số 32 Chùa Láng" size="large" />
                                                    </Form.Item>
                                                </Space>
                                            </Form.Item>
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="flex items-end gap-4">
                                                {/* Mạng xã hội */}
                                                <Form.Item
                                                    label="Mạng xã hội"
                                                    name="social_media"
                                                    className="flex-1"
                                                    initialValue={infoUser?.social_media.id}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Không thể bỏ trống!"
                                                        }
                                                    ]}
                                                >
                                                    <Select placeholder="Chọn mạng xã hội" size="large">
                                                        {socialMediaList?.results.map((socialMedia) => (
                                                            <Option value={socialMedia.id} key={socialMedia.id}>{socialMedia.title}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                                {/* Link mạng xã hội - không có tác dụng :< */}
                                                <Form.Item name="detailed_info" className="flex-[2]">
                                                    <Input placeholder="URL mạng xã hội" size="large" />
                                                </Form.Item>
                                            </div>
                                            {/* Khung giờ */}
                                            <Form.Item
                                                label="Chọn khung giờ"
                                                name="times"
                                                rules={[{ required: true, message: "Không thể để trống" }]}
                                                initialValue={[
                                                    dayjs(infoUser?.follow_up_date),
                                                    dayjs(infoUser?.follow_down_date)
                                                ]}
                                            >
                                                <TimePicker.RangePicker
                                                    format="HH:mm"
                                                    placeholder={["Bắt đầu", "Kết thúc"]}
                                                    className="w-full"
                                                    size="large"
                                                    defaultValue={[
                                                        dayjs(infoUser?.follow_up_date, { format: "HH:mm" }),
                                                        dayjs(infoUser?.follow_down_date, { format: "HH:mm" })
                                                    ]}
                                                    onChange={(times) => {
                                                        if (times) {
                                                            form.setFieldsValue({
                                                                follow_up_date: times[0]?.format("YYYY-MM-DDTHH:mm:ss"),
                                                                follow_down_date:
                                                                    times[1]?.format("YYYY-MM-DDTHH:mm:ss")
                                                            });
                                                        }
                                                    }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name="follow_up_date"
                                                hidden
                                                initialValue={infoUser?.follow_up_date}
                                            >
                                                <input type="hidden" />
                                            </Form.Item>
                                            <Form.Item
                                                name="follow_down_date"
                                                hidden
                                                initialValue={infoUser?.follow_down_date}
                                            >
                                                <input type="hidden" />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>

                                {/* Thông tin chăm sóc khách hàng */}
                                <div className="mb-4">
                                    <h3 className="mb-4 text-lg font-medium">Thông tin chăm sóc khách hàng</h3>
                                    {/* Comment */}
                                    <Table
                                        columns={columns}
                                        dataSource={commentList}
                                        pagination={false}
                                        rowKey="order"
                                        className="rounded-lg border"
                                        footer={() => (
                                            <Button type="dashed" block size="large" onClick={handleAddRow}>
                                                + Thêm
                                            </Button>
                                        )}
                                    />
                                </div>
                            </Form>
                        </div>
                    </div>

                    {/* Footer */}

                    <div className="mr-10 flex h-10 items-center justify-end gap-4">
                        <span className="text-primary">Hủy</span>
                        <Button
                            className="rounded bg-primary px-4 py-2 text-white"
                            onClick={() => {
                                form.submit();
                            }}
                            size="large"
                            loading={isPendingCreate || isPendingUpdate}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
);

export default ModalCreateCustomer;
