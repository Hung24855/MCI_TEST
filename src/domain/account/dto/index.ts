export type CreateStatusDTO = {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    user: number;
};

export type CreateServiceDTO = {
    id: number;
    title: string;
    description: any;
    effect: any;
    price: any;
    status: string;
    created_at: string;
    updated_at: string;
    user: number;
};

export type CreateSourceDTO = {
    id: number;
    title: string;
    description: any;
    created_at: string;
    updated_at: string;
    user: number;
};

export type CreateSocialMediaDTO = {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    user: number;
};

export interface CreateCustomerDTO {
    id: number;
    status: Status;
    source: Source;
    social_media: SocialMedia;
    comment?: Comment[];
    service: Service[];
    service_request: any[];
    medicine: any[];
    customer_code: string;
    status_service: number;
    status_treatment: any;
    full_name: string;
    gender: string;
    date_of_birth: string;
    phone_number: string;
    email: any;
    follow_up_date: string;
    follow_down_date: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    notes: string;
    diagnosis: any;
    treatment: any;
    appointment_time: any;
    actual_arrival_time: any;
    created_at: string;
    updated_at: string;
    sales_person: any;
    doctor_performed: any;
    user: number;
}

export interface Status {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    user: number;
}

export interface Source {
    id: number;
    title: string;
    description: any;
    created_at: string;
    updated_at: string;
    user: number;
}

export interface SocialMedia {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    user: number;
}

export interface Comment {
    id: number;
    title: string;
    time: string;
    status_id: number;
    status: Status2;
}

export interface Status2 {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    user: number;
}

export interface Service {
    id: number;
    title: string;
    description: any;
    effect: any;
    price: any;
    status: string;
    created_at: string;
    updated_at: string;
    user: number;
}

export type GetCustomersDTO = {
    count: number;
    next: any;
    previous: any;
    results: CreateCustomerDTO[];
};

export type GetCustomerDTO = CreateCustomerDTO;

export type GetStatusDTO = {
    status: string;
    count: number;
    customers: {
        status: number;
    }[];
}[];

export type GetSourceDTO = {
    count: number;
    next: any;
    previous: any;
    results: Source[];
};

export type GetServicesDTO = {
    count: number;
    next: any;
    previous: any;
    results: Service[];
};

export type GetSocialMediaDTO = GetSourceDTO;
