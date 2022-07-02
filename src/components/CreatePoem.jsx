import PoemForm from "./PoemForm";

const CreatePoem = () => {
    return (
        <div className="flex flex-col items-center gap-8">
            <h1 className="font-bold text-3xl">Crear Poema</h1>

            <PoemForm />
        </div>
    );
};

export default CreatePoem;
