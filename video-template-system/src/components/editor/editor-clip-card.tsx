"use client";

import { VideoClip } from "@/editor-context";
import { VideoCameraIcon, ClockIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

export default function EditorClipCard({ clip }: { clip: VideoClip }) {

console.log(clip);

  return (
    <div className="flex w-full max-w-2xl bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* Left: Video */}
      <div className="w-1/3 bg-black">
        {clip.fileUrl ? (
          <video
                src={clip.fileUrl}
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
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <VideoCameraIcon className="w-12 h-12" />
          </div>
        )}
      </div>

      {/* Right: Info */}
      <div className="flex flex-col justify-center p-4 w-2/3">
        <h2 className="text-xl font-bold text-gray-800">{clip.clipName}</h2>
        <p className="text-sm text-gray-500 mb-2">Type: {clip.clipType}</p>

        <div className="flex items-center gap-4 mt-2 text-gray-600">
          {/* Duration */}
          <div className="flex items-center gap-1">
            <ClockIcon className="w-5 h-5" />
            <span>{clip.duration}s</span>
          </div>

          {/* Subtitles */}
          { clip.subtitles && (
          <div className="flex items-center gap-1">
            <ChatBubbleOvalLeftIcon className="w-5 h-5" />
            <span>{clip.subtitles ? "Subtitles On" : "No Subtitles"}</span>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}