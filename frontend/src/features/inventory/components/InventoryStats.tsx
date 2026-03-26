const InventoryStats = () => {
    const inStock = 250;
    const lowStock = 600;
    const outOfStock = 300;
    const total = inStock + lowStock + outOfStock;

    const inStockPercent = (inStock / total) * 100;
    const lowStockPercent = (lowStock / total) * 100;
    const outOfStockPercent = (outOfStock / total) * 100;

    return (
        <div className="bg-white p-4 sm:p-6 rounded-sm border border-slate-300 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 w-full max-w-md sm:max-w-lg lg:max-w-2xl">
            <div className="flex flex-col gap-1 pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-slate-200 lg:pr-6 min-w-0">
                <p className="text-sm text-slate-500">Total Inventory Value</p>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900 wrap-break-word">
                    IDR 12.000.000.000
                </h2>
            </div>

            <div className="flex-1 min-w-0">
                <div className="w-full space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                            {total.toLocaleString()}
                        </h2>
                        <span className="text-sm text-slate-500">
                            Total Inventory
                        </span>
                    </div>

                    <div className="w-full h-2 rounded bg-slate-100 overflow-hidden flex">
                        <div
                            className="bg-green-500"
                            style={{ width: `${inStockPercent}%` }}
                        />
                        <div
                            className="bg-yellow-500"
                            style={{ width: `${lowStockPercent}%` }}
                        />
                        <div
                            className="bg-red-500"
                            style={{ width: `${outOfStockPercent}%` }}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded bg-green-500 shrink-0" />
                            <span>In stock: {inStock}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded bg-yellow-500 shrink-0" />
                            <span>Low stock: {lowStock}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded bg-red-500 shrink-0" />
                            <span>Out of stock: {outOfStock}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryStats;
