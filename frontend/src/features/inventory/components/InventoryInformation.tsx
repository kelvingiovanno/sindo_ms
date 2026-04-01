import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent } from '@/shared/components/ui/card';
import type { Inventory } from '../types/inventory.type';
import { formatCurrencyIDR } from '@/shared/utils/number.utils';

const InventoryInformation = ({
    data,
    isLoading,
}: {
    data: Inventory;
    isLoading: boolean;
}) => {
    return (
        <Card
            className={`md:col-span-2 ${
                isLoading ? 'opacity-70 animate-pulse' : ''
            }`}
        >
            <CardContent className="flex flex-col gap-6 h-full">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <p className="text-xs text-slate-500">Name</p>
                        <p className="text-sm font-medium text-slate-900">
                            {isLoading ? (
                                <div className="h-4 w-1/2 bg-slate-200 rounded my-1" />
                            ) : (
                                (data.name ?? '-')
                            )}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Code</p>
                        <p className="text-sm font-medium text-slate-900">
                            {isLoading ? (
                                <div className="h-4 w-1/2 bg-slate-200 rounded my-1" />
                            ) : (
                                (data.code ?? '-')
                            )}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Part Number</p>
                        <p className="text-sm font-medium text-slate-900">
                            {isLoading ? (
                                <div className="h-4 w-1/2 bg-slate-200 rounded my-1" />
                            ) : (
                                (data.partnumber ?? '-')
                            )}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Brand</p>
                        <p className="text-sm font-medium text-slate-900">
                            {isLoading ? (
                                <div className="h-4 w-1/2 bg-slate-200 rounded my-1" />
                            ) : (
                                (data.brand ?? '-')
                            )}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Category</p>
                        <p className="text-sm font-medium text-slate-900">
                            {isLoading ? (
                                <div className="h-4 w-1/2 bg-slate-200 rounded my-1" />
                            ) : (
                                (data.category ?? '-')
                            )}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Type</p>
                        <p className="text-sm font-medium text-slate-900">
                            {isLoading ? (
                                <div className="h-4 w-1/2 bg-slate-200 rounded my-1" />
                            ) : (
                                (data.type ?? '-')
                            )}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Cost</p>
                        <p className="text-sm font-medium text-slate-900">
                            {isLoading ? (
                                <div className="h-4 w-1/2 bg-slate-200 rounded my-1" />
                            ) : (
                                (formatCurrencyIDR(data.cost) ?? '-')
                            )}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Price</p>
                        <p className="text-sm font-medium text-slate-900">
                            {isLoading ? (
                                <div className="h-4 w-1/2 bg-slate-200 rounded my-1" />
                            ) : (
                                (formatCurrencyIDR(data.price) ?? '-')
                            )}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Margin</p>
                        <p className="text-sm font-medium text-slate-900">
                            {isLoading ? (
                                <div className="h-4 w-1/2 bg-slate-200 rounded my-1" />
                            ) : data.price && data.price ? (
                                formatCurrencyIDR(data.price - data.cost)
                            ) : (
                                '-'
                            )}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full ">
                    <div className="flex flex-col space-y-4 h-full">
                        <div className="flex-1 bg-slate-50 rounded-sm p-4 border border-slate-300">
                            <p className="text-xs font-medium text-slate-500 mb-2">
                                Compatible Models
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {isLoading ? (
                                    Array.from({ length: 4 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-4 w-15 bg-slate-200 rounded animate-pulse"
                                        />
                                    ))
                                ) : data.models.length === 0 ? (
                                    <span className="text-slate-500 text-xs mt-1">
                                        No models
                                    </span>
                                ) : (
                                    data.models.map((item, i) => (
                                        <Badge key={i} className="bg-zinc-800">
                                            {item}
                                        </Badge>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="flex-1 bg-slate-50 rounded-sm p-4 border border-slate-300">
                            <p className="text-xs font-medium text-slate-500 mb-2">
                                Measurements
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {isLoading ? (
                                    Array.from({ length: 4 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-4 w-15 bg-slate-200 rounded animate-pulse"
                                        />
                                    ))
                                ) : data.measurements.length === 0 ? (
                                    <span className="text-slate-500 text-xs mt-1">
                                        No measurements
                                    </span>
                                ) : (
                                    data.measurements.map((item, i) => (
                                        <Badge key={i} className="bg-zinc-800">
                                            {item}
                                        </Badge>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-sm p-4 border border-slate-300">
                        <p className="text-xs font-medium text-slate-500 mb-2">
                            Description
                        </p>
                        <p className="text-xs text-slate-700">
                            {isLoading ? (
                                <>
                                    <div className="h-4 w-3/4 bg-slate-200 rounded my-1" />
                                    <div className="h-4 w-1/2 bg-slate-200 rounded my-1" />
                                    <div className="h-4 w-2/3 bg-slate-200 rounded my-1" />
                                </>
                            ) : (
                                (data.description ?? '-')
                            )}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default InventoryInformation;
