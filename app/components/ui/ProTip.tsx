interface ProTipProps {
    children: React.ReactNode
    className?: string
  }
  
  export default function ProTip({ children, className = '' }: ProTipProps) {
    return (
      <div className={`bg-blue-50 p-4 rounded-lg flex items-start gap-2 ${className}`}>
        <div className="text-[#0066CC] mt-1">
          <svg 
            className="w-4 h-4" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-sm text-gray-600">
          {children}
        </p>
      </div>
    )
  }