import HistoryOrderTable from "@/components/historyOrder-table/historyorder-table";
import MetaData from "@/components/metadata";

function HistoryOrderPage() {
    return (
        <>
            <MetaData title="Orders" />
            <HistoryOrderTable />;
        </>
    );
}

export default HistoryOrderPage;
