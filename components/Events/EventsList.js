

export default function EventsList(props) {


const formatDate =(dateStr)=>{
    const date = new Date(dateStr);
    const day = date.getDay(); // Returns the day of the week (0-6, where 0 is Sunday)
    const dateNumber = date.getDate(); // Returns the day of the month (1-31)
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthArr = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]



    return dateNumber +" "+ monthArr[month] + " "+  year
} 
    console.log('eventsList', props.events)
    return(
        <>
            {props.events?.map((item, index)=>{
                return (
                    <>
                    <div className="bg-white shadow-md rounded-lg p-4 m-3 flex">
                        <div className="flex flex-middle flex-col justify-center p-4 bg-gray-100 rounded-lg">
                            <span> {formatDate(item.date)}</span>
                        </div>
                       <div className=" p-4">
                       <h2 className="text-xl font-semibold ">{item.name}</h2>
                        <p className="text-gray-600=">{item.description}</p>
                       </div>
                       
                    </div>
                    </>
                )
            })}
        </>
    )
}