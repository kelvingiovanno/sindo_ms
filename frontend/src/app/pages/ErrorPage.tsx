const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
            <div className="text-center">
                <h1 className="text-4xl font-semibold text-slate-800">
                    Something went wrong
                </h1>

                <p className="mt-3 text-slate-600">
                    An unexpected error occurred.
                </p>

                <a
                    href="/"
                    className="inline-block mt-6 rounded-md bg-slate-900 px-5 py-2 text-sm text-white hover:bg-slate-700"
                >
                    Go back home
                </a>
            </div>
        </div>
    );
};

export default ErrorPage;
