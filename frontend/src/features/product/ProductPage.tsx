import { useEffect } from "react";

import { ArrowUpDown, Search } from "lucide-react";
import { useSearchParams } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import ProductTable from "./components/ProductTable";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { InventoryStatusBar } from "./components/InventoryStatusBar";
import ProductFilterMenu from "./components/ProductFilter";
import { Field, FieldLabel } from "@/shared/components/ui/field";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/shared/components/ui/pagination";

const ProductPage = () => {
    const [params] = useSearchParams();

    const status = params.get("status");
    

    useEffect(() => {
        console.log('rerender', status);
    });

    return (
        <>
            <div className="mb-4 flex justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-slate-900">
                        Invetory 
                    </h1>
                    <p className="text-sm text-slate-500">
                        Add, edit, and organize your products
                    </p>
                </div>
            </div>

            <div className="bg-white p-6 mb-4 rounded-sm border border-slate-300 flex items-center gap-6 w-fit">
                
                <div className="flex flex-col border-r w-84">
                    <p
                        className="text-sm text-slate-500"
                    >
                        Total Inventory Value
                    </p>
                    <h2
                        className="text-2xl font-semibold"
                    >
                        IDR 10.000.0000
                    </h2>
                </div>

                <InventoryStatusBar
                    total={1452+355+186}
                    inStock={1452}
                    lowStock={355}
                    outOfStock={186}
                />
            </div>

            <div className="bg-white p-6 rounded-sm border border-slate-300 space-y-4">

                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3 md:gap-0 mb-4">
                    <div className="flex gap-3 ">

                        <div className="relative">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <Input
                                type="text"
                                placeholder="Search by part number, name, or sku..."
                                className="w-sm pl-9 pr-3 py-2 text-sm text-slate-700 bg-slate-50 border border-slate-300 rounded-sm placeholder:text-sm placeholder:text-slate-500 "
                                
                            />
                        </div>

                        <ProductFilterMenu/>

                        <Select defaultValue="none">
                            <SelectTrigger className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
                                <ArrowUpDown className="h-4 w-4 text-slate-500" />
                                <SelectValue placeholder="Sort" />
                            </SelectTrigger>

                            <SelectContent position="popper">
                                <SelectGroup className="text-slate-700">
                                <SelectItem value="none">Default</SelectItem>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="oldest">Oldest</SelectItem>
                                <SelectItem value="name_asc">Name A → Z</SelectItem>
                                <SelectItem value="name_desc">Name Z → A</SelectItem>
                                <SelectItem value="stock_desc">Stock High → Low</SelectItem>
                                <SelectItem value="stock_asc">Stock Low → High</SelectItem>
                                <SelectItem value="price_desc">Price High → Low</SelectItem>
                                <SelectItem value="price_asc">Price Low → High</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>  
                    </div>       

                    <Button>
                        Add Inventory
                    </Button>
                </div>
                <ProductTable />

                <div className="flex items-center justify-between gap-4 ">
                    <Field orientation="horizontal" className="w-fit">
                        <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
                        <Select defaultValue="25">
                        <SelectTrigger className="w-20" id="select-rows-per-page">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent align="start">
                            <SelectGroup>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                    </Field>
                    <Pagination className="flex justify-end">
                        <PaginationContent>
                        <PaginationItem>
                        <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </>
    );
};

export default ProductPage;