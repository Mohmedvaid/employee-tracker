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


  async function getEmpDetails() {
  let details = await inquirer.prompt([{
      type: 'text',
      message: 'Employee First Name: ',
      name: 'Fname',
    },
    {
      type: 'text',
      message: 'Employee Last Name: ',
      name: 'Lname',
    },
    {
      type: 'text',
      message: 'Employee Role Id: ',
      name: 'Role',
    },
    {
      type: 'text',
      message: 'Employee\'s Manager Id (optional): ',
      name: 'Manager',
    }
  ])
  console.log(details);
  await setEmp(details)
}

//Add NEW Employee
async function setEmp(details) {
  if (details.Manager == '') {
    details.Manager = null;
  }
  sqlQueries.Employee.Add(connection, details.Fname, details.Lname, details.Role, details.Manager)
}