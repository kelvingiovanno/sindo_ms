import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

type Props = {
    page: number;
    row: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onRowChange: (row: number) => void;
    isLoading: boolean;
};

const Pangination = ({
    page,
    row,
    totalPages,
    onPageChange,
    onRowChange,
    isLoading,
}: Props) => {
    const getVisiblePages = (page: number, totalPages: number) => {
        const maxVisible = 5;

        let start = page - 2;
        let end = page + 2;

        if (page <= 3) {
            start = 1;
            end = Math.min(maxVisible, totalPages);
        }

        if (page >= totalPages - 2) {
            end = totalPages;
            start = Math.max(1, totalPages - maxVisible + 1);
        }

        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pages = getVisiblePages(page, totalPages);

    return (
        <div
            className={`w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between transition-opacity ${
                isLoading ? 'opacity-60 animate-pulse pointer-events-none' : ''
            }`}
        >
            <div className="flex items-center justify-between sm:justify-start gap-2">
                <span className="text-xs text-slate-500 whitespace-nowrap">
                    Rows per page:
                </span>

                <Select
                    value={row.toString()}
                    onValueChange={(val) => {
                        if (isLoading) return;
                        onRowChange(Number(val));
                    }}
                >
                    <SelectTrigger
                        className={`text-xs ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        size="sm"
                    >
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent
                        className="min-w-(--radix-select-trigger-width)"
                        position="popper"
                    >
                        <SelectItem className="text-xs" value="10">
                            10
                        </SelectItem>
                        <SelectItem className="text-xs" value="25">
                            25
                        </SelectItem>
                        <SelectItem className="text-xs" value="50">
                            50
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <Pagination>
                    <PaginationContent className="flex flex-wrap justify-center sm:justify-end">
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                className={`text-xs ${
                                    isLoading
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!isLoading && page > 1) {
                                        onPageChange(page - 1);
                                    }
                                }}
                            />
                        </PaginationItem>

                        {pages.map((p) => (
                            <PaginationItem key={p}>
                                <PaginationLink
                                    href="#"
                                    isActive={p === page}
                                    className={`text-xs ${
                                        isLoading
                                            ? 'opacity-50 cursor-not-allowed'
                                            : ''
                                    }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (!isLoading) {
                                            onPageChange(p);
                                        }
                                    }}
                                >
                                    {p}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                className={`text-xs ${
                                    isLoading
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!isLoading && page < totalPages) {
                                        onPageChange(page + 1);
                                    }
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

                <span className="text-xs text-slate-500 text-center sm:text-left flex items-center gap-2">
                    {isLoading && (
                        <span className="h-3 w-3 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
                    )}
                    Showing {totalPages === 0 ? 0 : page * row - row + 1} -{' '}
                    {page * row} of {totalPages}
                </span>
            </div>
        </div>
    );
};

export default Pangination;
