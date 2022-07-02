import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Spinner from "./Spinner";
import PoemForm from "./PoemForm";

const EditPoem = () => {
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
                    setPoem({ ...response.data, content: response.data.content.join("\n") });
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
        <div className="w-full flex flex-col items-center gap-8">
            <h1 className="font-bold text-3xl">Editar Poema</h1>

            {loading ? <Spinner /> : error ? navigate("/") : <PoemForm poem={poem} />}
        </div>
    );
};

export default EditPoem;
