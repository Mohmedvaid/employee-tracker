const connection = require('./config/connections')
const inquirer = require('inquirer')
const sqlQueries = require('./queries/Employee')

//const EmpTable = require('./Assets/EmpTable')
//const RoleTable = require('./Assets/RoleTable')
//const DepTable = require('./Assets/DepTable')

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
 // await basicPrompts();

}

async function doThis(user) {
  switch (user.userInp) {
    case 'View All Employee':
      sqlQueries.Select(connection, 'employee')
      break;

    case 'View All Department':
      //sqlQueries.Select(connection, 'department')
      break;

    case 'View All Role':
      //sqlQueries.Select(connection, 'role')
      break;

    case 'Add Employee':
      //EmpTable.AddNewEmp;
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



