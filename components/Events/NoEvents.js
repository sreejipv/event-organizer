export default function NoEvents() {
    return(
        <>
        <div className="mx-auto bg-gray-100 shadow-md rounded-lg p-6">
            <p className="text-gray-700 mb-4">
            There are no Events
            </p>
            <div className="flex justify-center">
             <a href="/event">
             <button className="bg-pink-500 text-white cursor-pointer py-2 px-4 rounded-lg">
                Create your first Event
              </button>
             </a>
            </div>
          </div>
        </>
    )
}