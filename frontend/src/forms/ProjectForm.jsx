import React, {useCallback} from 'react'
const statusOpts = ["Active", "Pending", "Completed", "Canceled"];
export const ProjectForm = ({addProjectData, formData, setFormData, setShowForm}) => {
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        let convertValue = null;
        if(name==="deadline"){
          const deadline_split = value.split("-");
          // 2022-10-04 18:00:00
          const deadlineTime = `${deadline_split[0]}-${deadline_split[1]}-${deadline_split[2]} ${23}:${59}:${59}`;
          setFormData(prevData => ({...prevData, [name]: deadlineTime}));
        } else {
          setFormData(prevData => ({...prevData, [name]: value}));
        }
        
      }, [setFormData]);
    
      const handleDropdownChange = useCallback((event) => {
        const { value } = event.target;
        setFormData(prev => ({ ...prev, status: value }));
      }, [setFormData]);
      const scrollY =  window.scrollY;
      return (
        <form onSubmit={addProjectData} className={`projectform max-w-md mx-auto p-6 pt-2 rounded-sm shadow-md absolute top-[${scrollY}px] z-20 bg-white`}>
           <div className="">
            <label htmlFor="customerid whitespace-nowrap">Customer/Company ID:</label>
            <input type="text" id="customerid" name="customerid" className="block text-gray-700 text-sm font-bold mb-2" onChange={handleChange} />
            <label htmlFor="projectname">Project Name:</label>
            <input type="text" id="projectname" name="projectname" className="block text-gray-700 text-sm font-bold mb-2" onChange={handleChange} />
            <label htmlFor="projectid">Project ID:</label>
            <input type="text" id="projectid" name="projectid" className="block text-gray-700 text-sm font-bold mb-2" onChange={handleChange} />
            <label htmlFor="budget">Budget:</label>
            <input type="text" id="budget" name="budget" placeholder="$ " className="block text-gray-700 text-sm font-bold mb-2" onChange={handleChange} />
            <label htmlFor="deposit">Deposit:</label>
            <input type="text" id="deposit" name="deposit" placeholder="$ " className="block text-gray-700 text-sm font-bold mb-2" onChange={handleChange} />
            <label htmlFor="status">Status:</label>
            <div className="statusOptions flex gap-2">
              {statusOpts.map((eachOpt, index) => (
                <label htmlFor={eachOpt} key={index}>
                  <div className={`rounded-md text-white font-bold bg-cyan-400 hover:bg-cyan-500 p-2 border-2 mb-2
                    ${formData.status === eachOpt ? "ring-2 ring-blue-500" : "hover:bg-gray-100"} `}>
                    <input
                      type="radio"
                      id={eachOpt}
                      name="status"
                      value={eachOpt}
                      onChange={handleDropdownChange}
                      checked={formData.status === eachOpt}
                      className="sr-only"
                    />
                    <p>{eachOpt}</p>
                  </div>
                </label>
              ))}
            </div>
            <label htmlFor="deadline">DeadLine:
              <input type="date" id="deadline" name="deadline" required className="block text-gray-700 text-sm font-bold mb-2" onChange={handleChange} />
            </label>
            <label htmlFor="teamid">Resposible Team (ID):
              <input type="text" id="teamid" name="teamid" required className="block text-gray-700 text-sm font-bold mb-2" onChange={handleChange} />
            </label>
          </div>
          <div className="md:mt-5 flex gap-2 items-center justify-between lg:justify-end">
            <button type="submit" className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancel
            </button>
          </div>
        </form>
      );
}
