import { getAllTransactionUser } from "@/apis/transaction/getAllTransaction";
import TransactionTable from "@/components/transaction-table/transaction-table";

export default function UserTransaction() {
    return <TransactionTable getAllTransaction={getAllTransactionUser} />;
}
