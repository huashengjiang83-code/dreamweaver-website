
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = "font-serif tracking-widest transition-all duration-500 flex items-center justify-center gap-2 relative overflow-hidden group";
  
  const variants = {
    primary: "px-8 py-3 rounded bg-[#9F1212] text-[#F2F2F2] hover:bg-[#B91C1C] shadow-[0_4px_20px_rgba(159,18,18,0.3)] border border-[#B91C1C] disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "px-6 py-2 rounded border border-[#114B42] text-[#2E86C1] hover:text-[#F2F2F2] hover:bg-[#114B42] hover:border-[#1F6155] disabled:opacity-50 disabled:cursor-not-allowed",
    icon: "p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
          <span className="opacity-90">太虚推演中...</span>
        </>
      ) : children}
      
      {/* Subtle shine effect on hover for primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}
    </button>
  );
};
