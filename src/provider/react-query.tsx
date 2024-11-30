"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const minute = 1000 * 60;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnReconnect: true,
            staleTime: minute * 5, //Giữ cho data là mới trong 5 phút
            gcTime: minute * 5 // Mặc định thì nó vẫn là 5 phút
        }
    }
});
export default function ReactQueryProvder({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
