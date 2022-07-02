import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import ErrorMessage from "./ErrorMessage";

const PoemForm = ({ poem }) => {
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const poemSchema = Yup.object().shape({
        title: Yup.string()
            .min(4, "¡El título es muy corto!")
            .max(64, "¡El título es muy extenso!")
            .required("¡El título es obligatorio!"),
        author: Yup.string()
            .min(8, "¡El nombre del autor es muy corto!")
            .max(32, "¡El nombre del autor es muy extenso!")
            .required("¡El nombre del autor es obligatorio!"),
        content: Yup.string()
            .min(8, "¡El contenido del poema es muy corto!")
            .required("¡El contenido del poema es obligatorio!"),
    });

    const handleSubmit = async values => {
        try {
            const url = `${import.meta.env.VITE_API_URI}/poems/${poem?.id ?? ""}`;

            await fetch(url, {
                headers: { "Content-Type": "application/json" },
                method: `${poem?.id ? "PUT" : "POST"}`,
                body: JSON.stringify(values),
            });

            navigate("/");
        } catch (e) {
            setError(true);
        }
    };

    return (
        <>
            {error && (
                <ErrorMessage>
                    ¡Ha ocurrido un error intentando {poem ? "editar" : "crear"} el poema!
                </ErrorMessage>
            )}

            <Formik
                initialValues={{
                    title: poem?.title ?? "",
                    author: poem?.author ?? "",
                    content: poem?.content ?? "",
                }}
                enableReinitialize={true}
                onSubmit={async (values, { resetForm }) => {
                    await handleSubmit(values);
                    resetForm();
                }}
                validationSchema={poemSchema}
            >
                {({ errors, touched }) => (
                    <Form
                        autoComplete="off"
                        className="
                            mx-auto
                            py-8
                            px-4
                            sm:px-8
                            w-[90%]
                            sm:w-[85%]
                            md:w-[75%]
                            lg:w-[60%]
                            xl:w-[45%]
                            2xl:w-[35%]
                            bg-neutral-900
                            rounded
                            flex
                            flex-col
                            gap-4
                        "
                    >
                        <div className="flex flex-col gap-1">
                            {errors.title && touched.title && (
                                <ErrorMessage>{errors.title}</ErrorMessage>
                            )}

                            <label htmlFor="title" className="font-bold italic text-lg">
                                Título
                            </label>

                            <Field
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Título del poema"
                                className="p-2 rounded-sm text-black"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            {errors.author && touched.author && (
                                <ErrorMessage>{errors.author}</ErrorMessage>
                            )}

                            <label htmlFor="author" className="font-bold italic text-lg">
                                Autor
                            </label>

                            <Field
                                id="author"
                                name="author"
                                type="text"
                                placeholder="Autor del poema"
                                className="p-2 rounded-sm text-black"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            {errors.content && touched.content && (
                                <ErrorMessage>{errors.content}</ErrorMessage>
                            )}

                            <label htmlFor="content" className="font-bold italic text-lg">
                                Contenido del Poema
                            </label>

                            <Field
                                as="textarea"
                                id="content"
                                name="content"
                                type="text"
                                placeholder="Contenido del poema"
                                className="p-2 h-64 2xl:h-72 rounded-sm text-black resize-none"
                            />
                        </div>

                        <input
                            type="submit"
                            value={poem?.id ? "Editar" : "Crear"}
                            className="
                                mt-4
                                mx-auto
                                py-1
                                w-full
                                bg-white
                                hover:bg-neutral-200
                                hover:cursor-pointer
                                rounded-sm
                                font-bold
                                text-lg
                                text-black
                                text-center
                                transition-colors
                                duration-300
                            "
                        />
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default PoemForm;
