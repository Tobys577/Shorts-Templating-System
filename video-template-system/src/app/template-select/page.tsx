import TemplateGrid from "@/components/templates/template-grid";

// Start page 
// Just explaining what the project is, and opening up into the main page
export default function TemplateSelect() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center py-2 px-8 sm:p-8">
      <main className="flex flex-col gap-[16px] row-start-2 items-center px-8 sm:px-32">
        <TemplateGrid />
      </main>
    </div>
  );
}
