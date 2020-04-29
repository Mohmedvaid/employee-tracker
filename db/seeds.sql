

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

INSERT INTO employee ( first_name, last_name, role_id)
VALUES ('Cardinal', 'Erichsen', 1),
('Mike', 'Fern', 5 ),
('test3', 'test3', 4 ),
('test4', 'test4', 3 ),
('test5', 'test5', 5),
('test6', 'test6', 3),
('test7', 'test7', 2),
('test8', 'test8', 2),
('test9', 'test9', 5);
