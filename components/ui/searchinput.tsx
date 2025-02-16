import React from 'react'
import { Search } from 'lucide-react'

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
}

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder = 'Search...', ...props }) => {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        className="w-full py-2 pl-4 pr-10 text-sm text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        placeholder={placeholder}
        {...props}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  )
}
