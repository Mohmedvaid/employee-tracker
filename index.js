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
    choices: ['View All Employee', 'View All Department', 'View All Role', 'Add Employee', 'Add Department', 'Add Role', 'Add Department', 'Update Employee Role', 'Remove Employee', 'Update Employee', 'Update Role']
  })
   await doThis(user)
  await basicPrompts();

}

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
       await getEmpDetails()
      break;

    case 'Add Department':
      // DepTable.getNewDep;
      break;

    case 'Add Role':
      // RoleTable.getNewRole;
      break;

    case 'Remove Employee':
     //  sqlQueries.Employee.Remove(connection, 'employee');
      break;

    case 'Update Employee Role':
       //RoleTable.getNewRole;
      break;

    case 'Update Employee':
      // RoleTable.updateTable;
      break;

    case 'Update Role':
      // DepTable.updateTable;
      break;

    default: console.log(`Invalid!`);
  }

  //basicPrompts();
}



//UPDATE CURRENT EMPLOYEE
//Get and update Employee
//Get NEW employee data
async function getEmployee(){
  let res = await connection.query(`SELECT * FROM ${table}`)
  console.table(res);
}




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


//Add NEW Employee
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
async function setEmp(details) {
  if (details.Manager == '') {
    details.Manager = null;
  }
  sqlQueries.Employee.Add(connection, details.Fname, details.Lname, details.Role, details.Manager)
}

// async function Remove(){

//   let arr = [];
//   res = await connection.query(`SELECT * FROM employee`)
//   res.map(e => arr.push(e.first_name+" "+e.last_name))

//   let details = await inquirer.prompt([
//     {
//         type: 'list',
//         message: 'Select one',
//         name: 'user',
//         choices: arr
//     }
// ])
// // let empName = await details.user.split(" ")
// // console.log(`You selected ${empName}`);
// // let qr = ` DELETE FROM employee WHERE first_name='${empName[0]}' AND last_name='${empName[1]}';`
// // console.log(qr);

// // try{
// //   let res = await connection.query(qr)
// // } catch(err){
// //   console.log(err);
// // }

// // }
// // Remove()



