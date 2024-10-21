import React, {useCallback} from 'react'

export const TeamForm = ({handleTeamSubmit, setTeamFormData, formData, setShowTeamForm, enteredTeamid}) => {
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setTeamFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
      }, [setTeamFormData]);
      const scrollY = window.scrollY;
      return(
        <form onSubmit={handleTeamSubmit}  className={`teamform bg-white max-w-md mx-auto  p-6 pt-2 rounded-sm shadow-md absolute z-20 top-[${scrollY}px]`}>
          <label htmlFor="teamid">Team ID:</label>
          <input type="text" id="teamid" name="teamid" value={enteredTeamid?enteredTeamid: formData.teamid} required className="block text-gray-700 text-sm font-bold mb-2" onChange={handleChange} />
          <label htmlFor="teamLeader">Team Leader:</label>
          <input type="text" id="teamLeader" name="teamLeader" required className="block text-gray-700 text-sm font-bold mb-2" onChange={handleChange} />
          <label htmlFor="teamMemNum">Team Members:</label>
          <input type="number" id="teamMemNum" name="teamMemNum" required className="block text-gray-700 text-sm font-bold mb-2" onChange={handleChange} />
          <div className="md:mt-5 flex gap-2 items-center justify-between lg:justify-end">
              <button type="submit" className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
              </button>
              <button type="button" onClick={() => setShowTeamForm(false)} className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cancel
              </button>
          </div>
        </form>
      )
}
