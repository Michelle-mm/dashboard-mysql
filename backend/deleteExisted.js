const db = require('./db');

const deleteDB = `DROP DATABASE IF EXISTS dashboardDB`;
const deleteCustomertable = `DROP TABLE IF EXISTS customerdb`;
const deleteteamProjectTable = `DROP TABLE IF EXISTS team_project`;
const deleteProjecttable = `DROP TABLE IF EXISTS projectdb`;
const deleteTeamtable = `DROP TABLE IF EXISTS teamdb`;


// db.query(deleteProjecttable, (err, res)=>{
//     if(err) console.error("error deleting projectdb", err);
//     else {
//         console.log("projectdb deleted");
//     }
// });

db.query(deleteDB, (err, res)=>{
    if(err) console.error("error deleting database", err);
    else {
        console.log("database deleted");
        db.query(deleteCustomertable, (err, res)=>{
            if(err) console.error("error deleting customerdb", err);
            else {
                console.log("customerdb deleted");
                db.query(deleteProjecttable, (err, res)=>{
                    if(err) console.error("error deleting projectdb", err);
                    else {
                        console.log("projectdb deleted");
                        db.query(deleteTeamtable, (err, res)=>{
                            if(err) console.error("error deleting teamdb", err);
                            else {
                                console.log("teamdb deleted");
                            }
                        })
                    }
                });

            }
        })
    }
})