import { useLoaderData } from "react-router-dom";

function GenrePage() {
    const loader = useLoaderData() as Record<string, unknown>;
    return (
        <main className="container mx-auto grid place-items-center min-h-screen">
            <code>
                <span className="font-bold">Loader:</span>
                <br />
                {JSON.stringify(loader, null, 4)}
            </code>
        </main>
    );
}

export default GenrePage;
