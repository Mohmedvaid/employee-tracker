const connection = require('../config/connections')
const inquirer = require('inquirer')
const sqlQueries = require('../queries/Employee')

//get new role info
async function getNewRole(){
    let details = await inquirer.prompt([
      {
        type: 'text',
        message: 'Enter title: ',
        name: 'title'
      },
      {
        type: 'text',
        message: 'Enter salary: ',
        name: 'salary'
      },
      {
        type: 'text',
        message: 'Enter department id: ',
        name: 'depId'
      },
    ])
    addNewRole(details)
  }

//add new role
  function addNewRole(details){
    sqlQueries.Role.Add(connection, details.title, details.salary, details.depId)
  }

//Get and update role
async function getRole(){
    let role = await inquirer.prompt([
      {
        type: 'text',
        message: 'Enter employee id: ',
        name: 'id'
      },
      {
        type: 'text',
        message: 'Enter employee new role id',
        name: 'role'
      }
    ])
     updateRole(role)
  }
  //Update New Role
function updateRole(role){
    sqlQueries.Employee.update(connection, role.id, role.role)
  }