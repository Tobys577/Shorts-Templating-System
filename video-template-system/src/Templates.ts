import fs from 'fs';
import path from 'path';

var templateCache : Record<string, VideoTemplate> = {}

// Template interface to define how the template JSON files should be loaded
export interface VideoTemplate {
    name: string;
    id: string;
    icon: string;
    backgroundMusic: 'required' | 'allowed' | 'none';
    clipTypes: Array<{
        type: 'intro' | 'standard' | 'outro';
        minDuration: number;
        maxDuration: number;
        subtitles:  'required' | 'allowed' | 'none';
        musicVolume: number;
        isFirst?: boolean;
    }>;
    scenes: Array<{
        clipType: string;
        minAmount: number;
        maxAmount?: number;
    }>;
}

// Load all JSON templates from the @/Templates folder
export async function LoadTemplates() : Promise<VideoTemplate[]> {
  templateCache = {}; // Reset dictionary

  const templatesDir = path.join(process.cwd(), 'src/templates'); // adjust path

  // Read all files in the folder
  const files = fs.readdirSync(templatesDir);

  // Filter only JSON files (optional)
  const jsonFiles = files.filter((file) => file.endsWith('.json'));

  // Read and parse each JSON file
  const templates : VideoTemplate[] = jsonFiles.map<VideoTemplate>((file) => {
    const filePath = path.join(templatesDir, file);
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data : VideoTemplate = JSON.parse(jsonData);

    if(!(data.id in templateCache)){
      templateCache[data.id] = data;
    }

    return data;
  });

  return templates;
}

// Get a template, given the ID
export async function GetLoadedTemplate(tmplID : string) : Promise<VideoTemplate | null> {
  if(Object.keys(templateCache).length == 0)
    await LoadTemplates();

  if(tmplID in templateCache){
    return templateCache[tmplID];
  } else {
    return null;
  }
}