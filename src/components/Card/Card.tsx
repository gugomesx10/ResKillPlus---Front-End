interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:border-gray-900 dark:hover:border-white transition-colors ${className}`}>
      {children}
    </div>
  );
};

export default Card;
