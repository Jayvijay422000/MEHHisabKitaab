const express =require('express');
const bodyParser = require('body-parser');
const app = express();


require("./db");
//modules

//courses
const addCourses = require("./modules/courses/addCourses");
const getAllCourses= require("./modules/courses/getAllCourses");
const getByIdCourses =require("./modules/courses/getByIdCourses");


//accounts

//payIn
const addPayIn = require("./modules/accounts/PayIn/addPayIn");
const getAllPayIn =require("./modules/accounts/PayIn/getAllPayIn");
const getPayInBtnDate = require("./modules/accounts/PayIn/getPayInBtnDate");

//payOut

//payIn
const addPayOut = require("./modules/accounts/PayOut/addPayOut");
const getAllPayOut =require("./modules/accounts/PayOut/getAllPayOut");
const getPayOutBtnDate = require("./modules/accounts/PayOut/getPayOutBtnDate");

//Employee

const addEmployee = require("./modules/employee/addEmp");
const addSalary = require("./modules/employee/addSalary");
const getEmpByField = require("./modules/employee/getEmpByField");
const getAllEmp = require("./modules/employee/getAllEmp");
const updateEmp = require('./modules/employee/updateEmp');


//students

const addStudent = require("./modules/students/addStud");
const getAllStud =require("./modules/students/getAllStud");
const getStudByField = require('./modules/students/getStudByField');

//parses the text as url encoded data
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());


//student routes

app.post("/Students",addStudent);
app.get("/Students",getAllStud);
app.get("/searchStudents",getStudByField);

//courses routes
app.post("/Courses",addCourses);

app.get("/Courses",getAllCourses);

app.get("/Course/:id",getByIdCourses);


//employees routes

app.post("/employee",addEmployee);

app.get("/searchemp",getEmpByField);

app.get("/employee",getAllEmp);

app.patch("/employee",updateEmp);

app.patch("/salary",addSalary);
//Accounts 

//payIn
app.post("/payIn",addPayIn);
app.get("/payIn",getAllPayIn);
//between to date
app.get("/payInBtnDate",getPayInBtnDate);


//payOut

app.post("/payOut",addPayOut);
app.get("/payOut",getAllPayOut);
//between to date
app.get("/payOutBtnDate",getPayOutBtnDate);

app.listen(8080,()=>{
 console.log("connected");
});