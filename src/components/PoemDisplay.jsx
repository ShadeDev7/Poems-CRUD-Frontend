import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

const PoemDisplay = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [poem, setPoem] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchPoem = async () => {
        try {
            const url = `${import.meta.env.VITE_API_URI}/poems/${id}`;
            const request = await fetch(url);
            const response = await request.json();

            switch (response.status) {
                case 200:
                    setPoem(response.data);
                    document.title = `${response.data.title}, ${response.data.author} - Poemas CRUD`;
                    break;
                case 400:
                case 404:
                    navigate("/");
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
        fetchPoem();
    }, []);

    return (
        <div className="flex justify-center">
            {loading ? (
                <Spinner />
            ) : error ? (
                <ErrorMessage>¡Hubo un error al obtener el poema!</ErrorMessage>
            ) : (
                <div
                    className="
                        sm:mx-auto
                        py-8
                        px-4
                        w-full
                        sm:w-3/4
                        md:w-[65%]
                        lg:w-1/2
                        bg-neutral-900
                        rounded
                        flex
                        flex-col
                        items-center
                        gap-2
                        font-bold
                    "
                >
                    <h1 className="italic text-4xl">{poem.title}</h1>

                    <h2 className="text-xl">{poem.author}</h2>

                    <div className="mt-8 text-lg text-center">
                        {poem.content.map((p, i) => (
                            <p key={i} className={`${p === "" ? "py-4" : "-my-1"}`}>
                                {p}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PoemDisplay;
