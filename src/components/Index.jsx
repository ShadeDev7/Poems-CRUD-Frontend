import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation, Link } from "react-router-dom";

import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import Poems from "./Poems";
import Paginator from "./Paginator";

const Index = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { state } = useLocation();

    const [poems, setPoems] = useState([]);
    const [paginator, setPaginator] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchPoems = async () => {
        const quantity = searchParams.get("quantity") ?? 5;
        const page = searchParams.get("page") ?? 1;

        try {
            const url = `${import.meta.env.VITE_API_URI}/poems?quantity=${quantity}&page=${page}`;
            const request = await fetch(url);
            const response = await request.json();

            switch (response.status) {
                case 200:
                    if (response.data.length <= 0 && page > 1) {
                        setLoading(false);

                        return navigate("/", { state: { reload: true } });
                    }
                    setPoems(response.data);
                    setPaginator({
                        quantity: response.data.length,
                        previous: response.previousPage,
                        next: response.nextPage,
                    });
                    break;
                case 500:
                    setError(true);
                    break;
            }
        } catch (e) {
            setError(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPoems();
    }, []);

    useEffect(() => {
        if (state?.reload) fetchPoems();
    }, [state]);

    return (
        <div className="flex flex-col items-center gap-8">
            {loading ? (
                <Spinner />
            ) : error ? (
                <ErrorMessage>¡Hubo un error al obtener los poemas!</ErrorMessage>
            ) : (
                <>
                    <Link
                        to="/create"
                        className="
                            py-1
                            w-32
                            md:w-48
                            bg-white
                            hover:bg-neutral-200
                            rounded-sm
                            font-bold
                            text-lg
                            text-center
                            text-black
                            transition-colors
                            duration-300
                        "
                    >
                        Crear
                    </Link>

                    {poems.length > 0 ? (
                        <>
                            <Poems poems={poems} setPoems={setPoems} />

                            <Paginator paginator={paginator} />
                        </>
                    ) : (
                        <p className="font-bold text-4xl text-center">¡No hay poemas!</p>
                    )}
                </>
            )}
        </div>
    );
};

export default Index;
