import { VideoTemplate, LoadTemplates } from "@/Templates";
import TemplateCard from "@/components/templates/template-card";

// A selectable grid of template cards generated from the JSONs available in @/templates
export default async function TemplateGrid() {

  // Load the template data
  const templates = await LoadTemplates();

  return (
    <div className="grid grid-cols-2 sm:gap-1 gap-4">
      {templates.map((template, index) => (
        <TemplateCard key={index} data={template} />
      ))}
    </div>
  );
}