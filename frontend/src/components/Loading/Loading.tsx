

export default function Loading({message}:{message:string}) {
  return (
     <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        
        {/* Loading text */}
        <p className="mt-4 text-gray-700 font-medium text-sm tracking-wide">
          {message?message:'Loading...'}
        </p>
      </div>
    </div>
  )
}
