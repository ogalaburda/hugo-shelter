import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
  label: string; // Text for the button
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disable the button
  variant?: 'primary' | 'secondary' | 'danger' | 'success'; // Style variants
  className?: string; // Additional custom styles
  type?: 'button' | 'submit' | 'reset'; // Button type
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = 'primary',
  className,
  type = 'button',
}) => {
  const buttonStyles = classNames(
    'px-4 py-2 rounded text-center transition-all',
    {
      'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary' && !disabled,
      'bg-gray-500 text-white hover:bg-gray-600': variant === 'secondary' && !disabled,
      'bg-red-500 text-white hover:bg-red-600': variant === 'danger' && !disabled,
      'bg-green-500 text-white hover:bg-green-600': variant === 'success' && !disabled,
      'bg-gray-300 text-gray-500 cursor-not-allowed': disabled,
    },
    className
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonStyles}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
