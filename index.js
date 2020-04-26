const connection = require('./config/connections')
const inquirer = require('inquirer')
const sqlQueries = require('./src/queries/Employee.js')

const EmpTable = require('./Assets/EmpTable')
const RoleTable = require('./Assets/RoleTable')
const DepTable = require('./Assets/DepTable')

//What would you like to do prompts
async function basicPrompts() {
  let user = await inquirer.prompt([{
    type: 'list',
    message: 'What would you like to do?',
    name: 'userInp',
  choices: ['View All Employee', 'View All Department', 'View All Role', 'Add Employee','Add Department', 'Add Role','Update Employee Role', 'Remove Employee', 'Update Employee', 'Update Role'/*'Update Employee By Role', 'Update Employee By Manager'*/]
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
     await EmpTable.getEmpDetails();
    break;

    case 'Add Department':
     await DepTable.getNewDep();
    break;

    case 'Add Role':
    await RoleTable.getNewRole();
    break;

    case 'Remove Employee':
    await EmpTable.removeEmp();
    break;

    case 'Update Employee Role':
      await RoleTable.getRole();
    break;

    case 'Update Role':
      await DepTable.getDepDetails();
  }
  console.log(`\n`);
  await basicPrompts();

}




basicPrompts()