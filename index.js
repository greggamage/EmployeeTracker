const inquirer = require('inquirer');
//const { prompt } = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'password123',
  database: 'crunchyschool'
});


const start = () => {
  inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Add A Role', 'Add A Department', 'Exit'],
      name: 'option'
    }
  ])
    .then(result => {
      switch (result.option) {
        case 'View All Employees':
          seeEmployees()
          break;

        case 'View All Departments':
          seeDepartments()
          break;

          case 'View All Roles':
            seeRoles()
            break;
            
            case 'Add Employee':
          addEmployees()
          break;

        case 'Add A Role':
          addRole()
          break;

        case 'Add A Department':
          addDepartment()
          break;

        case 'Exit':
          end()
          break;
      }
    })
}

start()

function seeDepartments() {
  db.connect(function(err) {
    db.query('SELECT * FROM department', (err, departments) => {
      if (err) { console.log(err) }
      console.table(departments)
      start()
    })
  })
}

function seeRoles() {
  db.connect(function(err) {
    db.query('SELECT * FROM role', (err, roles) => {
      if (err) { console.log(err) }
      console.table(roles)
      start()
    })
  })
}

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      message: "What is title of the role?",
      name: 'title'
    },
    {
      type: 'input',
      message: "What is the salary of the role?",
      name: 'salary'
    },
    {
      type: 'input',
      message: "What is the department ID?",
      name: 'department_id'
    }
  ])
    .then(newRole => {
      var sql = `INSERT INTO role VALUES (NULL, '${newRole.title}', '${newRole.salary}', '${newRole.department_id}');`
      console.log(sql);
      db.query(sql, newRole, err => {
        if (err) { console.log(err) }
        console.log('New role Added')
        start()
      })
    })
}

function seeEmployees() {
  db.connect(function(err) {
    if (err) throw err;
     db.query('SELECT * FROM employee', (err, employees) => {
      if (err) throw err;
        console.table(employees)
        start()
      })
    })
}

function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Name the new department'
    }
  ])
    .then(newDepartment => {
      console.log(newDepartment.name)

      var sql = `INSERT INTO department VALUES (NULL, '${newDepartment.name}');`
      console.log(sql);
      db.query(sql, newDepartment, err => {
        if (err) { console.log(err) }
        console.log('New Department Added')
        start()
      })
    })
}

function addEmployees() {
  inquirer.prompt([
    {
      type: 'input',
      message: "What is the employee first name?",
      name: 'first_Name'
    },
    {
      type: 'input',
      message: "What is the employee last name?",
      name: 'last_Name'
    },
    {
      type: 'input',
      message: "What is the employee's role ID?",
      name: 'role_id'
    },
    {
      type: 'input',
      message: "What is the employees's manager ID",
      name: 'manager_id'
    }
  ])
    .then(newEmployee => {
      var sql = `INSERT INTO employee VALUES (NULL, '${newEmployee.first_Name}', '${newEmployee.last_Name}','${newEmployee.role_id}','${newEmployee.manager_id}');`
      console.log(sql);
      db.query(sql, newEmployee, err => {
        if (err) { console.log(err) }
        console.log('New Employee Added')
        start()
      })
    })
}

function end() {
  console.log('Good Bye')
  setTimeout((function () {
    return process.exit(22);
  }), 0);
}