const connection = require('../config/connections')
const inquirer = require('inquirer')
const sqlQueries = require('../queries/Employee')

//Add new Department
async function getNewDep(){
    let details = await inquirer.prompt([
      {
        type: 'text',
        message: 'Enter New Department: ',
        name: 'dep',
      }
    ])
     setDep(details)
  }
  
  function setDep(details){
    sqlQueries.Department.Add(connection, details.dep)
  }