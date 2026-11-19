type Props = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title = "Ошибка загрузки",
  message = "Что-то пошло не так. Попробуйте ещё раз.",
  onRetry,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50/50 px-6 py-12 text-center">
      <div className="mb-3 text-3xl text-red-400">!</div>
      <h4 className="text-sm font-semibold text-red-700">{title}</h4>
      <p className="mt-1 max-w-sm text-sm text-red-600/80">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-500"
        >
          Повторить
        </button>
      )}
    </div>
  );
}
