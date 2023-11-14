import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { IBreadcrumb } from "@/components/breadcrumb/type";
import React from "react";

function Policy() {
    const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
        return [
            {
                label: "Home",
                key: "home",
                href: "/",
                icon: "smartHome",
            },
            {
                key: "policy",
                label: "policy", // Handle book.name when book is null
            },
        ];
    }, []);
    return (
        
        <div className="bg-gray-100 font-sans">
            <Breadcrumb items={breadcrumb} className="my-4 mx-4 p-4 ml-16" />
            <div className="container mx-auto mt-4 mb-8 p-4 bg-white shadow-lg max-w-2xl">
                <h1 className="text-3xl font-bold mb-8">
                    Book borrowing and returning policy
                </h1>

                <section>
                    <h2 className="text-xl font-semibold m-4 ">
                        1. Procedures for borrowing books:
                    </h2>
                    <p className="pl-8">
                        - To borrow books, you need to provide personal
                        information and images of the front and back of your
                        citizen identification card.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold m-4">
                        2. Book borrowing and returning policy:
                    </h2>
                    <div  className="pl-8">
                    <p>
                        - <strong>Maximum number of books to borrow:</strong> Unlimited quanity.
                    </p>
                    <p>- <strong>Book loan term:</strong> No time limit.</p>
                    <p>
                        - <strong>Renewal policy:</strong> You must renew your book by an
                        expiration date(You can renew your book on website
                        BRental in Order section of that book).{" "}
                    </p>
                    <p>- Penalty fee policy:</p>
                    <ul className="list-disc pl-4">
                        <p>
                            {" "}
                            + <strong>Penalty expired</strong>(If book is due and reader does not
                            return the book or does not renew): (book rental fee
                            for one day * 120%)/day
                        </p>
                        <p> + <strong>Book damage:</strong></p>
                        <ul className="list-disc pl-4">
                            <p>
                                1. Non-serious damage (writing, drawing, or
                                marking in books): 1% of book price/page.
                            </p>
                            <p>
                                2. Damage to a degree that can still be
                                restored: 50% of book price/volume.
                            </p>
                            <p>
                                3. Loss or serious damage to books (mutilated,
                                torn, unable to read text or images):
                            </p>
                            <ul className="list-disc pl-4">
                                <p>
                                    a. In case the reader buys a refund for
                                    BRental himself: The reader returns the book
                                    to the library within a period of no more
                                    than 30 days.
                                </p>
                                <p>
                                    b. In case readers want BRental to buy for
                                    them:
                                </p>
                                <ul className="list-disc pl-8">
                                    <li>
                                        If the document can be purchased:
                                        Current price * 120%;
                                    </li>
                                    <li>
                                        If documents cannot be purchased: Fine
                                        amount = number of pages x (actual value
                                        of book * 3%).{" "}
                                    </li>
                                </ul>
                            </ul>
                        </ul>
                    </ul>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold m-4">
                        3. Book borrowing process:
                    </h2>
                    <ol start={1} className="list-decimal pl-12">
                        <li>Select the book you want to borrow.</li>
                        <li>
                            Provide complete and accurate personal information
                            and delivery information.
                        </li>
                        <li>Proceed to pay for books.</li>
                        <li>
                            Brental will send automatic emails to readers to
                            remind readers about borrowing and returning books,
                            fines and other notices.
                        </li>
                    </ol>
                </section>

                <section>
                    <h2 className="text-xl font-semibold m-4">
                        4. Book return process:
                    </h2>
                    <ol className="list-decimal pl-12">
                        <li>
                            {" "}
                            Brental will contact you about the book return
                            process.
                        </li>
                        <li>Book return method:</li>
                        <ul className="list-decimal pl-4">
                            <p>
                                - Return at the facility: Readers come to our
                                facility to carry out the book return procedure.
                            </p>
                            <ul className="list-decimal pl-8">
                                <p>
                                    + Brental will inspect and evaluate books
                                    for damage. If the book is damaged, the
                                    reader must pay a penalty fee.
                                </p>
                            </ul>
                            <p>- Return books by delivery method:</p>
                            <ul className="list-decimal pl-8">
                                <p> + Readers will pay delivery fees.</p>
                                <p>
                                    {" "}
                                    + Inspect and evaluate books for damage. If
                                    the book is damaged, the reader must pay a
                                    penalty fee.
                                </p>
                                <p>
                                    {" "}
                                    + After completing the book review process:
                                    Readers will have to pay the penalty fee via
                                    online method within 14 days.
                                </p>
                            </ul>
                        </ul>
                        <p>
                            P/s: If readers do not comply with the regulations,
                            Brental will invite legal intervention.
                        </p>
                    </ol>
                </section>

                <section>
                    <h2 className="text-xl font-semibold m-4">
                        5. General regulations:
                    </h2>
                    <p  className="pl-8">
                        - Readers, please join us in preserving books well; Do
                        not write, draw, crop, tear or mark the book.
                    </p>
                    <p  className="pl-8">
                        -  Correctly follow <strong>BRental's</strong> book borrowing and
                        returning process.
                    </p>
                </section>
            </div>
        </div>
    );
}
export default Policy;
