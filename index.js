const express =require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors({origin: true, credentials: true}));

const jwt = require('jsonwebtoken');
require("./db");


//parses the text as url encoded data
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());


//modules

//user login singup

const registerUser = require("./modules/user/registerUser");
const loginUser = require('./modules/user/loginUser');

//courses
const addCourses = require("./modules/courses/addCourses");
const getAllCourses= require("./modules/courses/getAllCourses");
const getByIdCourses =require("./modules/courses/getByIdCourses");

//accounts

//payIn
const addPayIn = require("./modules/accounts/PayIn/addPayIn");
const getAllPayIn =require("./modules/accounts/PayIn/getAllPayIn");
const getPayInBtnDate = require("./modules/accounts/PayIn/getPayInBtnDate");
const updatePayIn = require("./modules/accounts/PayIn/updatePayIn");
//payOut

//payIn
const addPayOut = require("./modules/accounts/PayOut/addPayOut");
const getAllPayOut =require("./modules/accounts/PayOut/getAllPayOut");
const getPayOutBtnDate = require("./modules/accounts/PayOut/getPayOutBtnDate");
const updatePayOut = require("./modules/accounts/PayOut/updatePayOut");
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
const addFees=require('./modules/students/addFees');
const updateFees=require("./modules/students/updateFees");
const updateStud = require('./modules/students/updateStud');

//fees

const courseWiseFees = require("./modules/fees/courseWiseFees");
const dateWiseFees = require('./modules/fees/dateWiseFees');
const userModel = require('./models/user/userSchema');



//reference User

const addReferenceUser = require("./modules/referenceUser/addReferenceUser");
const updateReferenceUser =require("./modules/referenceUser/updateReferenceUser");
const getAllReferenceUser =require("./modules/referenceUser/getAllReferenceUser");
const getReferenceUserByField = require("./modules/referenceUser/getReferenceUserByField");
const getWishFieldOfReferenceUser = require("./modules/referenceUser/getWishFieldOfReferenceUser");

//MiddleWare
const paginationMiddleware = require("./modules/middleware/paginationMiddleware")




// Middleware for verifying JWT tokens

function verifyToken(req,res,next){
  const token =req.headers['authorization'];

  if(!token){
    return res.status(403).json({status: 403, message: 'No token Provided', data: null});

  }

  jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
      if(err){
          return res.status(401).json({status: 401, message: 'Failed to authenticate token', data: null})
      }
      req.userId = decoded.id;
      next();
  });
}

// Middleware for role-based authorization

function checkRole(role) {
  
  return async (req,res,next)=>{
   const user=  await userModel.findById(req.userId);
      if(!user || !role.includes(user.role)){
        return res.status(403).json({status: 403, message: "Access Denied", data: null});
      }
      next();
   
  }
}




// Set up multer for image upload

const multer = require('multer');
const updateSalary = require('./modules/employee/updateSalary');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 1, // 2 MB (adjust as needed)
    },
    fileFilter: (req, file, cb) => {
      // Check file types (e.g., allow only images)
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed.'), false);
      }
      cb(null, true);
    },
  });


/**************** fees routes ****************/

app.get("/feesByCourse",verifyToken, checkRole(['admin']),paginationMiddleware(10),courseWiseFees);
app.get("/feesByDate",verifyToken, checkRole(['admin']),paginationMiddleware(10),dateWiseFees)


/**************** student routes ****************/

//app.post("/students",upload.array('images', 2),addStudent);
app.post("/students",verifyToken, checkRole(['admin','staff']),addStudent);
app.get("/students",verifyToken, checkRole(['admin','staff']),paginationMiddleware(10),getAllStud);
app.get("/searchStudents",verifyToken, checkRole(['admin','staff']),paginationMiddleware(10),getStudByField);
app.patch("/fees",verifyToken, checkRole(['admin','staff']),addFees);
app.patch("/updateFees",verifyToken, checkRole(['admin','staff']),updateFees);
app.patch("/students",verifyToken, checkRole(['admin','staff']),updateStud);

/**************** courses routes ****************/
app.post("/courses",verifyToken, checkRole(['admin']),addCourses);
app.get("/courses",verifyToken, checkRole(['admin']),getAllCourses);
app.get("/course/:id",verifyToken, checkRole(['admin']),getByIdCourses);

/**************** referenceUser ****************/

app.post("/refUser",verifyToken, checkRole(['admin','staff']),addReferenceUser);
app.get("/searchRefUser",verifyToken, checkRole(['admin','staff']),getReferenceUserByField);
app.get("/refUser",verifyToken, checkRole(['admin','staff']),getAllReferenceUser);
app.patch("/refUser",verifyToken, checkRole(['admin','staff']),updateReferenceUser);
app.get("/wishFieldRefUser",verifyToken, checkRole(['admin','staff']),getWishFieldOfReferenceUser);

/**************** employees ****************/

app.post("/employee",verifyToken, checkRole(['admin']),addEmployee);
app.get("/searchemp",verifyToken, checkRole(['admin']),getEmpByField);
app.get("/employee",verifyToken, checkRole(['admin']),getAllEmp);
app.patch("/employee",verifyToken, checkRole(['admin']),updateEmp);
app.patch("/salary",verifyToken, checkRole(['admin']),addSalary);
app.patch("/updatesalary",verifyToken, checkRole(['admin']),updateSalary);


 /**************** Accounts ****************/

/****************payIn****************/



app.post("/payIn",addPayIn);
app.get("/payIn",verifyToken, checkRole(['admin','staff']),paginationMiddleware(10),getAllPayIn);
//between to date
app.get("/payInBtnDate",verifyToken, checkRole(['admin']),paginationMiddleware(10),getPayInBtnDate);
app.path("/updatePayIn",verifyToken, checkRole(['admin']),updatePayIn);



/****************payOut****************/

app.post("/payOut",verifyToken, checkRole(['admin']),addPayOut);
app.get("/payOut",verifyToken, checkRole(['admin']),paginationMiddleware(10),getAllPayOut);
//between to date
app.get("/payOutBtnDate",verifyToken, checkRole(['admin']),paginationMiddleware(10),getPayOutBtnDate);
app.path("/updatePayOut",verifyToken, checkRole(['admin']),updatePayOut);


/**************** User ****************/

/****************Register User****************/



app.post("/user",verifyToken, checkRole(['admin','staff']),(req,res)=>{
  const role ="student";
  registerUser(req,res,role);
});

app.post("/staff",verifyToken, checkRole(['admin']),(req,res)=>{
   const role ="staff";
   registerUser(req,res,role);
});

//app.post("/staff",registerUser);

app.post("/admin",verifyToken, checkRole(['superadmin']),(req,res)=>{
  const role ="admin";
  registerUser(req,res,role);
});

app.post("/login",loginUser);

app.listen(8000,()=>{
 console.log("connected");
});