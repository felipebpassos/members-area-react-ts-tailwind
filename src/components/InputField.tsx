import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importando ícones de olho

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange, className = '' }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Estado para visibilidade da senha

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative mb-4"> {/* Ajuste para o container com menos espaço de margem */}
      <input
        type={type === 'password' && !isPasswordVisible ? 'password' : 'text'} // Alterna entre texto e senha
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-3 bg-[#f9f9f9] ${className}`} // Apenas borda inferior preta
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-1 top-1/2 transform -translate-y-1/2"
        >
          {isPasswordVisible ? (
            <FaEyeSlash className="text-gray-600" />
          ) : (
            <FaEye className="text-gray-600" />
          )}
        </button>
      )}
    </div>
  );
};

export default InputField;
