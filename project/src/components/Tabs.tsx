type Tab = { id: string; label: string };

export default function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="mb-4 border-b">
      <nav className="flex gap-6 text-sm">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`pb-3 ${
              active === t.id
                ? "text-sky-600 border-b-2 border-sky-400"
                : "text-gray-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
