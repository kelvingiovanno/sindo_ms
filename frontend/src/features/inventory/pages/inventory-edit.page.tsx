import { Card, CardContent } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { Button } from '@/shared/components/ui/button';
import { useParams } from 'react-router';
import { useRef, useState } from 'react';
import { X, Check, ChevronsUpDown } from 'lucide-react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/shared/components/ui/popover';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/shared/components/ui/command';

const brands = [
    'Apple',
    'Samsung',
    'Nike',
    'Adidas',
    'Sony',
    'LG',
    'Panasonic',
    'Samsung',
    'Nike',
    'Adidas',
    'Sony',
    'LG',
    'Panasonic',
    'Samsung',
    'Nike',
    'Adidas',
    'Sony',
    'LG',
    'Panasonic',
];

const InventoryEditPage = () => {
    const { inventoryId } = useParams();

    // 🔹 Image State
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [images, setImages] = useState<string[]>([
        'https://picsum.photos/seed/1/300/200',
        'https://picsum.photos/seed/2/300/200',
        'https://picsum.photos/seed/3/300/200',
    ]);

    // 🔹 Brand Select State
    const [brandOpen, setBrandOpen] = useState(false);
    const [brand, setBrand] = useState('');

    // 🔹 Image Handlers
    const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newImages = Array.from(files).map((file) =>
            URL.createObjectURL(file),
        );

        setImages((prev) => [...prev, ...newImages]);
    };

    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (!files) return;

        const event = {
            target: { files },
        } as React.ChangeEvent<HTMLInputElement>;

        handleAddImages(event);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <>
            {/* Header */}
            <div className="space-y-1">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                    Inventory Edit
                </h1>
                <p className="text-sm text-slate-500">{inventoryId}</p>
            </div>

            {/* Information */}
            <div className="space-y-4">
                <h4 className="text-xl font-semibold text-slate-900">
                    Information
                </h4>

                <Card>
                    <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4">
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input />
                        </div>

                        <div className="space-y-2">
                            <Label>Part Number</Label>
                            <Input />
                        </div>

                        <div className="space-y-2">
                            <Label>Brand</Label>

                            <Popover
                                open={brandOpen}
                                onOpenChange={setBrandOpen}
                            >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className="w-full justify-between font-normal"
                                    >
                                        {brand || 'Select brand'}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent
                                    className="w-(--radix-popover-trigger-width) max-h-96 p-2 rounded-sm"
                                    sideOffset={8}
                                >
                                    <Command className="space-y-2 ">
                                        <CommandInput
                                            className=""
                                            placeholder="Search brand..."
                                        />

                                        <CommandEmpty className="text-xs text-slate-500">
                                            No brand found.
                                        </CommandEmpty>

                                        <CommandGroup className="overflow-y-auto">
                                            {brands.map((item) => (
                                                <CommandItem
                                                    key={item}
                                                    value={item}
                                                    onSelect={(
                                                        currentValue,
                                                    ) => {
                                                        setBrand(currentValue);
                                                        setBrandOpen(false);
                                                    }}
                                                >
                                                    {item}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Input />
                        </div>

                        <div className="space-y-2">
                            <Label>Type</Label>
                            <Input />
                        </div>

                        <div className="space-y-2">
                            <Label>Unit</Label>
                            <Input />
                        </div>

                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input />
                        </div>

                        <div className="space-y-2">
                            <Label>Cost</Label>
                            <Input type="number" />
                        </div>

                        <div className="space-y-2">
                            <Label>Price</Label>
                            <Input type="number" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Images */}
            <div className="space-y-4">
                <h4 className="text-xl font-semibold text-slate-900">Images</h4>

                <Card>
                    <CardContent className="p-4 space-y-4">
                        {/* Preview */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {images.map((src, index) => (
                                <div
                                    key={index}
                                    className="relative group border rounded-sm overflow-hidden"
                                >
                                    <img
                                        src={src}
                                        alt="preview"
                                        className="object-cover aspect-square w-full"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Dropzone */}
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center text-sm text-muted-foreground cursor-pointer hover:bg-muted/50 transition"
                        >
                            <p>Drag & drop images here</p>
                            <p className="text-xs">or click to browse</p>

                            <Input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleAddImages}
                                className="hidden"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Description */}
            <div className="space-y-4">
                <h4 className="text-xl font-semibold text-slate-900">
                    Description
                </h4>

                <Card>
                    <CardContent className="p-4">
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
            </div>
        </>
    );
};

export default InventoryEditPage;
