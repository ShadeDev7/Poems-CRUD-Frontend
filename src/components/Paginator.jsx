const Paginator = ({ paginator }) => {
    const { quantity, previous, next } = paginator;

    return (
        <>
            {(previous || next) && (
                <div
                    className="
                        flex
                        justify-center
                        items-center
                        gap-8
                        font-bold
                        text-center
                    "
                >
                    {previous && (
                        <a
                            href={`/?quantity=${quantity}&page=${previous}`}
                            className="
                                py-1
                                md:py-2
                                w-24
                                md:w-32
                                bg-orange-700
                                hover:bg-orange-800
                                rounded-sm
                                transition-colors
                                duration-300
                            "
                        >
                            Previous
                        </a>
                    )}

                    {next && (
                        <a
                            href={`/?quantity=${quantity}&page=${next}`}
                            className="
                                py-1
                                md:py-2
                                w-24
                                md:w-32
                                bg-orange-700
                                hover:bg-orange-800
                                rounded-sm
                                transition-colors
                                duration-300
                            "
                        >
                            Next
                        </a>
                    )}
                </div>
            )}
        </>
    );
};

export default Paginator;
