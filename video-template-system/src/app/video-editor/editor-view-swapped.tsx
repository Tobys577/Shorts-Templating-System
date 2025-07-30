"use client";

import { VideoTemplate } from "@/Templates";
import ClientEditor from "./client-editor";
import ClipEditor from "./clip-editor";
import { useState } from 'react';

// Handle swapping which editor view is active
export default function EditorViewSwapper({ template }: { template : VideoTemplate}) {
    

    const [showClipView, setShowClipView] = useState(true);

    return (
        <div className="w-full h-full">
        {
        showClipView ? (
            <ClientEditor template={template} onEditorChange={() => setShowClipView(false)} />
        ) : (
            <ClipEditor template={template} onEditorChange={() => setShowClipView(true)} />)
        }
        </div>
    );
}