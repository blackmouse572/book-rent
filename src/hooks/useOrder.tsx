import { useState, useEffect, createContext, useContext } from "react";
import { IOrder} from "@/types/order";

export interface ContextType {
    orderItems: IOrder[] | null;
}

export const Context = createContext<ContextType | undefined>(undefined);

export const useOrder = (): ContextType => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useCart must be used within a ContextProvider");
    }
    return context;
};

export const OrderProvider = ({ children }: React.PropsWithChildren) => {
    const [orderItems, setOrderItems] = useState<IOrder[] | null>(null);

    useEffect(() => {
        const storedOrderItems = localStorage.getItem("orderItems");
        if (storedOrderItems) {
            setOrderItems(JSON.parse(storedOrderItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("orderItems", JSON.stringify(orderItems));
    }, [orderItems]);

    return (
        <Context.Provider
            value={{ orderItems }}
        >
            {children}
        </Context.Provider>
    );
};
