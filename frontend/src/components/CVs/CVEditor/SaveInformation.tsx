

function SaveInformation() {
  return (
    <div className="flex  flex-row  justify-between">
     
    <p className="text-xs text-gray-500"> * Make sure everything looks good before downloading your CV!</p>
    
    <div className="flex justify-end mt-5">
       
           <button
            className=" px-8  py-2 mt-2 text-white text-sm cursor-pointer font-medium 
            bg-gradient-to-r from-blue-500 to-blue-600 
            rounded-lg shadow-md 
            hover:from-blue-600 hover:to-blue-700 
            active:scale-95 
            transition-all duration-300 ease-in-out">
              Download CV </button>
    </div>
                 </div>
  )
}

export default SaveInformation
