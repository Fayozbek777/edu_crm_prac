export default function Spinner({ size = 20 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center p-6">
      <span
        style={{ width: size, height: size }}
        className="animate-spin rounded-full border-2 border-slate-300 border-t-slate-900"
      />
    </div>
  );
}
