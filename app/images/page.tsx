"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader, DialogDescription } from "@/components/ui/dialog";

type ImageData = {
    id: string;
    url: string;
    title: string;
    file?: File;
};

const INITIAL_IMAGES: ImageData[] = [
    { id: "1", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=600&fit=crop", title: "Setup" },
    { id: "2", url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=600&fit=crop", title: "Code" },
    { id: "3", url: "https://images.unsplash.com/photo-1522252234503-e356532ceff5?w=600&h=600&fit=crop", title: "Desk" },
];

export default function ImagesPage() {
    const [images, setImages] = useState<ImageData[]>(INITIAL_IMAGES);
    const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const newImage: ImageData = {
                id: Date.now().toString(),
                url: URL.createObjectURL(file), // create temporary URL
                title: file.name,
                file: file,
            };
            setImages([newImage, ...images]);
        }
    };

    return (
        <div className="flex h-full flex-col gap-6 p-8 max-w-6xl mx-auto w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Images</h1>

                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <Button onClick={handleUploadClick}>
                        <Plus className="mr-2 h-4 w-4" />
                        Upload Image
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {images.map((img) => (
                    <Dialog key={img.id}>
                        <DialogTrigger asChild>
                            <div
                                className="group relative aspect-square overflow-hidden rounded-xl border bg-zinc-100 dark:bg-zinc-800 shadow-sm cursor-pointer"
                                onClick={() => setSelectedImage(img)}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={img.url}
                                    alt={img.title}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <span className="text-white font-medium text-sm truncate">{img.title}</span>
                                </div>
                            </div>
                        </DialogTrigger>

                        <DialogContent className="max-w-4xl p-1 bg-transparent border-none shadow-none">
                            <DialogHeader className="sr-only">
                                <DialogTitle>{selectedImage?.title}</DialogTitle>
                                <DialogDescription>Image preview</DialogDescription>
                            </DialogHeader>
                            <div className="relative w-full h-[80vh] flex items-center justify-center">
                                {selectedImage && (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                        src={selectedImage.url}
                                        alt={selectedImage.title}
                                        className="max-h-full max-w-full object-contain rounded-md"
                                    />
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}

                {images.length === 0 && (
                    <div className="col-span-full py-16 flex flex-col items-center justify-center text-zinc-500 border rounded-xl border-dashed">
                        <p>No images uploaded. Add some screenshots or references.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
