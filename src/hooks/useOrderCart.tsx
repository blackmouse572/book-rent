import { IOrderCart } from "@/types/order_cart";
import { useState, useEffect, createContext, useContext } from "react";

export interface ContextType {
    cartItems: IOrderCart[];
    addToCart: (_id: string) => void;
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
    const [cartItems, setCartItems] = useState<IOrderCart[]>([]);

    // Load cart items from local storage when the component mounts
    useEffect(() => {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
            try {
                setCartItems(JSON.parse(storedCartItems));
            } catch (error) {
                // Handle parsing error if needed
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // Update the addToCart function to accept a book
    const addToCart = (_id: string) => {
        const existingItem = cartItems.find((item) => item.bookId === _id);

        if (existingItem) {
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.bookId === _id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCartItems((prevItems) => [
                ...prevItems,
                { bookId: _id, quantity: 1 },
            ]);
        }
    };

    const decreaseToCart = (_id: string) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.bookId === _id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeFromCart = (_id: string) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.bookId !== _id)
        );
    };

    return (
        <Context.Provider
            value={{ cartItems, addToCart, decreaseToCart, removeFromCart }}
        >
            {children}
        </Context.Provider>
    );
};
