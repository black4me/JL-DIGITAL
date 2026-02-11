import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  // SOP 11.3: Font weights lighter for elegance (font-medium instead of bold)
  const baseStyles = "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-500 rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]";
  
  const variants = {
    // Brushed Gold Gradient with soft glow
    primary: "bg-gold-gradient text-black-900 shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] border border-transparent bg-[length:200%_200%] hover:bg-right transition-all",
    // Glassy Secondary
    secondary: "bg-white/5 backdrop-blur-md border border-white/10 text-pearl hover:bg-white/10 hover:border-gold-500/30",
    // Thin Outline
    outline: "border border-gold-500/50 text-gold-400 hover:bg-gold-500/5 hover:border-gold-500 hover:text-gold-300",
    // Ghost
    ghost: "text-silver hover:text-white hover:bg-white/5"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;