import { getBookById } from "@/apis/book";
import { IBreadcrumb } from "@/components/breadcrumb";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { Icons } from "@/components/icons";
import MetaData from "@/components/metadata";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useOrderCart } from "@/hooks/useOrderCart";
import { IBook } from "@/types";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function BookDetailPage() {
    const [book, setBook] = useState<IBook | null>(null);

    useEffect(() => {
        const bookId = window.location.pathname.split("/")[2];
        getBookById(bookId).then((bookData) => {
            setBook(bookData);
        });
    }, []);

    const { pathname } = useLocation();
    const { addToCart, cartItems } = useOrderCart();

    const handleAddToCart = () => {
        if (book) {
            addToCart(book._id);
        }
    };

    const isBookInCart =
        book && cartItems?.some((item) => item.bookId === book._id);

    const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
        const paths = pathname.split("/");
        const genre = paths[1];
        return [
            {
                label: "Home",
                key: "home",
                href: "/",
                icon: "smartHome",
            },
            {
                key: "books",
                label: genre,
                href: genre === "books" ? "books" : `/books?genre=${genre}`,
            },
            {
                key: "book",
                label: book?.name || "", // Handle book.name when book is null
            },
        ];
    }, [book, pathname]);

    return (
        <div className="container mx-auto">
            <MetaData title={book ? book.name.slice(0, 10) + "..." : ""} />

            {book && <Breadcrumb items={breadcrumb} className="my-8" />}

            {book && (
                <section
                    key={"main.book"}
                    className="w-full grid grid-cols-1 md:gap-6 md:grid-cols-2 place-items-start gap-4 py-10"
                >
                    <img
                        src={book.image}
                        alt={book.name}
                        className="object-cover rounded-sm shadow-md"
                        height={700}
                        width={500}
                    />

                    <article className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-medium tracking-wide">
                                {book.name}
                            </h3>
                            <p>By&nbsp;{book.author?.fullName}</p>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-xl font-bold">
                                $ {book.rental_price}
                            </h1>
                            <p className="line-clamp-3">{book.description}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-x-4">
                                <Button disabled={book.isAvailable}>
                                    Rent Now
                                </Button>
                                <Button
                                    disabled={book.isAvailable}
                                    onClick={handleAddToCart}
                                >
                                    {isBookInCart ? "Add More" : "Add to Cart"}
                                </Button>{" "}
                            </div>
                        </div>
                    </article>

                    <div className="flex gap-8 border border-border mx-auto w-1/2 col-span-full rounded-md px-8 py-4 bg-orange-100/50 hover-bg-orange-100/90 transition-opacity items-center cursor-default">
                        <Icons.truckDelivery className="w-16 h-16 text-orange-800 hidden sm:block" />
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold">
                                Free shipping !
                            </h3>
                            <p className="text-xs">
                                We offer free shipping for all orders over 100$.
                                This offer is valid for all orders in the
                                US/VN/FR. For other countries, please contact us
                                for more information.
                            </p>
                        </div>
                    </div>

                    <div className="col-span-full space-y-2">
                        <h1 className="text-lg font-bold">About the book</h1>
                        <p className="text-base text-slate-500">
                            {book.description}
                        </p>
                        <ul className="flex gap-1">
                            {book.keywords?.map((keyword) => (
                                <Link key={keyword} to={`/${keyword}`}>
                                    <Badge
                                        isPressable
                                        className="bg-slate-100 text-slate-600"
                                    >
                                        # {keyword}
                                    </Badge>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            <Separator />

            <section key={"main.suggest"} className="w-full min-h-[70vh] py-10">
                <h3 className="text-3xl font-medium">You might also like</h3>
            </section>

            <Separator />

            <section key={"main.reviews"} className="w-full min-h-screen py-10">
                <h3 className="text-3xl font-medium">
                    Reviewers ({book ? book.reviews?.length : 0})
                </h3>
                <div className="space-y-8 my-4">
                    {book?.reviews?.map((reviewer) => (
                        <div key={reviewer._id} className="s">
                            <div className="flex gap-4">
                                <h5 className="font-medium text-lg">
                                    {reviewer.user_id}
                                </h5>
                                <h5 className="font-medium text-lg flex w-fit justify-center items-center">
                                    {reviewer.rating}&nbsp;
                                    <Icons.star
                                        className={"text-yellow-500"}
                                        size={16}
                                    />
                                </h5>
                            </div>
                            <p className="text-sm text-slate-500">
                                Reviewed on&nbsp;
                                {format(reviewer.createdAt, "dd/MM/yyyy")}
                            </p>
                            <p className="w-3/4 mt-2">{reviewer.comment}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
