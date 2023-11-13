import { formatPrice } from "@/lib/utils";
import { IBook } from "@/types";
import { Link } from "react-router-dom";

type Props = { book: IBook };

function Book({ book }: Props) {
    return (
        <Link
            to={`/books/${book._id}`}
            key={book._id}
            className="w-full h-full group max-w-screen-sm"
        >
            <div className="overflow-clip aspect-[5/7] rounded-md shadow-md border border-gray-200 group-hover:shadow-xl transition-all duration-300">
                <img
                    src={book.image}
                    alt={book.name}
                    className="aspect-[5/7] object-contain group-hover:scale-105 transition-all duration-300"
                    height={700}
                    width={500}
                />
            </div>
            <h3 className="text-base font-medium">{book.name}</h3>
            <p className="text-xs">By&nbsp;{book.author}</p>
            <h6 className="text-lg font-bold mt-1">
                {formatPrice(book.rental_price)}/day
            </h6>
        </Link>
    );
}

export default Book;
