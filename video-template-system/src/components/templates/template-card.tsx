"use client";

import Link from 'next/link';

type TemplateData = {
  name: string;
  id: string;
  icon: string;
};

// A selectable template card
export default function TemplateCard({ data }: { data: TemplateData }) {
  return (
    <Link href={`/video-editor?template=${encodeURIComponent(data.id)}`}>
      <div className="relative sm:p-2 lg:p-4 w-full h-full rounded hover:cursor-pointer">
        <img src={data.icon} alt={`${data.name} icon`} className="w-full h-full border drop-shadow rounded" />
        
        {/* Place text on top of image */}
        <div className="absolute bottom-0 right-0 sm:p-2 lg:p-4">
            <h3 className="text-white lg:text-3xl text-sm font-bold p-4">{data.name}</h3>
        </div>
      </div>
    </Link>
  );
}