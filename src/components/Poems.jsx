import { Link } from "react-router-dom";

const Poems = ({ poems, setPoems }) => {
    const handleDelete = async id => {
        if (confirm("¿Deseas eliminar este poema?")) {
            const url = `${import.meta.env.VITE_API_URI}/poems/${id}`;

            try {
                await fetch(url, { method: "DELETE" });
            } catch (e) {
                console.error(e);
            }

            setPoems(poems.filter(poem => poem.id != id));
        }
    };

    return (
        <table
            className="
                w-full
                md:mx-auto
                md:w-[97.5%]
                lg:w-[90%]
                xl:w-3/4
                2xl:w-[65%]
                bg-neutral-800
                table-fixed
                font-bold
                text-center
            "
        >
            <thead className="bg-neutral-900 text-lg">
                <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {poems.map(({ id, title, author }) => (
                    <tr key={id} className="border-b-neutral-700 border-b-[1px]">
                        <td>{title}</td>
                        <td>{author}</td>
                        <td
                            className="
                                my-2
                                mx-auto
                                w-[90%]
                                md:w-full
                                flex
                                flex-col
                                gap-1
                                md:flex-row
                                md:justify-center
                            "
                        >
                            <Link
                                to={`/poem/${id}`}
                                className="py-1 md:w-full bg-green-600 hover:bg-green-700 rounded-sm transition-colors duration-300"
                            >
                                Ver
                            </Link>

                            <Link
                                to={`/edit/${id}`}
                                className="py-1 md:w-full bg-blue-600 hover:bg-blue-700 rounded-sm transition-colors duration-300"
                            >
                                Editar
                            </Link>

                            <button
                                onClick={() => handleDelete(id)}
                                className="py-1 md:w-full bg-red-600 hover:bg-red-700 rounded-sm transition-colors duration-300"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Poems;
