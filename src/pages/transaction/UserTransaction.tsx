import { getAllTransactionUser } from "@/apis/transaction/getAllTransaction";
import MetaData from "@/components/metadata";
import TransactionTable from "@/components/transaction-table/transaction-table";

export default function UserTransaction() {
    return (
        <main className="container mx-auto">
            <MetaData title="Transactions" />
            <TransactionTable getAllTransaction={getAllTransactionUser} />;
        </main>
    );
}
