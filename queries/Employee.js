const mysql = require("mysql");
const inquirer = require('inquirer')
const express = require("express");
const connection = require('../config/connections')

//const connection = require('../config/connections')

module.exports = {

    Drop: function(connection, table){
        connection.query(`DROP TABLE ${table}`)
    },
    Select: async function(table){
        let res = await connection.query(`SELECT * FROM ${table}`)
        console.table(res);
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
        },
        Remove:  async function(connection, table){

            let arr=[]
            var row ;
             connection.query(`SELECT * FROM ${table}`,  async function(err, res){
                Object.keys(res).forEach(function(key) {
                     row = res[key];
                     arr.push(row.first_name+" "+ row.last_name)
                  });
                    console.log(`\n`);
                    let details = await inquirer.prompt([
                        {
                            type: 'list',
                            message: 'Select one',
                            name: 'user',
                            choices: arr
                        }
                    ])
                    let empName = await details.user.split(" ")
                    connection.query(`DELETE FROM employee WHERE first_name='${empName[0]}' AND last_name='${empName[1]}';`)

            })
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