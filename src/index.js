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

  // sqlQueries.Employee.Add(connection, `Mohmed`, `Vaid`, `1`, `1`);
  // sqlQueries.Role.Add(connection, `Manager`, `100`, `23`);
  // sqlQueries.Department.Add(connection, `HR`)

});


async function basicPrompts() {
  let user = await inquirer.prompt([{
    type: 'list',
    message: 'What would you like to do?',
    name: 'userInp',
    choices: ['View All Employee', 'View All Employee By Department', 'View All Employee Manager', 'Add Employee', 'Remove Employee', 'Update Employee', 'Update Employee By Role', 'Update Employee By Manager']
  }])

  await doThis(user)

}

async function doThis(user) {
console.log(user.userInp);

  switch(user.userInp){
    case 'View All Employee':
      sqlQueries.Select(connection, 'employee')
      break;

    case 'View All Employee By Department':
      await selectEmpByDep();
    break;

    case 'View All Employee Manager':
      //code
    break;

    case 'Add Employee':
      //code
      break;
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

basicPrompts()