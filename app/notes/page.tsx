"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

type Note = {
    id: string;
    title: string;
    content: string;
    date: string;
};

const INITIAL_NOTES: Note[] = [
    { id: "1", title: "Meeting Notes", content: "Discussed phase 1 architecture and left feedback on UI.", date: new Date().toISOString().split('T')[0] },
    { id: "2", title: "Shopping List", content: "Milk, eggs, coffee beans, bread.", date: new Date().toISOString().split('T')[0] },
    { id: "3", title: "Idea dump", content: "Build a small personal tracker for daily habits. It should have a calendar view.", date: new Date().toISOString().split('T')[0] },
];

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const handleAddNote = () => {
        if (!newTitle.trim() && !newContent.trim()) return;

        const newNote: Note = {
            id: Date.now().toString(),
            title: newTitle || "Untitled Note",
            content: newContent,
            date: new Date().toISOString().split('T')[0],
        };

        setNotes([newNote, ...notes]);

        // Reset form
        setNewTitle("");
        setNewContent("");
        setIsAddOpen(false);
    };

    return (
        <div className="flex h-full flex-col gap-6 p-8 max-w-6xl mx-auto w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Notes</h1>

                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New Note
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add a New Note</DialogTitle>
                            <DialogDescription>
                                Write down your thoughts, ideas, or quick snippets.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Input
                                    id="title"
                                    placeholder="Note Title"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="font-medium"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Textarea
                                    id="content"
                                    placeholder="Express yourself..."
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                    className="min-h-[150px] resize-none"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddNote}>Save Note</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {notes.map((note) => (
                    <Dialog key={note.id}>
                        <DialogTrigger asChild>
                            <Card
                                className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer flex flex-col h-full shadow-sm text-left"
                                onClick={() => setSelectedNote(note)}
                            >
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">{note.title}</CardTitle>
                                    <CardDescription className="text-xs">{note.date}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-sm text-zinc-500 whitespace-pre-wrap line-clamp-4">{note.content}</p>
                                </CardContent>
                            </Card>
                        </DialogTrigger>

                        {/* View Note Modal */}
                        <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
                            <DialogHeader>
                                <DialogTitle className="text-xl">{selectedNote?.title}</DialogTitle>
                                <DialogDescription>{selectedNote?.date}</DialogDescription>
                            </DialogHeader>
                            <div className="flex-1 overflow-y-auto py-2">
                                <p className="text-sm whitespace-pre-wrap leading-relaxed">{selectedNote?.content}</p>
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}

                {notes.length === 0 && (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-zinc-500 border rounded-xl border-dashed">
                        <p>No notes yet. Create your first note!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
