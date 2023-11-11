import { getAllTransactionUser } from "@/apis/transaction/getAllTransaction";
import MetaData from "@/components/metadata";
import TransactionTable from "@/components/transaction-table/transaction-table";

function AdminTransaction() {
    return (
        <>
            <MetaData title="Transactions" />
            <TransactionTable getAllTransaction={getAllTransactionUser} />
        </>
    );
}
export default AdminTransaction;
