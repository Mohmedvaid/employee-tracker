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

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId);
//   //create tables
//   sqlQueries.Employee.createTable(connection)
//   sqlQueries.Role.createTable(connection)
//   sqlQueries.Department.createTable(connection)

//   sqlQueries.Employee.Add(connection, `Mohmed`, `Vaid`, `1`, `1`);
//   sqlQueries.Role.Add(connection, `Manager`, `100`, `23`);
//   sqlQueries.Department.Add(connection, `HR`)

// });


async function test() {
  let inp = await inquirer.prompt([{
    type: 'list',
    message: 'select an option',
    name: 'test',
    choices: ['a', 'b', 'c']
  }])

  getEmployee(inp)

}

async function getEmployee(inp) {
  let empData;
  if (inp.test == 'a') {
    empData = await inquirer.prompt([{
        type: 'text',
        name: 'First',
        message: 'Enter the First name: '
      },
      {
        type: 'text',
        name: 'Last',
        message: 'Enter the last name: '
      }
    ])
  } else if (inp.test == 'b') {
    empData = await inquirer.prompt([{
        type: 'text',
        name: 'First',
        message: 'Enter the Role: '
      },
      {
        type: 'text',
        name: 'Last',
        message: 'Enter the Role2 '
      }
    ])
  }

  console.log(empData);

}

test()