// import avatar from './avatar.jpg';
// import avatar2 from './avatar2.jpg';
// import avatar3 from './avatar3.png';
// import avatar4 from './avatar4.jpg';
// import product1 from './product1.jpg';
// import product2 from './product2.jpg';
// import product3 from './product3.jpg';
// import product4 from './product4.jpg';
// import product5 from './product5.jpg';
// import product6 from './product6.jpg';
// import product7 from './product7.jpg';
const IMAGE_BASE_PATH = '/data';
const images = {
  avatar: `${IMAGE_BASE_PATH}/avatar.jpg`,
  avatar2: `${IMAGE_BASE_PATH}/avatar2.jpg`,
  avatar3: `${IMAGE_BASE_PATH}/avatar3.png`,
  avatar4: `${IMAGE_BASE_PATH}/avatar4.jpg`,
  product1: `${IMAGE_BASE_PATH}/product1.jpg`,
  product2: `${IMAGE_BASE_PATH}/product2.jpg`,
  product3: `${IMAGE_BASE_PATH}/product3.jpg`,
  product4: `${IMAGE_BASE_PATH}/product4.jpg`,
  product5: `${IMAGE_BASE_PATH}/product5.jpg`,
  product6: `${IMAGE_BASE_PATH}/product6.jpg`,
  product7: `${IMAGE_BASE_PATH}/product7.jpg`,
};
// console.log(IMAGE_BASE_PATH);
export const teamData = [
  {
    teamid: 'T001',
    teamleader: 'Irene Lee',
    teammembernum: 10
  },
  {
    teamid: 'T002',
    teamleader: 'Chris Lee',
    teammembernum: 8
  },
  {
    teamid: 'T003',
    teamleader: 'Petter Parker ',
    teammembernum: 15
  },
  {
    teamid: 'T004',
    teamleader: 'Rin Hinata',
    teammembernum: 6
  },
  {
    teamid: 'T005',
    teamleader: 'Hero Hamata',
    teammembernum: 20
  },
  {
    teamid: 'T006',
    teamleader: 'Yuna Shitsumi',
    teammembernum: 10
  },
  {
    teamid: 'T007',
    teamleader: 'Rickey Chen',
    teammembernum: 4
  },
]
export const customersData = [
    {
      CustomerID: 1001,
      CustomerName: 'Nirav Joshi',
      CustomerEmail: 'nirav1@gmail.com',
      CustomerImage:
        images.product3,
      ProjectName: 'Hosting Press HTML',
      Status: 'Active',
      StatusBg: '#8BE78B',
      Weeks: '40',
      Budget: '$2.4k',
      Location: 'India',
    },
    {
      CustomerID: 1002,
      CustomerName: 'Sunil Joshi',
      CustomerEmail: 'sunil@gmail.com',
      ProjectName: 'Elite Admin',
      Status: 'Active',
      CustomerImage:
        images.avatar3,
      StatusBg: '#8BE78B',
      Weeks: '11',
      Budget: '$3.9k',
      Location: 'India',
    },
    {
      CustomerID: 1003,
  
      CustomerName: 'Andrew McDownland',
      CustomerEmail: 'andrew2@gmail.com',
      ProjectName: 'Real Homes WP Theme',
      ProjectId: 3,
      Status: 'Pending',
      CustomerImage:
      images.product6,
      StatusBg: '#FEC90F',
      Weeks: '19',
      Budget: '$24.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1004,
  
      CustomerName: 'Christopher Jamil',
      CustomerEmail: 'jamil2@gmail.com',
      ProjectName: 'MedicalPro WP Theme',
      Status: 'Completed',
      CustomerImage:
      images.product2,
      StatusBg: '#8BE78B',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1005,
  
      CustomerName: 'Michael',
      CustomerEmail: 'michael3@gmail.com',
      ProjectName: 'Weekly WP Theme',
      Status: 'Canceled',
      CustomerImage:
        images.product3,
      StatusBg: 'red',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1006,
      CustomerName: 'Nirav Joshi',
      CustomerEmail: 'nirav2@gmail.com',
      CustomerImage:
        images.product3,
      ProjectName: 'Hosting Press HTML',
      Status: 'Active',
      StatusBg: '#8BE78B',
      Weeks: '40',
      Budget: '$2.4k',
      Location: 'India',
    },
    {
      CustomerID: 1007,
  
      CustomerName: 'Sunil Joshi',
      CustomerEmail: 'sunil2@gmail.com',
      ProjectName: 'Elite Admin',
      Status: 'Active',
      CustomerImage:
      images.product1,
  
      StatusBg: '#8BE78B',
      Weeks: '11',
      Budget: '$3.9k',
      Location: 'India',
    },
    {
      CustomerID: 1008,
  
      CustomerName: 'Andrew3 McDownland',
      CustomerEmail: 'andrew3@gmail.com',
      ProjectName: 'Real Homes WP Theme',
      Status: 'Pending',
      CustomerImage:
      images.product6,
      StatusBg: '#FEC90F',
      Weeks: '19',
      Budget: '$24.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1009,
  
      CustomerName: 'Christopher Parker',
      CustomerEmail: 'jamil3@gmail.com',
      ProjectName: 'MedicalPro WP Theme',
      Status: 'Completed',
      CustomerImage:
      images.avatar,
      StatusBg: '#8BE78B',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1010,
  
      CustomerName: 'Michael Rogger',
      CustomerEmail: 'michael4@gmail.com',
      ProjectName: 'Weekly WP Theme',
      Status: 'Canceled',
      CustomerImage:
        images.product3,
      StatusBg: 'red',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1011,
      CustomerName: 'Nirav Wuan',
      CustomerEmail: 'nirav3@gmail.com',
      CustomerImage:
      images.avatar2,
      ProjectName: 'Hosting Press HTML',
      Status: 'Active',
      StatusBg: '#8BE78B',
      Weeks: '40',
      Budget: '$2.4k',
      Location: 'India',
    },
    {
      CustomerID: 1012,
  
      CustomerName: 'Sunil Chang',
      CustomerEmail: 'sunil3@gmail.com',
      ProjectName: 'Elite Admin',
      Status: 'Active',
      CustomerImage:
      images.product1,
  
      StatusBg: '#8BE78B',
      Weeks: '11',
      Budget: '$3.9k',
      Location: 'India',
    },
    {
      CustomerID: 1013,
  
      CustomerName: 'Chris McDownland',
      CustomerEmail: 'andrew4@gmail.com',
      ProjectName: 'Real Homes WP Theme',
      Status: 'Pending',
      CustomerImage:
      images.product6,
      StatusBg: '#FEC90F',
      Weeks: '19',
      Budget: '$24.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1014,
  
      CustomerName: 'Amber Jamil',
      CustomerEmail: 'jamil4@gmail.com',
      ProjectName: 'MedicalPro WP Theme',
      Status: 'Completed',
      CustomerImage:
      images.avatar,
      StatusBg: '#8BE78B',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1015,
  
      CustomerName: 'Jay Chen',
      CustomerEmail: 'michael5@gmail.com',
      ProjectName: 'Weekly WP Theme',
      Status: 'Canceled',
      CustomerImage:
      images.avatar2,
      StatusBg: 'red',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1016,
      CustomerName: 'Nirav Stark',
      CustomerEmail: 'nirav4@gmail.com',
      CustomerImage:
      images.avatar2,
      ProjectName: 'Hosting Press HTML',
      Status: 'Active',
      StatusBg: '#8BE78B',
      Weeks: '40',
      Budget: '$2.4k',
      Location: 'India',
    },
    {
      CustomerID: 1017,
  
      CustomerName: 'Sunil Yu',
      CustomerEmail: 'sunil4@gmail.com',
      ProjectName: 'Elite Admin',
      Status: 'Active',
      CustomerImage:
      images.product1,
  
      StatusBg: '#8BE78B',
      Weeks: '11',
      Budget: '$3.9k',
      Location: 'India',
    },
    {
      CustomerID: 1018,
  
      CustomerName: 'Lisa McDownland',
      CustomerEmail: 'andrew5@gmail.com',
      ProjectName: 'Real Homes WP Theme',
      Status: 'Pending',
      CustomerImage:
      images.avatar4,
      StatusBg: '#FEC90F',
      Weeks: '19',
      Budget: '$24.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1019,
  
      CustomerName: 'Jenny Jamil',
      CustomerEmail: 'jamil5@gmail.com',
      ProjectName: 'MedicalPro WP Theme',
      Status: 'Completed',
      CustomerImage:
      images.avatar,
      StatusBg: '#8BE78B',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1020,
  
      CustomerName: 'Linda Clark',
      CustomerEmail: 'michael6@gmail.com',
      ProjectName: 'Weekly WP Theme',
      Status: 'Canceled',
      CustomerImage:
      images.avatar2,
      StatusBg: 'red',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1021,
      CustomerName: 'Anna Joshi',
      CustomerEmail: 'nirav5@gmail.com',
      CustomerImage:
      images.avatar2,
      ProjectName: 'Hosting Press HTML',
      Status: 'Active',
      StatusBg: '#8BE78B',
      Weeks: '40',
      Budget: '$2.4k',
      Location: 'India',
    },
    {
      CustomerID: 1022,
  
      CustomerName: 'May Joshi',
      CustomerEmail: 'sunil5@gmail.com',
      ProjectName: 'Elite Admin',
      Status: 'Active',
      CustomerImage:
      images.product1,
  
      StatusBg: '#8BE78B',
      Weeks: '11',
      Budget: '$3.9k',
      Location: 'India',
    },
    {
      CustomerID: 1023,
  
      CustomerName: 'Jerry McDownland',
      CustomerEmail: 'andrew6@gmail.com',
      ProjectName: 'Real Homes WP Theme',
      Status: 'Pending',
      CustomerImage:
      images.avatar4,
      StatusBg: '#FEC90F',
      Weeks: '19',
      Budget: '$24.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1024,
  
      CustomerName: 'Christopher Stone',
      CustomerEmail: 'jamil6@gmail.com',
      ProjectName: 'MedicalPro WP Theme',
      Status: 'Completed',
      CustomerImage:
      images.avatar,
      StatusBg: '#8BE78B',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1025,
  
      CustomerName: 'Michael Huang',
      CustomerEmail: 'michael7@gmail.com',
      ProjectName: 'Weekly WP Theme',
      Status: 'Canceled',
      CustomerImage:
      images.avatar2,
      StatusBg: 'red',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1026,
      CustomerName: 'Nirav Chang',
      CustomerEmail: 'nirav6@gmail.com',
      CustomerImage:
      images.avatar2,
      ProjectName: 'Hosting Press HTML',
      Status: 'Active',
      StatusBg: '#8BE78B',
      Weeks: '40',
      Budget: '$2.4k',
      Location: 'India',
    },
    {
      CustomerID: 1027,
  
      CustomerName: 'Sunil Tsai',
      CustomerEmail: 'sunil6@gmail.com',
      ProjectName: 'Elite Admin',
      Status: 'Active',
      CustomerImage:
      images.product1,
  
      StatusBg: '#8BE78B',
      Weeks: '11',
      Budget: '$3.9k',
      Location: 'India',
    },
    {
      CustomerID: 1028,
  
      CustomerName: 'Andrew Parker',
      CustomerEmail: 'andrew7@gmail.com',
      ProjectName: 'Real Homes WP Theme',
      Status: 'Pending',
      CustomerImage:
      images.avatar4,
      StatusBg: '#FEC90F',
      Weeks: '19',
      Budget: '$24.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1029,
  
      CustomerName: 'Christopher Lee',
      CustomerEmail: 'jamil7@gmail.com',
      ProjectName: 'MedicalPro WP Theme',
      Status: 'Completed',
      CustomerImage:
      images.avatar,
      StatusBg: '#8BE78B',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1030,
  
      CustomerName: 'Michael Lin',
      CustomerEmail: 'michael8@gmail.com',
      ProjectName: 'Weekly WP Theme',
      Status: 'Canceled',
      CustomerImage:
      images.avatar2,
      StatusBg: 'red',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1031,
      CustomerName: 'Nirav Chen',
      CustomerEmail: 'nirav7@gmail.com',
      CustomerImage:
      images.avatar2,
      ProjectName: 'Hosting Press HTML',
      Status: 'Active',
      StatusBg: '#8BE78B',
      Weeks: '40',
      Budget: '$2.4k',
      Location: 'India',
    },
    {
      CustomerID: 1032,
  
      CustomerName: 'Sunil Wu',
      CustomerEmail: 'sunil7@gmail.com',
      ProjectName: 'Elite Admin',
      Status: 'Active',
      CustomerImage:
      images.avatar3,
  
      StatusBg: '#8BE78B',
      Weeks: '11',
      Budget: '$3.9k',
      Location: 'India',
    },
    {
      CustomerID: 1033,
  
      CustomerName: 'Andrew White',
      CustomerEmail: 'andrew8@gmail.com',
      ProjectName: 'Real Homes WP Theme',
      Status: 'Pending',
      CustomerImage:
      images.avatar4,
      StatusBg: '#FEC90F',
      Weeks: '19',
      Budget: '$24.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1034,
  
      CustomerName: 'Christopher Jamils',
      CustomerEmail: 'jamil8@gmail.com',
      ProjectName: 'MedicalPro WP Theme',
      Status: 'Completed',
      CustomerImage:
      images.avatar,
      StatusBg: '#8BE78B',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1035,
  
      CustomerName: 'Michael Yeh',
      CustomerEmail: 'michaelyeh@gmail.com',
      ProjectName: 'Weekly WP Theme',
      Status: 'Canceled',
      CustomerImage:
      images.avatar2,
      StatusBg: 'red',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1036,
      CustomerName: 'Niravv Joshi',
      CustomerEmail: 'niravJoshi@gmail.com',
      CustomerImage:
      images.avatar2,
      ProjectName: 'Hosting Press HTML',
      Status: 'Active',
      StatusBg: '#8BE78B',
      Weeks: '40',
      Budget: '$2.4k',
      Location: 'India',
    },
    {
      CustomerID: 1037,
  
      CustomerName: 'Sunill Joshi',
      CustomerEmail: 'sunil8@gmail.com',
      ProjectName: 'Elite Admin',
      Status: 'Active',
      CustomerImage:
      images.avatar3,
  
      StatusBg: '#8BE78B',
      Weeks: '11',
      Budget: '$3.9k',
      Location: 'India',
    },
    {
      CustomerID: 1038,
  
      CustomerName: 'Andrew McDownland',
      CustomerEmail: 'andrew10@gmail.com',
      ProjectName: 'Real Homes WP Theme',
      Status: 'Pending',
      CustomerImage:
        images.avatar4,
      StatusBg: '#FEC90F',
      Weeks: '19',
      Budget: '$24.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1039,
      CustomerName: 'Christopher Jamil',
      CustomerEmail: 'jamil10@gmail.com',
      ProjectName: 'MedicalPro WP Theme',
      Status: 'Completed',
      CustomerImage:
      images.avatar,
      StatusBg: '#8BE78B',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1040,
      CustomerName: 'Michael',
      CustomerEmail: 'michael2@gmail.com',
      ProjectName: 'Weekly WP Theme',
      Status: 'Canceled',
      CustomerImage:
      images.avatar2,
      StatusBg: 'red',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
  
  ];
  