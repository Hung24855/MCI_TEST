"use client";
import { Fragment, useRef, useState } from "react";
import BodyHomeView from "./components/Body";
import HeaderHomeView from "./components/Header";
import { GetCustomerDTO } from "@/domain/account/dto";
import ModalCreateAndUpdateCustomer from "@/components/ModalCreateAndUpdateCustomer";

export default function HomeView() {
    const [infoUser, setInfoUser] = useState<GetCustomerDTO>();
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState({ limit: 10, page: 1 });
    const ref = useRef<HTMLDivElement>(null);
    return (
        <div className="p-4">
            <HeaderHomeView infoUser={infoUser} setIsOpen={setIsOpen} />
            <BodyHomeView setInfoUser={setInfoUser} setIsOpen={setIsOpen} filter={filter} setFilter={setFilter} />

            {isOpen && (
                <ModalCreateAndUpdateCustomer
                    ref={ref}
                    onClose={() => setIsOpen(false)}
                    infoUser={infoUser}
                    setInfoUser={setInfoUser}
                    filter={filter}
                    setFilter={setFilter}
                />
            )}
        </div>
    );
}
