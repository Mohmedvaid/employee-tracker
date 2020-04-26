const mysql = require("mysql");
const inquirer = require('inquirer')
const sqlQueries = require('./queries/Employee.js')

// connect to local db
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: 'root',
  password: 'Password1',
  database: 'employee_db'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  //create tables
  // sqlQueries.Employee.createTable(connection)
  // sqlQueries.Role.createTable(connection)
  // sqlQueries.Department.createTable(connection)

  // sqlQueries.Employee.Add(connection, `test`, `test`, `1`, `1`);
  // sqlQueries.Role.Add(connection, `Manager`, `100`, `23`);
  // sqlQueries.Department.Add(connection, `HR`)

});

//What would you like to do prompts
async function basicPrompts() {
  let user = await inquirer.prompt([{
    type: 'list',
    message: 'What would you like to do?',
    name: 'userInp',
  choices: ['View All Employee', 'View All Department', 'View All Role', 'Add Employee', 'Update Employee Role', 'Remove Employee', 'Update Employee', 'Update Role'/*'Update Employee By Role', 'Update Employee By Manager'*/]
  }])

  await doThis(user)

}

async function doThis(user) {
console.log(user.userInp);

  switch(user.userInp){
    case 'View All Employee':
      sqlQueries.Select(connection, 'employee')
      break;

    case 'View All Department':
     sqlQueries.Select(connection, 'department')
    break;

    case 'View All Role':
      sqlQueries.Select(connection, 'role')
    break;

    case 'Add Employee':
     //
    break;

    case 'Add Department':
     //
    break;

    case 'Add Role':
     //
    break;

    case 'Update Employee Role':
      await getRole();
    break;

    case 'Update Role':
      await getDepDetails();
  }
  console.log(`\n`);
  await basicPrompts();

}

async function selectEmpByDep(){
  let dep = await inquirer.prompt([
    {
      type: 'text',
      message: 'Enter department',
      name: 'departmentName'

    }
  ])
  console.log(dep);
}
//Get NEW employee data
async function getEmpDetails(){
  let details = await inquirer.prompt([
    {
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
  setEmp(details)
}

//Add NEW Employee
function setEmp(details){
  if(details.Manager == ''){
    details.Manager = null;  
  }
  sqlQueries.Employee.Add(connection, details.Fname, details.Lname, details.Role)
}

//Get New role
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

//Get NEW employee data
async function getDepDetails(){
  let details = await inquirer.prompt([
    {
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

function update(details){
  sqlQueries.Update(connection, details.id, details.updateField, details.updateValue)
}


basicPrompts()