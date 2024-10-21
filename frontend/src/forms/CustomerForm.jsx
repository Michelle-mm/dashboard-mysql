import React, {useCallback} from 'react';
import { useStateContext } from "../contexts/ContextProvider";
const imgOptions = [
    { value: 'img2', label: 'Img 2', image: 'avatar.jpg' },
    { value: 'img3', label: 'Img 3', image: 'avatar2.jpg' },
    { value: 'img4', label: 'Img 4', image: 'avatar3.png' },
    { value: 'img5', label: 'Img 5', image: 'avatar4.jpg' },
    { value: 'img6', label: 'Img 6', image: 'product1.jpg' },
    { value: 'img7', label: 'Img 7', image: 'product2.jpg' },
    { value: 'img8', label: 'Img 8', image: 'product3.jpg' },
    { value: 'img9', label: 'Img 9', image: 'product4.jpg' },
    { value: 'img10', label: 'Img 10', image: 'product5.jpg' },
    { value: 'img11', label: 'Img 11', image: 'product6.jpg' },
    { value: 'img12', label: 'Img 12', image: 'product7.jpg' },
    { value: 'img13', label: 'Img 13', image: 'product8.jpg' },
  ];
  
export const CustomerForm = ({setCustomerFormData, addCustomerData, customerFormData, setShowCustomerForm, enteredCustomerid}) => {
    const {currentColor} = useStateContext();
    const handleImgOptChange = useCallback((imgName) => {
        setCustomerFormData(prev => ({ ...prev, customerImg: imgName }));
      }, [setCustomerFormData]);
    
      const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setCustomerFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
      }, [setCustomerFormData]);
    
      const scrollY =  window.scrollY;
      return (
        <form onSubmit={addCustomerData} className={`customerForm bg-white max-w-md mx-auto  p-6 pt-2 rounded-sm shadow-md absolute z-20 top-[${scrollY}px]`}>
          <label htmlFor="customername">Customer/Company Name:</label>
          <input type="text" id="customername" name="customername" className="block text-gray-700 text-sm font-bold mb-2" onChange={handleChange} />
          <label htmlFor="customerid">Customer/Company ID:</label>
          <input type="text" id="customerid" name="customerid" value={enteredCustomerid? enteredCustomerid: customerFormData.customerid} className="block text-gray-700 text-sm font-bold mb-2" onChange={handleChange} />
          <div className="customerImg mb-2">
            <ImageRadioButtons
              options={imgOptions}
              name="imageOption"
              onChange={handleImgOptChange}
              selectedOption={customerFormData.customerImg}
              currentColor={currentColor}
            />
          </div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="company@example.com" className="block text-gray-700 text-sm font-bold mb-2" onChange={handleChange} />
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" placeholder="0912333445" minLength="8" maxLength="10" className="block text-gray-700 text-sm font-bold mb-2" onChange={handleChange} />
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
            <button type="button" onClick={() => setShowCustomerForm(false)} className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancel
            </button>
          </div>
        </form>
      );
}
const ImageRadioButtons = React.memo(({ options, name, onChange, selectedOption, currentColor }) => (
    <div className="flex flex-wrap gap-5">
      {options.map((option) => (
        <label key={option.value} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedOption === option.image}
            onChange={() => onChange(option.image)}
            className="sr-only"
          />
          <div className={`relative p-1 rounded-lg ${selectedOption === option.image ? 'ring-2 ring-blue-500' : 'hover:bg-gray-100'}`}>
            <img
              src={`${process.env.PUBLIC_URL}/imgs/${option.image}`}
              alt={option.label}
              className="w-14 h-14 object-cover rounded-full border-2"
              style={{ borderColor: currentColor }}
            />
          </div>
        </label>
      ))}
    </div>
  ));