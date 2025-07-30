"use client";

import { VideoTemplate } from "@/Templates";
import { useEditor, VideoClip } from '@/editor-context';
import { ArrowUpTrayIcon, AdjustmentsVerticalIcon } from '@heroicons/react/24/outline';
import { Button } from '@headlessui/react';
import { useState, useEffect, useRef } from 'react';
import Dropdown from "@/components/dropdown";

// Handle client-side editor functions
export default function ClipEditor({ template, onEditorChange }: { template : VideoTemplate, onEditorChange: () => void }) {
    // Use the editor context to allow client-side data to persist between views
    const { clips } = useEditor();

//#region Handle file uploads

    const videoName = useRef<string>("Name");
    const videoFile = useRef<File | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selected = e.target.files?.[0];
        if (selected && selected.type === 'video/mp4') {
            videoName.current = selected.name;
            videoFile.current = selected;
            setVideoUrl(URL.createObjectURL(selected));
        } else {
            alert('Please upload an MP4 file');
        }
    }

//#endregion

//#region Handle type changes

    const [type, setType] = useState<string>();
    const typeDropdownChange = (value: string) => {
        const setClipResp = trySetClipType(value);
        if(setClipResp != null) {
            alert(setClipResp);
        }
    };

    // Perform checks that the requested type is allowed
    const trySetClipType = (newType : string) : string | null => {
        // Check type actually exists
        const clipType = template.clipTypes.find(clip => clip.type == newType);
        if(clipType == undefined)
            return "The requested type does not exist on this template";

        // Check if the type has a maximum amount, and if it is already taken
        const maxCount = template.scenes.find(scene => scene.clipType == clipType.type)?.maxAmount
        if(maxCount != undefined){
            if(clips.filter(clip => clip.clipType == clipType.type).length >= maxCount) {
                return "There are already the maximum of this clip type in the project";
            }
        }

        // Check if there is an 'is-first' type that needs applying
        if(clips.length == 0 && !clipType.isFirst){
            const requiredType = template.clipTypes.find(clip => clip.isFirst != null && clip.isFirst!);
            if(requiredType != undefined){
                return `A clip of ${requiredType.type} is required before ${newType} can be selected`;
            }
        }

        if(type != newType)
            setType(newType);
        console.log(newType);
        return null;
    }

//#endregion

//#region Handle subtitles update 

    const [hasSubtitles, setHasSubtitles] = useState<boolean>(false);
    function handleSubtitlesUpdate(){
        const clipType = template.clipTypes.find(clip => clip.type == type)!;
        if(clipType.subtitles != "none")
            setHasSubtitles(!hasSubtitles);
        else
            setHasSubtitles(false);
    }

//#endregion

//#region Handle clip saving

    function handleClipSaving(){
        const clipType = template.clipTypes.find(clip => clip.type == type)!;

        if(!videoUrl)
            alert("Please upload a video before saving.");

        // Push the clip to the array
        clips.push({
            clipName: videoName.current,
            clipType: type!,
            duration: clipType.maxDuration,
            subtitles: hasSubtitles,
            file: videoFile.current!,
            fileUrl: videoUrl!
        });

        // Handle "isFirst" property in template (ensure that an intro is always at the beginning)
        if(clipType.isFirst) {
            if(clips.length > 1){
                clips.unshift(clips.pop()!); // Rotates last element back to front of array
            }
        }

        onEditorChange();
    }

//#endregion

    useEffect(() => {
        // Default type to introduction and then to standard if it fails
        if(trySetClipType("intro") != null) { trySetClipType("standard"); }
    }, []);

    let data : VideoClip;

    return (
        <div>
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <div className="flex flex-col gap-[32px] row-start-2 items-center px-8 sm:px-32 relative">
                
                { /* File upload */ }
                <div className="w-64 h-64 border-2 border-dashed border-gray-400 rounded-lg overflow-hidden relative">
                    <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-gray-100">
                        <input
                        type="file"
                        accept="video/mp4"
                        className="hidden"
                        onChange={handleFileChange}
                        />
                        {!videoUrl  && (
                        <span className="text-gray-500">Upload MP4</span>
                        )}
                        {videoUrl  && (
                            <div className="w-full h-full">
                                <video
                                    src={videoUrl}
                                    className="w-full h-full object-cover"
                                    muted
                                    playsInline
                                    preload="metadata"
                                    onLoadedMetadata={(e) => {
                                    const vid = e.currentTarget;
                                    vid.currentTime = 0; // show first frame
                                    vid.pause();
                                    }}
                                />
                                <div className="absolute bottom-0 right-0 sm:p-2 lg:p-4">
                                    <ArrowUpTrayIcon className="w-12 h-12 text-background" />
                                </div>
                            </div>
                        )}
                    </label>
                </div>
                
                <br></br>

                {videoUrl && (

                <div className="grid grid-cols-2 sm:gap-1 gap-4 sm:gap-12">
                    <p className="font-sans text-left text-paragraph">Type of Scene</p>
                    <Dropdown options={template.clipTypes.map(clip => clip.type)} selected={type ?? ""} onChange={typeDropdownChange} />

                    <p className="font-sans text-left text-paragraph">Background music</p>
                    <Button className="rounded bg-background-header px-4 sm:px-12 py-1 sm:py-3 text-sm text-white flex items-center gap-2 data-active:bg-background-header-dark data-hover:bg-background-header-dark hover:cursor-pointer">
                        <ArrowUpTrayIcon className="w-5 h-5" />
                        Upload
                    </Button>

                    <p className="font-sans text-left text-paragraph">Captions {hasSubtitles ? "generated" : "none"}</p>
                    <Button onClick={handleSubtitlesUpdate} className="rounded bg-background-header px-4 sm:px-12 py-1 sm:py-3 text-sm text-white flex items-center gap-2 data-active:bg-background-header-dark data-hover:bg-background-header-dark hover:cursor-pointer">
                        <AdjustmentsVerticalIcon className="w-5 h-5" />
                        Generate
                    </Button>
                </div>
                
                )}

                {!videoUrl && (

                <div className="grid grid-cols-1 sm:gap-1 gap-4 sm:gap-12">
                    <h3>Please upload a video clip.</h3>
                </div>
                )}

            </div>

        </div>
            <footer className="fixed bottom-0 left-0 w-full text-white p-4 text-center">
                <Button onClick={() => onEditorChange()} className="rounded bg-clear px-8 sm:px-24 py-3 sm:py-6 text-sm text-paragraph hover:cursor-pointer">
                    DISCARD
                </Button>
                <Button onClick={() => handleClipSaving()} className="rounded bg-background-header px-8 sm:px-24 py-3 sm:py-6 text-sm text-white data-active:bg-background-header-dark data-hover:bg-background-header-dark hover:cursor-pointer">
                    SAVE
                </Button>
            </footer>
        </div>
    );
}