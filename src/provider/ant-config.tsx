import { ConfigProvider } from "antd";


export default function AntDesignConfig({ children }: { children: React.ReactNode }) {
    return (
        <ConfigProvider
            theme={{
                components: {},
                token: {
                    colorPrimary: "#BD8306"
                }
            }}
        >
            {children}
        </ConfigProvider>
    );
}
