const connection = require('../config/connections')
const inquirer = require('inquirer')
const sqlQueries = require('../queries/Employee')

// ADD NEW EMPLOYEE
//Get NEW employee data
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

//UPDATE CURRENT EMPLOYEE
//Get and update Employee
//Get NEW employee data
async function getDepDetails() {
  let details = await inquirer.prompt([{
      type: 'text',
      message: 'Enter the role id: ',
      name: 'id',
    },
    {
      type: 'text',
      message: 'Which column would you like to update? (title, salary, department_id): ',
      name: 'updateField',
    },
    {
      type: 'text',
      message: 'Enter the new value: ',
      name: 'updateValue',
    }
  ])
  update(details)
}


function update(details) {
  sqlQueries.Update(connection, details.id, details.updateField, details.updateValue)
}
//Remove emp
//module.exports = getEmpDetails()