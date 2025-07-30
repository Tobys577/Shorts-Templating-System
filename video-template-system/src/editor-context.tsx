// context/EditorContext.tsx
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

// Template interface to define how video clips should be loaded
export interface VideoClip {
  clipName: string;
  clipType : string;
  duration: number;
  subtitles: boolean;
  music? : File;
  file? : File;
  fileUrl? : string;
}

interface EditorState {
  clips: VideoClip[];
  setClips: React.Dispatch<React.SetStateAction<VideoClip[]>>;
}

const EditorContext = createContext<EditorState | null>(null);

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error('useEditor must be inside EditorProvider');
  return ctx;
}

export function EditorProvider({ children }: { children: ReactNode }) {
  const [clips, setClips] = useState<VideoClip[]>([]);

  return (
    <EditorContext.Provider value={{ clips, setClips }}>
      {children}
    </EditorContext.Provider>
  );
}