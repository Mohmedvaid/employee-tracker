

use employee_db;
INSERT INTO department (name)
VALUES ('HR'),
('QA'),
('Sales'),
('Server'),
('Dev');

INSERT INTO role (title, salary, department_id)
VALUES ('FrontEnd', 30000, 5),
('BackEnd', 4000, 5),
('Manager', 3500, 1),
('CEO', 200000, 1),
('Salesman', 3500, 3),
('Engineer', 3000, 2),
('ServerGuy', 3300, 5);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ('Cardinal', 'Erichsen', 1, null),
('Mike', 'Fern', 5, null),
('test3', 'test3', 4, null),
('test4', 'test4', 3, null),
('test5', 'test5', 5, null),
('test6', 'test6', 3, null),
('test7', 'test7', 2, null),
('test8', 'test8', 2, null),
('test9', 'test9', 5, null);
