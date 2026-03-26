import { useParams } from "react-router";

/* ================= MOCK DATA ================= */

const attributes = [
    { name: 'Length', value: '20 cm' },
    { name: 'Weight', value: '5 kg' },
    { name: 'Voltage', value: '220V' },
];

const models = ['S6R', 'Yanmar'];

/* ================= COMPONENT ================= */

const InfoItem = ({ label, value }: any) => (
    <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-medium text-slate-900">{value}</p>
    </div>
);

const Card = ({ title, children }: any) => (
    <div className="space-y-3">
        <p className="text-base font-semibold text-slate-900">{title}</p>
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
            {children}
        </div>
    </div>
);

/* ================= PAGE ================= */

const InventoryDetailPage = () => {
    const { inventoryId } = useParams();

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold text-slate-900">
                        Oil Filter
                    </h1>
                    <p className="text-sm text-slate-500">INV-001 • PN-001</p>
                </div>

                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                    In Stock
                </span>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                    <p className="text-xs text-slate-500">Current Stock</p>
                    <p className="text-2xl font-semibold text-slate-900 mt-1">
                        120
                    </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                    <p className="text-xs text-slate-500">Min Stock</p>
                    <p className="text-2xl font-semibold text-slate-900 mt-1">
                        50
                    </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                    <p className="text-xs text-slate-500">Status</p>
                    <p className="text-lg font-semibold text-green-600 mt-1">
                        In Stock
                    </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                    <p className="text-xs text-slate-500">Inventory Value</p>
                    <p className="text-lg font-semibold text-slate-900 mt-1">
                        Rp 14.400.000
                    </p>
                </div>
            </div>

            {/* BASIC INFORMATION */}
            <Card title="Basic Information">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* LEFT SIDE */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <InfoItem label="Part Number" value="37540-11100" />
                            <InfoItem label="Brand" value="Mitsubishi" />
                            <InfoItem label="Category" value="Filter" />
                            <InfoItem label="Cost" value="Rp 100.000" />
                            <InfoItem label="Price" value="Rp 120.000" />
                            <InfoItem label="Type" value="Local" />
                        </div>

                        {/* MODELS */}
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <p className="text-xs font-medium text-slate-500 mb-3">
                                Compatible Models
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {models.map((m, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 rounded-full bg-white border text-sm font-medium text-slate-700 shadow-sm"
                                    >
                                        {m}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* MEASUREMENTS */}
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <p className="text-xs font-medium text-slate-500 mb-3">
                                Measurements
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {attributes.map((attr, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 rounded-full bg-white border text-sm shadow-sm"
                                    >
                                        <span className="text-slate-500">
                                            {attr.name}
                                        </span>{" "}
                                        <span className="font-medium text-slate-800">
                                            {attr.value}
                                        </span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="md:col-span-1">
                        <div className="h-full bg-slate-50 border border-slate-300 rounded-lg p-5 flex flex-col justify-between">
                            
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                                    Description
                                </p>

                                <p className="text-sm text-slate-400 italic leading-relaxed">
                                    No description available.
                                </p>

                                {/* 🔥 MARGIN HERE */}
                                <div className="mt-5 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
                                    <p className="text-xs text-green-600 mb-1">
                                        Margin
                                    </p>
                                    <p className="text-lg font-semibold text-green-700">
                                        Rp 20.000
                                    </p>
                                    <p className="text-xs text-green-600">
                                        20% profit
                                    </p>
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="mt-6 pt-4 border-t border-slate-300 text-xs text-slate-400">
                                Last updated: Feb 2026
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* INVENTORY MOVEMENT */}
            <Card title="Inventory Movement">
                <div className="overflow-hidden rounded-lg border border-slate-200">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-100 text-slate-500 text-xs">
                                <th className="text-left px-4 py-3">Date</th>
                                <th className="text-left px-4 py-3">Type</th>
                                <th className="text-left px-4 py-3">
                                    Reference
                                </th>
                                <th className="text-right px-4 py-3">Qty</th>
                                <th className="text-right px-4 py-3">
                                    Balance
                                </th>
                                <th className="text-left px-4 py-3">
                                    Description
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200">
                            <tr className="hover:bg-slate-50">
                                <td className="px-4 py-3">26 Feb 2026</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700 font-medium">
                                        Stock In
                                    </span>
                                </td>
                                <td className="px-4 py-3">PO-00123</td>
                                <td className="px-4 py-3 text-right text-green-600 font-medium">
                                        +50
                                </td>
                                <td className="px-4 py-3 text-right">120</td>
                                <td className="px-4 py-3 text-slate-600">
                                    Purchase from supplier
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default InventoryDetailPage;