type Root = {
    title: string;
};

export type CreateStatusBody = Root;
export type CreateServiceBody = Root;
export type CreateSourceBody = Root;
export type CreateSocialMediaBody = Root;

export type CreateCustomerBody = {
    status: number; //Trạng thái
    source: number; //Nguồn khách hàng
    social_media: number; // Nguồn khách hàng
    service: number[]; //Sản phẩm quan tâm
    full_name: string; // Họ tên khách hàng
    gender: "Nam" | "Nữ"; // Giới tính
    date_of_birth?: Date; //Ngày sinh
    phone_number: string; //Số điện thoại
    follow_up_date: Date; //Giờ bắt đầu
    follow_down_date: Date; //Giờ kết thúc
    address?: string; //Địa chỉ chi tiết
    city?: string; //Thành phố
    district?: string; //Huyện
    ward?: string; //Phường
    detailed_info?: string; //url mạng xã hội,
    notes?: string; //Ghi chú
    comments: {
        title: string;
        time: Date;
        status_id: number; //trạng thái
    }[];
};

export type UpdateCustomerBody = Omit<CreateCustomerBody, "comments"> & {
    comments: CreateCustomerBody["comments"] & { id: number };
};
