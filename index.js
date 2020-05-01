const connection = require('./config/connections')
const inquirer = require('inquirer')
const sqlQueries = require('./queries/Employee')


basicPrompts();

//What would you like to do prompts
 async function basicPrompts() {
  console.log(`Basic executed!`);

  let user =  await inquirer.prompt({
    type: 'list',
    message: 'What would you like to do?',
    name: 'userInp',
    choices: ['View All Employee', 'View All Department', 'View All Role', 'Add Employee', 'Add Department', 'Add Role', 'Update Employee Role', 'I am done, Terminate!']
  })
   await doThis(user)
   //user will be prompted each time until temination
  await basicPrompts();

}

//Calls the appropriate function as user wants
async function doThis(user) {
  switch (user.userInp) {
    case 'View All Employee':
      await sqlQueries.Select('employee');
      break;

    case 'View All Department':
      await sqlQueries.Select('department');
      break;

    case 'View All Role':
      await sqlQueries.Select('department');
      break;

    case 'Add Employee':
       await getEmpDetails();
      break;

    case 'Add Department':
      await getNewDep();
      break;

    case 'Add Role':
      await getNewRole();
      break;

      case 'Update Employee Role':
        await UpdateEmployeeRole();
      break;

      case 'I am done, Terminate!':
         process.exit();
      break;

    default: console.log(`Invalid!`);
  }
}


//Add NEW Employee
async function getEmpDetails() {
  let arr = [];

  async function getRole(){
    let depId = await connection.query(`SELECT * FROM department`)
    depId.forEach(e => {
        arr.push(e.id+" "+e.name);
    });
  }

  await getRole()
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
      message: `Employee Role Id (${arr.toString()}): `,
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
async function setEmp(details) {
  if (details.Manager == '') {
    details.Manager = null;
  }
  sqlQueries.Employee.Add(connection, details.Fname, details.Lname, details.Role, details.Manager)
}


//Add new Department
async function getNewDep(){
  let details = await inquirer.prompt([
    {
      type: 'text',
      message: `Enter New Department: (Should not match) `,
      name: 'dep',
    }
  ])
   setDep(details)
}
function setDep(details){
  sqlQueries.Department.Add(connection, details.dep)
}


//Add new role
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
      message: 'Enter the new department id: ',
      name: 'depId'
    },
  ])
  addNewRole(details)
}
function addNewRole(details){
  sqlQueries.Role.Add(connection, details.title, details.salary, details.depId)
}


//Update Employee role
async function UpdateEmployeeRole(){
  let arr = [];
  async function getRole(){
    let depId = await connection.query(`SELECT * FROM department`)
    depId.forEach(e => {
        arr.push(e.id+" "+e.name);
    });
  }
  await getRole()

  let id = await inquirer.prompt([
    {
      type: 'text',
      name: 'empId',
      message: `Enter the employee id: `
    },
    {
      type: 'text',
      name: 'roleId',
      message: `Enter the new role id (${arr.toString()}): `
    }

  ])

  let uptRole = await connection.query(`UPDATE employee SET role_id=${id.roleId} WHERE id=${id.empId}`)
  console.log(`Role Updated!`);
}


