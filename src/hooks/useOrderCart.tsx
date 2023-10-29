import { useState, useEffect, createContext, useContext } from "react";
import { IOrderCart } from "@/types/order";

export interface ContextType {
    cartItems: IOrderCart[] | null;
    addToCart: (newItem: IOrderCart) => void;
    decreaseToCart: (_id: string) => void;
    removeFromCart: (_id: string) => void;
}

export const Context = createContext<ContextType | undefined>(undefined);

export const useOrderCart = (): ContextType => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useCart must be used within a ContextProvider");
    }
    return context;
};

export const CartProvider = ({ children }: React.PropsWithChildren) => {
    const [cartItems, setCartItems] = useState<IOrderCart[] | null>(null);

    useEffect(() => {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (newItem: IOrderCart) => {
        if (cartItems) {
            const existingItem = cartItems.find(
                (item) => item._id === newItem._id
            );
            if (existingItem) {
                setCartItems((prevItems) =>
                    prevItems
                        ? prevItems.map((item) =>
                              item._id === newItem._id
                                  ? { ...item, quantity: item.quantity + 1 }
                                  : item
                          )
                        : null
                );
            } else {
                setCartItems((prevItems) =>
                    prevItems
                        ? [...prevItems, { ...newItem, quantity: 1 }]
                        : null
                );
            }
        }
    };

    const decreaseToCart = (_id: string) => {
        if (cartItems) {
            setCartItems((prevItems) =>
                prevItems
                    ? prevItems.map((item) =>
                          item._id === _id && item.quantity > 1
                              ? { ...item, quantity: item.quantity - 1 }
                              : item
                      )
                    : null
            );
        }
    };

    const removeFromCart = (_id: string) => {
        if (cartItems) {
            setCartItems((prevItems) =>
                prevItems ? prevItems.filter((item) => item._id !== _id) : null
            );
        }
    };

    return (
        <Context.Provider
            value={{ cartItems, addToCart, decreaseToCart, removeFromCart }}
        >
            {children}
        </Context.Provider>
    );
};
