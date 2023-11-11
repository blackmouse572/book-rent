import { getAllTransactionAdmin } from "@/apis/transaction/getAllTransaction";
import TransactionTable from "@/components/transaction-table/transaction-table";

function AdminTransaction() {
    return <TransactionTable getAllTransaction={getAllTransactionAdmin} />;
}
export default AdminTransaction;
