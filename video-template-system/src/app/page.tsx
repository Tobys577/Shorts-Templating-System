"use client";

import { Button } from '@headlessui/react';
import { useRouter } from 'next/navigation'

// Start page 
// Just explaining what the project is, and opening up into the main page
export default function Home() {
  const router = useRouter();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center px-8 sm:px-32">
        <h2 className="font-sans text-center text-3xl text-dark-paragraph">Example Short Video Template Editor</h2>
        <p className="text-center">This is an proof-of-concept project created using nextJS and typescript. 
          The idea is to take creating short-form content, and turn it into a reproduceable, repeatable process,
          to create content with a familiar pattern. This is all done by using templates designed from existing
          short-form content.
        </p>
        <p className="font-sans text-center text-dark-paragraph">~</p>
        <div className="flex justify-center gap-8">
          <Button as="a" href="https://github.com/Tobys577" className="rounded bg-clear px-8 py-4 text-sm text-paragraph">
            GITHUB
          </Button>
          <Button onClick={() => router.push('/template-select')} className="rounded bg-background-header px-8 py-4 text-sm text-white data-active:bg-background-header-dark data-hover:bg-background-header-dark hover:cursor-pointer">
            EDITOR
          </Button>
        </div>
      </main>
    </div>
  );
}
