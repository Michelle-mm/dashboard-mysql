import axios from "axios";
import { customersData, teamData } from './data/customerdata.js';
const images = [
  'avatar.jpg', 'avatar2.jpg', 'avatar3.png', 'avatar4.jpg',
  'product1.jpg', 'product2.jpg', 'product3.jpg', 'product4.jpg',
  'product5.jpg', 'product6.jpg', 'product7.jpg'
];

// Modify customer data
const modifiedCustomerData = customersData.map((data) => {
  const phoneNum = `09${data.CustomerID}${data.CustomerID}`;
  const randomImgIdx = Math.floor(Math.random() * images.length);
  
  return {
    customerid: data.CustomerID,
    customername: data.CustomerName,
    customerimg: images[randomImgIdx],
    email: data.CustomerEmail,
    phone: phoneNum,
    location: data.Location
  };
});

const datenow = new Date();
const randomDate = [
  '2023-12-10 15:20:15', '2024-01-30 11:10:10', '2024-04-05 16:30:20',
  '2024-05-07 20:29:40', `${datenow.getFullYear()}-${datenow.getMonth() + 1}-${datenow.getDate()} ${datenow.getHours()}:${datenow.getMinutes()}:${datenow.getSeconds()}`
];
const randomstartDate = ['2023-11-10 15:20:15', '2024-01-01 11:10:10', '2024-03-05 16:30:20', '2024-04-07 20:29:40'];
const randomDeadline = ['2024-02-10 15:20:15', '2024-06-01 11:10:10', '2024-12-05 16:30:20', '2024-11-07 20:29:40'];
console.log(customersData.slice(0, 6));
const modifiedProjectData = customersData.slice(0, 6).map((data, index) => {
  const randomDateIdx = Math.floor(Math.random() * randomDate.length);
  const randomStartDateIdx = Math.floor(Math.random() * randomstartDate.length);

  return {
    projectid: `${2000+index}`,
    projectname: data.ProjectName,
    customerid: data.CustomerID,
    budget: data.Budget,
    deposit: '1000',
    status: data.Status,
    deadline: randomDeadline[randomStartDateIdx],
    recentupdate: randomDate[randomDateIdx],
    startdate: randomstartDate[randomStartDateIdx],
    teamid: teamData[index].teamid
  };
});

// Function to post team data
const loadTeamData = async (data) => {
  try {
    const response = await axios.post("http://localhost:3001/team", data);
    console.log(`Successfully posted team ${data.teamid}`);
    return response.data;
  } catch (err) {
    console.error(`Error posting team ${data.teamid}:`, err.message);
    throw err;
  }
};

// Function to post customer data
const loadCustomerData = async (data) => {
  try {
    const response = await axios.post("http://localhost:3001/customers", data);
    console.log(`Successfully posted customer ${data.customerid}`);
    return response.data;
  } catch (err) {
    console.error(`Error posting customer ${data.customerid}:`, err.message);
    throw err;
  }
};

// Function to post project data
const loadProjectData = async (data) => {
  console.log("data:", data);
  try {
    const response = await axios.post("http://localhost:3001/project", data);
    console.log(`Successfully posted project ${data.projectid}:  ${data}`);
    return response.data;
  } catch (err) {
    console.error(`Error posting project ${data.projectid}:`, err.message);
    console.log(data);
    throw err;
  }
};

// Function to post all customers and team data
const loadAllCustomers = async () => {
  console.log(`Starting to upload ${modifiedCustomerData.length} customers...`);
  
  try {
    // Upload customers and team data in parallel
    const customerPromises = modifiedCustomerData.map(customer => loadCustomerData(customer));
    const teamPromises = teamData.map(team => loadTeamData(team));
    
    await Promise.all([...customerPromises, ...teamPromises]);
    
    console.log("Successfully uploaded customers and teams");

    // Now upload the project data
    const projectPromises = modifiedProjectData.map(project => loadProjectData(project));
    await Promise.all(projectPromises);

    console.log("Successfully uploaded project data");
    
  } catch (err) {
    console.error("Error during upload:", err.message);
  }
};
const loadProjects = async () => {
  console.log(`Starting to upload ${modifiedProjectData.length} project...`);
  console.log("prject data:", modifiedProjectData);
  try {
    const projectPromises = modifiedProjectData.map(project => loadProjectData(project));
    await Promise.all(projectPromises);
    console.log("Successfully uploaded project data");
  } catch (err) {
    console.error("Error during upload:", err.message);
  }
};



// Execute the upload
loadAllCustomers();
// loadProjects();