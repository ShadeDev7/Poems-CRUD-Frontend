import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div
            className="
                w-full
                min-h-screen
                flex
                flex-col
                justify-between
                items-center
            "
        >
            <header className="py-8 w-full bg-neutral-900 flex justify-center">
                <Link
                    to="/"
                    className="
                        font-bold
                        italic
                        text-4xl
                        md:hover:text-red-800
                        text-center
                        transition-colors
                        duration-500
                    "
                >
                    Poemas CRUD
                </Link>
            </header>

            <main className="my-8 mx-auto w-11/12">
                <Outlet />
            </main>

            <footer className="py-8 w-full bg-neutral-900 flex justify-center">
                <p className="font-semibold text-center">
                    Hecho con ❤️ por{" "}
                    <a
                        href="https://twitter.com/4gusjk"
                        target="_blank"
                        className="
                            font-bold
                            text-red-500
                            hover:text-red-600
                            transition-colors
                            duration-300
                        "
                    >
                        Agustín Arnoldi
                    </a>
                </p>
            </footer>
        </div>
    );
};

export default Layout;
