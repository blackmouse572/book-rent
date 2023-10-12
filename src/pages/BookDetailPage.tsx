import { format } from "date-fns";
import { useLoaderData } from "react-router-dom";
import { Icons } from "../components/icons";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { IBook } from "../types";

export default function BookDetailPage() {
    const book = useLoaderData() as IBook;
    return (
        <div className="container mx-auto">
            <section
                key={"main.book"}
                className="w-full min-h-[80vh] grid grid-cols-1 md:gap-6 md:grid-cols-2 place-items-center py-28 gap-4"
            >
                <img
                    src={book.image}
                    alt={book.name}
                    className="object-cover rounded-sm shadow-md"
                    height={500}
                    width={500}
                />
                <article className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold tracking-wide">
                            {book.name}
                        </h3>
                        <p className="text-base text-slate-500">
                            {book.description}
                        </p>
                    </div>
                    <div>
                        <ul>
                            {book.keywords?.map((keyword) => (
                                <li key={keyword}>
                                    <Badge className="bg-slate-200 text-slate-800">
                                        # {keyword}
                                    </Badge>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-5xl font-bold">
                            {book.rental_price}$
                        </h1>
                        <div className="space-x-4">
                            <Button disabled={book.isAvailable}>
                                Rent Now
                            </Button>
                            <Button variant={"outline"}>Add to Wishlist</Button>
                        </div>
                    </div>
                </article>
            </section>
            <Separator />
            <section key={"main.suggest"} className="w-full h-screen py-10">
                <h3 className="text-3xl font-medium">You might also like</h3>
            </section>
            <Separator />
            <section key={"main.reviews"} className="w-full h-screen py-10">
                <h3 className="text-3xl font-medium">
                    Reviewers: {book.reviews?.length}
                </h3>
                <div className="space-y-8 my-4">
                    {book.reviews?.map((reviewer) => (
                        <div key={reviewer._id} className="s">
                            <div className="flex gap-4">
                                <h5 className="font-medium text-lg">
                                    {reviewer.user_id}
                                </h5>
                                <h5 className="font-medium text-lg flex w-fit justify-center items-center">
                                    {reviewer.rating}
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
