const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-950">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-800 border-t-gray-900 dark:border-t-white"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Carregando...</p>
    </div>
  );
};

export default Loading;
