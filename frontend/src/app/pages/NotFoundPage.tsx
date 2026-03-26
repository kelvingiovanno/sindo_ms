const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
            <div className="text-center">
                <h1 className="text-7xl font-semibold text-slate-800">404</h1>

                <p className="mt-4 text-lg text-slate-600">Page not found</p>

                <p className="mt-2 text-sm text-slate-500">
                    The page you are looking for doesn’t exist.
                </p>

                <a
                    href="/"
                    className="inline-block mt-6 rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700 transition"
                >
                    Go back home
                </a>
            </div>
        </div>
    );
};

export default NotFoundPage;
