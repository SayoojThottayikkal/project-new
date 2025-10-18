export default function MemberBadge({
  name,
  onRemove,
}: {
  name: string;
  onRemove?: () => void;
}) {
  return (
    <div className="inline-flex items-center gap-2 px-2 py-1 bg-gray-100 rounded text-sm mr-2">
      <span>{name}</span>
      {onRemove && (
        <button onClick={onRemove} className="text-xs text-gray-500">
          ×
        </button>
      )}
    </div>
  );
}
