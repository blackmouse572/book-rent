import { IOrderCart } from "@/types/order_cart";
import { useState, useEffect, createContext, useContext } from "react";

export interface ContextType {
    cartItems: IOrderCart[] | null;
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
    
    // Update the addToCart function to accept a book
    const addToCart = (_id: string) => {
        if (cartItems) {
            const existingItem = cartItems.find((item) => item.bookId === _id);
            
            if (existingItem) {
                // Increase the quantity if the book is already in the cart
                setCartItems((prevItems) =>
                    prevItems
                        ? prevItems.map((item) =>
                            item.bookId === _id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                        : null
                );
            } else {
                // Add the book as a new item in the cart
                setCartItems((prevItems) =>
                    prevItems
                        ? [
                            ...prevItems,
                            {
                                bookId: _id,
                                quantity: 1,
                            }
                        ]
                        : null
                );
            }
        } else {
            // If the cart is empty, create a new cart with the book
            setCartItems([
                {
                    bookId: _id,
                    quantity: 1,
                }
            ]);
        }
    }
    
    


    const decreaseToCart = (_id: string) => {
        if (cartItems) {
            setCartItems((prevItems) =>
                prevItems
                    ? prevItems.map((item) =>
                          item.bookId === _id && item.quantity > 1
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
                prevItems ? prevItems.filter((item) => item.bookId !== _id) : null
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
