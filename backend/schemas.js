const db = require('./db');

const createTables = () => {
  const createDataBase = `
    CREATE DATABASE IF NOT EXISTS dashboardDB`;

  const teamTableQuery = `
  CREATE TABLE IF NOT EXISTS teamdb (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teamid VARCHAR(20),
    teamLeader VARCHAR(100) NOT NULL,
    teammembernum INT
    )`;

  const customerTableQuery = `
  CREATE TABLE IF NOT EXISTS customerdb (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customerid VARCHAR(20),
    customerimg VARCHAR(255),
    customername VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    location VARCHAR(60)
    )`;

  const projectTableQuery = `
    CREATE TABLE IF NOT EXISTS projectdb (
      id INT AUTO_INCREMENT PRIMARY KEY,
      projectid VARCHAR(20),
      projectname VARCHAR(100) NOT NULL,
      customerid VARCHAR(20) NOT NULL,
      teamid VARCHAR(20),
      deadline DATETIME,
      status TEXT,
      budget TEXT,
      deposit TEXT,
      recentupdate DATETIME,
      startdate DATETIME
    )`;
// FOREIGN KEY (customerid) REFERENCES customer(customerid) ON DELETE SET NULL
  // const teamProjectQuery = `
  //   CREATE TABLE IF NOT EXISTS team_project (
  //     id INT AUTO_INCREMENT PRIMARY KEY,
  //     teamid VARCHAR(15) NOT NULL,
  //     projectid VARCHAR(15) NOT NULL,
  //     customerid VARCHAR(20) NULL,
  //     FOREIGN KEY (teamid) REFERENCES teamdb(teamid) ON DELETE SET NULL,
  //     FOREIGN KEY (projectid) REFERENCES projectdb(projectid) ON DELETE CASCADE,
  //     FOREIGN KEY (customerid) REFERENCES customerdb(customerid) ON DELETE SET NULL,
  //     UNIQUE KEY (teamid, projectid)
  //   )`;
  
  db.query(createDataBase, (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created or already exists');

    // Use the database
    db.query(`USE dashboardDB`, (err) => {
      if (err) {
        console.error('Error using database:', err);
        return;
      }

      // Create tables in the correct order
      db.query(teamTableQuery, (err) => {
        if (err) {
          console.error('Error creating team table:', err);
          return;
        }
        console.log('Team Table created or already exists');

        db.query(customerTableQuery, (err) => {
          if (err) {
            console.error('Error creating Customer table:', err);
            return;
          }
          console.log('Customer Table created or already exists');

          db.query(projectTableQuery, (err) => {
            if (err) {
              console.error('Error creating project table:', err);
              return;
            }
            console.log('Project Table created or already exists');

            // db.query(teamProjectQuery, (err) => {
            //   if (err) {
            //     console.error('Error creating team-project table:', err);
            //     return;
            //   }
            //   console.log('team-project Table created or already exists');
            // });
          });
        });
      });
    });
  });
};

module.exports = { createTables };