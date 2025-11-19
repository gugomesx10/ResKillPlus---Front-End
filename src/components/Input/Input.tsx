interface InputProps {
  label?: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  className = ''
}: InputProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-800 rounded-lg focus:border-gray-900 dark:focus:border-white focus:outline-none bg-white dark:bg-gray-950 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
      />
    </div>
  );
};

export default Input;
