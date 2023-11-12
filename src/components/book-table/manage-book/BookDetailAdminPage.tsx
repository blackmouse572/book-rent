import { getBookById } from "@/apis/book/getBook";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { IBook } from "@/types";
import { useEffect, useState } from "react";

export function BookDetailAdminPage() {
    const [book, setBook] = useState<IBook | null>(null);

    useEffect(() => {
        const bookId = window.location.pathname.split("/")[3];

        // Make an API request to fetch book data
        getBookById(bookId).then((bookData) => {
            setBook(bookData);
        });
    }, []);

    if (!book) {
        return <div>Book not found.</div>;
    }

    return (
        <div
            style={{
                borderCollapse: "collapse",
            }}
            className="container mx-auto p-10"
        >
            <div style={{ flex: 1, marginRight: "20px" }}>
                <h2 className="text-3xl font-bold mb-4 text-center">
                    Book Detail
                </h2>
                <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-300 rounded-lg overflow-hidden mb-8">
                    <tbody className="divide-y divide-gray-200">
                        <tr className="bg-gray-50">
                            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Field
                            </td>
                            <td className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">
                                Value
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    ID
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center text-gray-500">
                                    {book._id}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Name
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center text-gray-500">
                                    {book.name}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Author
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center text-gray-500">
                                    {book.author}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Image
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center text-gray-500">
                                    <img
                                        src={book.image}
                                        style={{ maxWidth: 300 }}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Description
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center text-gray-500">
                                    {book.description
                                        .split(".")
                                        .map((line, index) => (
                                            <span key={index}>
                                                {line}
                                                <br />
                                            </span>
                                        ))}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Rental Price
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center  text-red-500 ">
                                    {formatPrice(book.rental_price)}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Status
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center text-gray-500">
                                    <Badge>{book.status}</Badge>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={{ flex: 1, marginTop: 50 }}>
                <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-300 rounded-lg overflow-hidden">
                    <tbody className="divide-y divide-gray-200">
                        <tr className="bg-gray-50">
                            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </td>
                        </tr>
                        {book.category?.map((item, index) => (
                            <tr key={index} className="bg-white">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        Name: {item.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Status: {item.status}
                                    </div>
                                    <div
                                        className="text-sm text-gray-500"
                                        style={{
                                            maxWidth: 120,
                                            wordWrap: "break-word",
                                        }}
                                    >
                                        Description: {item.description}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-300 rounded-lg overflow-hidden">
                    <tbody className="divide-y divide-gray-200">
                        <tr className="bg-gray-50">
                            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                genres
                            </td>
                        </tr>
                        <tr className="bg-white">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                    Genre: {book.genres}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="divide-y divide-gray-200 bg-white border border-gray-300 rounded-lg overflow-hidden">
                    <tbody className="divide-y divide-gray-200">
                        <tr className="bg-gray-50">
                            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                reviews
                            </td>
                        </tr>
                        {book.reviews?.map((item, index) => (
                            <tr key={index} className="bg-white">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        Id: {item._id}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Author: {item.author.fullName}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Comment: {item.comment}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Rating: {item.rating}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        createdAt: {item.createdAt.toString()}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        updatedAt: {item.updatedAt.toString()}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
