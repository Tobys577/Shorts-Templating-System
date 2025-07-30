import { GetLoadedTemplate, VideoTemplate } from "@/Templates";
import { Button } from '@headlessui/react';
import EditorViewSwapper from "./editor-view-swapped";
import Link from 'next/link';

interface Props {
  searchParams: { template?: string };
}



// Show the different loaded clips, allow the user to load in more, and allow clips to be selected for editing
export default async function VideoEditor({ searchParams }: Props) {

    // Load active template based on URL parameter
    let template : VideoTemplate | null = null;

    await searchParams;

    // Get the requrested template based on search params (allows direct linking)
    if(searchParams != null)
       template = await GetLoadedTemplate(searchParams.template!);

    // Handle a return page if the selected template couldn't be found
    if(template == null){
        return (
            <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center px-8 sm:px-32">
                <h2 className="font-sans text-center text-3xl text-dark-paragraph">The selected template could not be found.</h2>
                <p className="text-center">
                    The selected template could not be found. Please retry again.
                </p>
                <div className="flex justify-center gap-8">
                <Link href={`/`}>
                <Button className="rounded bg-background-header px-8 py-4 text-sm text-white data-active:bg-background-header-dark data-hover:bg-background-header-dark hover:cursor-pointer">
                    Return
                </Button>
                </Link>
                </div>
            </main>
            </div>
        );
    }

    // Render active client editor
    return (
        <div className="w-full h-full">
            <EditorViewSwapper template={template} />
        </div>
    );
}