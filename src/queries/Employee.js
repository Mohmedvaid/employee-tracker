const mysql = require("mysql");

module.exports = {

    Drop: function(connection, table){
        connection.query(`DROP TABLE ${table}`)
    },
    Select: function(connection, table){
        connection.query(`SELECT * FROM ${table}`, function(err, res){
            console.log('\n');
            console.table(res)
        })
    },
    Update: function(connection, id, updateField, updateValue){
        connection.query(`
        UPDATE role
        SET ${updateField}=${updateValue}
        WHERE id='${id}';`)
    },
    //Employee
    Employee: {

        //create table
        createTable: function (connection) {
                connection.query(`       
            CREATE TABLE employee (
                id INT NOT NULL AUTO_INCREMENT,
                first_name VARCHAR(30) NOT NULL,
                last_name VARCHAR(30) NOT NULL,
                role_id INT NOT NULL,
                manager_id INT,
                PRIMARY KEY (id)
                FOREIGN KEY (role_id) REFERENCES role(id)
                FOREIGN KEY (manager_id) REFERENCES role(id)
            );
            `)
            },
        Add: function (connection, first_name, last_name, role_id, manager_id) {
            connection.query(`INSERT INTO employee SET ?`, {
                first_name,
                last_name,
                role_id,
                manager_id

            }, function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`New Employee Added!`);
                }
            })
        },
        update: function(connection, id, role){
            connection.query(`
            UPDATE employee
            SET role_id=${role}
            WHERE id='${id}';`)
        }
    },
//Department
Department: {
        createTable: function (connection) {
            connection.query(`
            CREATE TABLE department (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(30) NOT NULL,
                PRIMARY KEY (id)
            );
            `)
        },
        Add: function (connection, name) {
            connection.query(`INSERT INTO department SET ?`, {
                name
            }, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`New Department Added!`);
                }
            })
        },
        // Update: function(connection, id, updateField, updateValue){
        //     connection.query(`
        //     UPDATE employee
        //     SET ${updateField}=${updateValue}
        //     WHERE id='${id}';`)
        // }
    },
    //Role
    Role:{
        createTable: function (connection) {
            connection.query(`
            CREATE TABLE role (
                id INT NOT NULL AUTO_INCREMENT,
                title VARCHAR(30) NOT NULL,
                salary DECIMAL NOT NULL,
                department_id INT NOT NULL,
                PRIMARY KEY (id)
                FOREIGN KEY (department_id) REFERENCES department(id)
            );
            `)
        },
        Add: function(connection, title, salary, department_id){
            connection.query(`INSERT INTO role SET ?`, {
                title,
                salary,
                department_id
            }, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log(`New Role Added!`);
                }
            })
        },
    }



}