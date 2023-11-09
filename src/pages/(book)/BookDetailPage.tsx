import { getBookById, postBookReview } from "@/apis/book";
import { IBreadcrumb } from "@/components/breadcrumb";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { Icons } from "@/components/icons";
import MetaData from "@/components/metadata";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useOrderCart } from "@/hooks/useOrderCart";
import { IBook, IReview } from "@/types";
import { format, parseISO } from "date-fns";
import React, { useCallback, useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

type FormValue = {
    review: string;
    rating: number;
};
export default function BookDetailPage() {
    const [book, setBook] = useState<IBook | null>(null);
    const user = useAuth();
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

    const addReview = useCallback(
        (review: IReview) => {
            if (!book?.reviews) {
                return;
            }

            const updatedBook: IBook = {
                ...book,
                reviews: [...book.reviews, review],
            };

            setBook(updatedBook);
        },
        [book]
    );

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
                href: `/books?genre=${genre}`,
            },
            {
                key: "book",
                label: book?.name ?? "", // Handle book.name when book is null
            },
        ];
    }, [book, pathname]);

    const renderReviewer = React.useCallback(
        ({ author, rating, updatedAt }: IReview) => (
            <div className="flex items-center gap-3 w-full">
                <Avatar>
                    <AvatarImage src={author.avatar} alt={`${author.email}`} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex gap-4 justify-between flex-1">
                    <div>
                        <div className="font-medium text-lg">
                            {author.fullName}
                        </div>
                        <div className="text-slate-400">{author.email}</div>
                    </div>
                    <div className="flex flex-col justify-end items-end">
                        <h5 className="font-medium text-lg flex w-fit items-center">
                            {rating}&nbsp;
                            <Icons.star
                                className={"text-yellow-500"}
                                size={16}
                            />
                        </h5>
                        <p className="text-xs text-slate-300 text-right">
                            Reviewed at{" "}
                            {format(parseISO(updatedAt), "dd/MM/yyyy")}
                        </p>
                    </div>
                </div>
            </div>
        ),
        []
    );

    const id = useId();

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: postBookReview,
        onSuccess: (_, { data: { comment, rating } }) => {
            if (!book) return;

            addReview({
                _id: id,
                author: {
                    _id: "",
                    email: "",
                    fullName: "",
                    avatar: "",
                    ...user.user,
                },
                comment,
                rating,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
        },
    });

    const renderReviews = React.useMemo(() => {
        return book?.reviews?.map((reviewer) => (
            <div key={reviewer._id} className="w-full mb-2">
                {renderReviewer(reviewer)}
                <p className="w-3/4 mt-2">{reviewer.comment}</p>
            </div>
        ));
    }, [book?.reviews, renderReviewer]);
    const { toast } = useToast();

    const { setValue, watch, register, handleSubmit } = useForm<FormValue>({
        defaultValues: {
            review: "",
            rating: 5,
        },
    });

    const renderReviewRatingBadge = useCallback((rating: number) => {
        switch (rating) {
            case 5:
                return (
                    <Badge className="bg-slate-800 text-slate-200">
                        Excellent
                    </Badge>
                );
            case 4:
                return (
                    <Badge className="bg-slate-800 text-slate-200">
                        Greate
                    </Badge>
                );
            case 3:
                return (
                    <Badge className="bg-slate-800 text-slate-200">Good</Badge>
                );
            case 2:
                return (
                    <Badge className="bg-slate-800 text-slate-200">Bad</Badge>
                );
            case 1:
                return (
                    <Badge className="bg-slate-800 text-slate-200">
                        No worth
                    </Badge>
                );
        }
    }, []);

    const handleReviewSubmit = useCallback(
        ({ rating, review }: FormValue) => {
            const payload = {
                comment: review,
                rating,
            };

            mutateAsync({
                book_Id: book?._id || "",
                data: payload,
            })
                .then(() => {
                    toast({
                        type: "foreground",
                        title: "Post a comment successfully",
                        description: "Your comment have been recorded",
                    });
                })
                .catch((e) => {
                    toast({
                        type: "foreground",
                        title: "Error",
                        description: JSON.stringify(e),
                    });
                });
        },
        [book?._id, mutateAsync, toast]
    );

    // const renderSubmitReviewForm = useMemo(() => {
    //     return (
    //     );
    // }, [handleReviewSubmit, handleSubmit, register, setValue, watch]);

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

            <section key={"main.reviews"} className="w-full py-10">
                <h3 className="text-3xl font-medium mb-8">
                    Reviewers ({book ? book.reviews?.length : 0})
                </h3>
                <div className="space-y-8 my-4">{renderReviews}</div>
            </section>
            <Separator />
            <section key={"main.myurevbiew"} className="w-full py-10">
                <form
                    onSubmit={handleSubmit(handleReviewSubmit)}
                    className="space-y-2"
                >
                    <div>
                        <Label>Rating</Label>
                        <div className="flex gap-2 items-center">
                            <Rating
                                style={{ maxWidth: 100 }}
                                value={watch("rating")}
                                onChange={(value: number) =>
                                    setValue("rating", value)
                                }
                                isDisabled={isLoading}
                            />
                            {renderReviewRatingBadge(watch("rating"))}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="review">Your review</Label>
                        <Textarea
                            placeholder={""}
                            {...register("review", {
                                minLength: 2,
                                maxLength: 255,
                            })}
                            disabled={isLoading}
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </section>
        </div>
    );
}
