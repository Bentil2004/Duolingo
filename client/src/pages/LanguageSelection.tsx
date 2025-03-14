import LanguageCard from "@/components/LanguageCard";
import { languages } from "@/data/languages";

const LanguageSelection = () => {
  return (
    <section className="py-8 px-4 container mx-auto max-w-4xl">
      <h1 className="text-3xl font-extrabold text-center mb-8">Choose a language to learn</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {languages.map(language => (
          <LanguageCard key={language.id} language={language} />
        ))}
      </div>
    </section>
  );
};

export default LanguageSelection;
