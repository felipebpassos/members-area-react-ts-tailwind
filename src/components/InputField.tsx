import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser, FaLock } from 'react-icons/fa';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange, className = '' }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Determina qual ícone usar com base no tipo
  const getInputIcon = () => {
    if (type === 'email') {
      return <FaUser className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />;
    }
    if (type === 'password') {
      return <FaLock className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />;
    }
    return null;
  };

  return (
    <div className="relative mb-4">
      {/* Renderiza o ícone correspondente */}
      {getInputIcon()}
      
      <input
        type={type === 'password' && !isPasswordVisible ? 'password' : 'text'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoCapitalize={type === 'email' ? 'none' : undefined}
        inputMode={type === 'email' ? 'email' : undefined}
        className={`w-full p-3 pl-10 bg-zinc-900 text-gray-300 placeholder-gray-500 rounded-lg focus:outline-none ${className}`}
      />
      
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2"
        >
          {isPasswordVisible ? (
            <FaEyeSlash className="text-gray-500 hover:text-gray-400 transition-colors" />
          ) : (
            <FaEye className="text-gray-500 hover:text-gray-400 transition-colors" />
          )}
        </button>
      )}
    </div>
  );
};

export default InputField;