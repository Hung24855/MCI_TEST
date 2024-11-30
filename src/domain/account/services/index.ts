import { GetCustomersDTO, GetServicesDTO, GetSocialMediaDTO, GetSourceDTO } from "./../dto/index";
import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { AccountApi } from "../api";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { GetStatusDTO } from "../dto";
import { useMutation } from "@tanstack/react-query";
import { CreateCustomerBody, UpdateCustomerBody } from "../model";

export class AccountServices {
    static useDataSelect() {
        const { data: statusList } = useFetcher<GetStatusDTO>([QUERY_KEY.GET_ALL_STATUS], () => AccountApi.getStatus());
        const { data: sourceList } = useFetcher<GetSourceDTO>([QUERY_KEY.GET_ALL_SOURCE], () => AccountApi.getSource());
        const { data: servicesList } = useFetcher<GetServicesDTO>([QUERY_KEY.GET_ALL_SERVICES], () =>
            AccountApi.getServices()
        );
        const { data: socialMediaList } = useFetcher<GetSocialMediaDTO>([QUERY_KEY.GET_SOCIAL_MEDIA], () =>
            AccountApi.getSocialMedia()
        );
        return {
            statusList,
            sourceList,
            servicesList,
            socialMediaList
        };
    }

    static useAccount(filter: { limit?: number; page?: number }) {
        const { data: custmers } = useFetcher<GetCustomersDTO>([QUERY_KEY.GET_ALL_CUSTOMER, filter], () =>
            AccountApi.GetCustomers(filter)
        );

        return {
            custmers
        };
    }

    static useHandleData() {
        const { isPending, mutate: DeleteCustomer } = useMutation({
            mutationFn: (id: number) => AccountApi.DeleteCustomer(id)
        });

        const { isPending: isPendingCreate, mutate: CreateCustomer } = useMutation({
            mutationFn: (body: CreateCustomerBody) => AccountApi.CreateCustomer(body)
        });
        const { isPending: isPendingUpdate, mutate: UpdateCustomer } = useMutation({
            mutationFn: ({ body, id }: { body: UpdateCustomerBody; id: number }) => AccountApi.UpateCustomer(body, id)
        });

        return {
            DeleteCustomer,
            CreateCustomer,
            UpdateCustomer,
            isPendingUpdate,
            isPendingCreate,
            isPending
        };
    }
}
