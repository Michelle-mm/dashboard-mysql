const express = require('express');
const router = express.Router();
const db = require('./db');
//   customername, projectname, email, status, weeks, budget

router.post('/customers', (req, res) => {
    const { customerid, customerimg, customername, email, phone, location} = req.body;
    // console.log("customer image:", customerimg);
    db.query('INSERT INTO customerdb (customerid, customerimg, customername, email, phone, location) VALUES (?, ?, ?, ?, ?, ?)', 
            [customerid, customerimg, customername, email, phone, location], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: result.insertId, customerid, customerimg, customername, email, phone, location });
      }
    });
  });
  
// GET all users
router.get('/customers', (req, res) => {
  // console.log("getting customer data");
  db.query('SELECT * FROM customerdb', (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  });

router.delete('/customers/:id', (req, res)=>{
  const {id} = req.params;
  db.query(`DELETE FROM customerdb WHERE id=${id}`, (err, results)=>{
    if(err) res.status(500).json({error: err.message});
    else res.json(results);
  });
});
// router.delete('/customers/:id', (req, res) => {
//   const { id } = req.params;
  
//   db.beginTransaction((err) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     // First, get the customerid
//     db.query('SELECT customerid FROM customerdb WHERE id = ?', [id], (err, results) => {
//       if (err) {
//         return db.rollback(() => {
//           res.status(500).json({ error: err.message });
//         });
//       }

//       if (results.length === 0) {
//         return db.rollback(() => {
//           res.status(404).json({ error: 'Customer not found' });
//         });
//       }

//       const customerid = results[0].customerid;

//       // Update related records in projectdb and team_project
//       const updateProjectsQuery = 'UPDATE projectdb SET customerid = NULL WHERE customerid = ?';
//       const updateTeamProjectQuery = 'UPDATE team_project SET customerid = NULL WHERE customerid = ?';
      
//       db.query(updateProjectsQuery, [customerid], (err) => {
//         if (err) {
//           return db.rollback(() => {
//             res.status(500).json({ error: err.message });
//           });
//         }
        
//         db.query(updateTeamProjectQuery, [customerid], (err) => {
//           if (err) {
//             return db.rollback(() => {
//               res.status(500).json({ error: err.message });
//             });
//           }
          
//           // Now delete the customer
//           const deleteCustomerQuery = 'DELETE FROM customerdb WHERE id = ?';
//           db.query(deleteCustomerQuery, [id], (err, result) => {
//             if (err) {
//               return db.rollback(() => {
//                 res.status(500).json({ error: err.message });
//               });
//             }
            
//             db.commit((err) => {
//               if (err) {
//                 return db.rollback(() => {
//                   res.status(500).json({ error: err.message });
//                 });
//               }
//               res.json({ message: 'Customer deleted successfully', affectedRows: result.affectedRows });
//             });
//           });
//         });
//       });
//     });
//   });
// });
router.put('/customers/:id', (req, res) => {
  const { id } = req.params;
  const { customerimg, customername, email, phone, location } = req.body;
  console.log("id", id);
  const query = `
    UPDATE customerdb 
    SET  customerimg = ?, customername = ?, email = ?, phone = ?, location= ?
    WHERE  id = ?
  `;

  db.query(query, [ customerimg, customername, email, phone, location, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({message: 'Customer updated successfully', 
      affectedRows: result.affectedRows,
      customerimg,
      customername,
      email,
      phone,
      location,
      id });
    }
  });
});


router.get('/project', (req, res) => {
  // const query = `
  //   SELECT p.*, t.teamid, t.teamleader, t.teammembernum, p.customerid
  //   FROM projectdb p
  //   LEFT JOIN teamdb t ON p.teamid = t.teamid
  // `;
  const query = `
    SELECT p.*
    FROM projectdb p
  `;
  db.query(query, (error, results) => {
    if (error) res.status(500).json({ error: error.message });
    else res.json(results);
  });
});

router.post('/project', (req, res) => {
  const { projectid, projectname, customerid, teamid, deadline, status, budget, deposit, recentupdate, startdate } = req.body;
  
  // Start a transaction
  db.beginTransaction((err) => {
    if (err) { 
      return res.status(500).json({ error: err.message }); 
    }

    // Check if customer exists
    db.query('SELECT * FROM customerdb WHERE customerid = ?', [customerid], (err, customerResult) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ error: err.message });
        });
      }

      if (customerResult.length === 0) {
        console.log("no customerid");
        return db.rollback(() => {
          res.json({ needCustomerData: true });
        });
      }
      console.log("has this customerid");
      // Check if team exists
      db.query('SELECT * FROM teamdb WHERE teamid = ?', [teamid], (err, teamResults) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ error: err.message });
          });
        }

        if (teamResults.length === 0) {
          console.log("new teamid");
          return db.rollback(() => {
            res.json({ needTeamData: true });
          });
        }
        console.log("has teamid");
        db.query(`SELECT projectid FROM projectdb WHERE projectid=?`, [projectid], (err, result)=>{
          if(err){
            return db.rollback(()=>{
              res.status(500).json({error: err.message});
            });
          }
          if (result.length!==0){
            return db.rollback(()=>{
              res.status(500).json({error: 'Duplicate data'});
            })
          } else {
              // Insert into projectdb
              db.query('INSERT INTO projectdb (projectid, projectname, customerid, teamid, deadline, status, budget, deposit, recentupdate, startdate) VALUES (?,?,?,?,?,?,?,?,?,?)', 
              [projectid, projectname, customerid, teamid, deadline, status, budget, deposit, recentupdate, startdate], 
              (err, projectResult) => {
                if (err) {
                  console.log("error insert project:", err.message);
                  return db.rollback(() => {
                    res.status(500).json({ error: err.message });
                  });
                }
                  // Commit the transaction
                  console.log("insert project data successfully");
                  db.commit((err) => {
                    if (err) {
                      return db.rollback(() => {
                        res.status(500).json({ error: err.message });
                      });
                    }
                    res.status(201).json({ 
                      id: projectResult.insertId, 
                      projectid, 
                      projectname, 
                      customerid, 
                      teamid, 
                      deadline, 
                      status,
                      budget, 
                      deposit,
                      recentupdate,
                      startdate
                    });
                  });
              });
          }
        })
      }); 
    });
  });
});


// Update a project
router.patch('/project/:projectid', (req, res) => {
  const { projectid } = req.params;
  // const { projectid, projectname, projectCompany, teamid, deadline, status, recentupdate } = req.body;
  const { projectname, customerid, teamid, deadline, status, recentupdate } = req.body;
  
  db.beginTransaction((err) => {
    if (err) { return res.status(500).json({ error: err.message }); }

    // Update projectdb
    const updateProjectQuery = `
      UPDATE projectdb 
      SET projectname = ?, customerid = ?, deadline = ?, status = ?, recentupdate = ?
      WHERE projectid = ?
    `;
    
    db.query(updateProjectQuery, [projectname, customerid, deadline, status, recentupdate, projectid], (err, result) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ error: err.message });
        });
      }

      // Update team_project if teamid is provided
      // if (teamid) {
      //   const updateTeamProjectQuery = `
      //     UPDATE team_project 
      //     SET teamid = ?
      //     WHERE projectid = (SELECT projectid FROM projectdb WHERE id = ?)
      //   `;
        
        // db.query(updateTeamProjectQuery, [teamid, id], (err, result) => {
        //   if (err) {
        //     return db.rollback(() => {
        //       res.status(500).json({ error: err.message });
        //     });
        //   }

          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).json({ error: err.message });
              });
            }
            res.status(200).json({ id, projectid, projectname, customerid, teamid, deadline, status, recentupdate });
          });
        // });
      // } else {
      //   db.commit((err) => {
      //     if (err) {
      //       return db.rollback(() => {
      //         res.status(500).json({ error: err.message });
      //       });
      //     }
      //     res.status(200).json({ id, projectid, projectname, customerid, deadline, status, recentupdate });
      //   });
      // }
    });
  });
});

// Delete a project
router.delete('/project/:id', (req, res) => {
  const { id } = req.params;
  console.log("delete id", id);
  const deleteProjectQuery = `DELETE FROM projectdb WHERE projectid = ?`;
  db.query(deleteProjectQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    else res.status(200).json({ message: 'Project deleted successfully' });
  });
});

//team
//project
router.get('/team', (req, res)=>{
  db.query(`SELECT t.*, p.projectid FROM teamdb t
            LEFT JOIN projectdb p ON t.teamid = p.teamid`, (error, results)=>{
    if(error) res.status(500).json({error: (error.message)});
    else res.json(results);
  })
})
router.post('/team', (req, res) => {
  const { teamid, teamleader, teammembernum } = req.body;

  // Check if team already exists
  db.query('SELECT * FROM teamdb WHERE teamid = ?', [teamid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // If the team already exists, return a message
    if (result.length > 0) {
      return res.status(400).json({ message: 'Team already exists' });
    }
    // If the team does not exist, insert it
    db.query(
      'INSERT INTO teamdb (teamid, teamleader, teammembernum) VALUES (?, ?, ?)',
      [teamid, teamleader, teammembernum],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ id: result.insertId, teamid, teamleader, teammembernum });
      }
    );
  });
});

router.delete('/team/:teamid', (req, res)=>{
  const {teamid} = req.params;
  db.query(`DELETE FROM teamdb WHERE teamid=${teamid}`, (err, results)=>{
    if(err) res.status(500).json({error: err.message});
    else res.json(results);
  });
});
router.put('/team/:teamid', (req, res)=>{
  const {teamid} = req.params;
  const {projectid, teamleader, teammembernum} = req.body;
  db.beginTransaction((err)=>{
    if(err){
      res.status(500).json({error:err.message});
    }
    db.query(`SELECT * FROM projectdb WHERE projectid = ?`, [projectid],(err, result)=>{
        if(err){
          res.status(500).json({error: err.message});
        } 
        if(result.length===0){
          return db.rollback(() => {
            res.json({ needProjectData: true });
          });
        }
        // db.query(`UPDATE projectdb SET teamid = ? WHERE projectid = ?`, [teamid, projectid], (err, result)=>{
        //   if(err){
        //     res.status(500).json({error: err.message});
        //   } else res.json(result);
        // })
      });


  })
  
  
})
router.get('/connected-data', (req, res) => {
  const query = `
  SELECT 
    p.projectid, 
    p.projectname, 
    p.teamid, 
    t.teamleader, 
    p.status AS project_status,
    p.recentupdate,
    p.deadline,    
    p.customerid
  FROM 
    projectdb p
  LEFT JOIN 
    teamdb t ON p.teamid = t.teamid
  `;

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});
router.put('/connected-data/:projectid', (req, res) => {
  const { projectid } = req.params;
  const { projectname, project_status, recentupdate, deadline, teamid, teamleader } = req.body;
  //find teamdb responsiblep project id 
  // console.log("Deadline", deadline);
  const updateProject = `
    UPDATE projectdb 
    SET projectname = ?, status = ?, recentupdate = ?, deadline = ?
    WHERE projectid = ?
  `;
  const updateTeam = `
    UPDATE teamdb
    SET teamleader = ? 
    WHERE teamid = ?
  `;

  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // db.query(responsibleProject, [teamid], (err, result)=>{
    //   if(err){
    //     return db.rollback(()=>{
    //       res.status(500).json({error: err.message});
    //     })
    //   }
    //   if(result.length>0){
    //     let currentResponsibleProjects = result[0].responsibleProjectid ? JSON.parse(result[0].responsibleProjectid) : [];
    
    //     if (!currentResponsibleProjects.includes(projectid)) {
    //       currentResponsibleProjects.push(projectid);
    //     }
    //     const updatedResponsibleProjects = JSON.stringify(currentResponsibleProjects);
    //     db.query(`UPDATE teamdb 
    //                 SET responsibleProjectid = ?
    //                 WHERE teamid = ?`, [updatedResponsibleProjects, teamid],(err, result)=>{
    //       if(err){
    //         return db.rollback(()=>{
    //           res.status(500).json({error: err.message});
    //         })
    //       }
          db.query(updateProject, [projectname, project_status, recentupdate, deadline, projectid], (err) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).json({ error: err.message });
              });
            }
      
            db.query(updateTeam, [teamleader,  teamid], (err) => {
              if (err) {
                return db.rollback(() => {
                  res.status(500).json({ error: err.message });
                });
              }
              db.commit((err) => {
                if (err) {
                  return db.rollback(() => {
                    res.status(500).json({ error: err.message });
                  });
                }
                res.json({ message: 'Connected data updated successfully' });
              });
            });
          });
        })
//       } else {
//         res.status(404).json({ error: "Team not found" });
//       }
//     })
//   });
});

// Delete connected data
router.delete('/connected-data/:projectid', (req, res) => {
  const { projectid } = req.params;
  // const deleteCustomer = `DELETE FROM customerdb WHERE projectid = ?`;
  // const deleteTeamProject = `DELETE FROM team_project WHERE projectid = ?`;
  const deleteProject = `DELETE FROM projectdb WHERE projectid = ?`;
  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // db.query(deleteCustomer, [projectid], (err) => {
    //   if (err) {
    //     return db.rollback(() => {
    //       res.status(500).json({ error: err.message });
    //     });
    //   }
      // db.query(deleteTeamProject, [projectid], (err) => {
      //   if (err) {
      //     return db.rollback(() => {
      //       res.status(500).json({ error: err.message });
      //     });
      //   }

        db.query(deleteProject, [projectid], (err) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ error: err.message });
            });
          }
          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).json({ error: err.message });
              });
            }
            res.json({ message: 'Connected data deleted successfully' });
          });
        });
      // });
    // });
  });
});
  // const query = `
  //   SELECT 
  //     c.*,
  //     p.projectname AS project_name,
  //     p.projectCompany AS project_company,
  //     p.status AS project_status,
  //     t.teamprojectname,
  //     t.teamleader
  //   FROM 
  //     customerdb c
  //   LEFT JOIN 
  //     projectdb p ON c.projectid = p.projectid
  //   LEFT JOIN 
  //     teamdb t ON p.teamid = t.teamid
  // `;
  //--------------------------------
  // const query = ` SELECT t.*, p.*, c.* FROM projectdb p 
  //   JOIN teamdb t ON p.teamid = t.teamid 
  //   JOIN customerdb c ON p.projectid = c.projectid
  // `;

module.exports = router;

