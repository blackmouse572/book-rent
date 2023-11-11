import { postBookReview } from "@/apis/book";
import Book from "@/components/book";
import BookGridLoading from "@/components/book-grid-loading";
import { IBreadcrumb } from "@/components/breadcrumb";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { Icons } from "@/components/icons";
import MetaData from "@/components/metadata";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useOrderCart } from "@/hooks/useOrderCart";
import BookShouldByWith from "@/pages/(book)/BookShouldByWith";
import useGetManyBooks from "@/pages/(book)/useGetManyBooks";
import { IBook, IReview } from "@/types";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useMutation } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import React, { useCallback, useEffect, useId, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link, useLoaderData, useLocation } from "react-router-dom";

type FormValue = {
    review: string;
    rating: number;
};
export default function BookDetailPage() {
    const data = useLoaderData() as { book: IBook };
    const [book, setBook] = React.useState<IBook | null>(data.book);

    const { toast } = useToast();
    useEffect(() => {
        setBook(data.book);
    }, [data]);

    const { data: relatedBooks, isLoading } = useGetManyBooks(
        {
            category:
                book?.category?.length && book.category.length > 0
                    ? book.category[0]._id
                    : "",
        },
        {
            enabled: !!book?.category,
        }
    );

    const { pathname } = useLocation();
    const user = useAuth();
    const { addToCart, cartItems } = useOrderCart();

    const handleAddToCart = () => {
        if (book) {
            addToCart(book._id as string);
        }
    };

    const renderRelatedBooks = React.useMemo(() => {
        if (isLoading) return <BookGridLoading pageSize={4} />;

        const _relatedBooks =
            relatedBooks?.data.slice(
                0,
                relatedBooks?.data.length > 4 ? 4 : relatedBooks?.data.length
            ) || [];

        return _relatedBooks?.map((book) => <Book book={book} />);
    }, [isLoading, relatedBooks?.data]);

    const bookInCartAmount = useMemo(() => {
        if (!book) return 0;
        const bookInCart = cartItems.find((item) => item.bookId === book._id);
        return bookInCart?.quantity || 0;
    }, [book, cartItems]);

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
                        <div className="flex gap-2">
                            <h5 className="font-medium text-lg flex w-fit items-center">
                                {rating}&nbsp;
                                <Icons.star
                                    className={"text-yellow-500"}
                                    size={16}
                                />
                            </h5>
                            {renderReviewRatingBadge(rating)}
                        </div>
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

    const { mutateAsync, isLoading: isAddReview } = useMutation({
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

    const { setValue, watch, reset, register, handleSubmit } =
        useForm<FormValue>({
            defaultValues: {
                review: "",
                rating: 5,
            },
        });

    const renderGenres = React.useMemo(() => {
        return book?.genres?.map((genre) => (
            <Link to={`/books?genres=${genre}`} key={genre}>
                <Badge isPressable colors={"secondary"}>
                    {genre}
                </Badge>
            </Link>
        ));
    }, [book?.genres]);

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

                    reset();
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
                            <p>By&nbsp;{book.author}</p>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-xl font-bold">
                                $ {book.rental_price}
                            </h1>
                            <p className="line-clamp-3">{book.description}</p>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                disabled={book.isAvailable}
                                onClick={handleAddToCart}
                            >
                                <Icons.addRound className="mr-2" />
                                {bookInCartAmount > 0
                                    ? `Add 1 (Have ${bookInCartAmount} in cart)`
                                    : "Add to Cart"}
                            </Button>
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
                        <ul className="flex gap-1">{renderGenres}</ul>
                    </div>
                </section>
            )}

            <Separator />

            <section key={"main.suggest"} className="w-full min-h-[70vh] py-10">
                <h3 className="text-3xl font-medium">You might also like</h3>
                <div className="flex gap-3 h-30 py-4">{renderRelatedBooks}</div>
            </section>

            <section key={"main.buywith"} className="w-full py-10 ">
                <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-medium">Usually buy with</h3>
                </div>
                <div>
                    <BookShouldByWith book={book} />
                </div>
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
                                isDisabled={isAddReview}
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
                            disabled={isAddReview}
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </section>
        </div>
    );
}
