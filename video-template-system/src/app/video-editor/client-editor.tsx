"use client";

import { VideoTemplate } from "@/Templates";
import EditorClipCard from "@/components/editor/editor-clip-card";
import { useEditor } from '@/editor-context';
import { Button } from '@headlessui/react';

// Handle client-side editor functions
export default function ClientEditor({ template, onEditorChange }: { template : VideoTemplate, onEditorChange: () => void }) {
    // Use the editor context to allow client-side data to persist between views
    const { clips } = useEditor();

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center px-8 sm:px-32">
                {clips.map((template, index) => (
                   <EditorClipCard key={index} clip={template} />
                ))}

                <Button onClick={() => onEditorChange()} className="rounded bg-background-header px-8 sm:px-32 py-4 sm:py-8 text-sm text-white data-active:bg-background-header-dark data-hover:bg-background-header-dark hover:cursor-pointer">
                    ADD CLIP
                </Button>
            </main>

            <footer className="fixed bottom-0 left-0 w-full text-white p-4 text-center">
                <Button onClick={() => alert("This is not implemented in this demo.")} className="rounded bg-clear px-8 sm:px-24 py-3 sm:py-6 text-sm text-paragraph hover:cursor-pointer">
                    PREVIEW
                </Button>
                <Button onClick={() => alert("This is not implemented in this demo.")} className="rounded bg-background-header px-8 sm:px-24 py-3 sm:py-6 text-sm text-white data-active:bg-background-header-dark data-hover:bg-background-header-dark hover:cursor-pointer">
                    RENDER
                </Button>
            </footer>
        </div>
    );
}