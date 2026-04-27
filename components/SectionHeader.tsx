const SectionHeader = ({ chapter, label }: { chapter?: string; label: string }) => {
  return (
    <h1 className="flex flex-col items-center text-primary font-display leading-none gap-4">
      <span className="text-xl">{chapter}</span>
      <span className="text-2xl md:text-3xl tracking-wider">{label}</span>
    </h1>
  );
};

export default SectionHeader;