const mysql=require("mysql");
const express= require ("express");
const app = express();
const bodyParser = require("body-parser");
const encoder= bodyParser.urlencoded();
const cors = require('cors');

app.use("/assets",express.static("assets"));
app.use(cors());
app.use(express.json());
const connection= mysql.createConnection({
	host: "localhost",
	user: 'root',
	password:"2114",
	database: "nodejs"
});

//connect to database

connection.connect(function(error){
	if(error) throw error 
		else console.log("connected to databse successfully!")
})

app.get("/",function(req,res){
	res.sendFile(__dirname + "/login.html");
})

app.get('/api/get-users', function(req, res) {
	const db_query = 'select * from loginuser';
	connection.query(db_query, (err, result) => {
		res.send(result);
	});
});

app.get('/api/get/companies', function(req, res) {
	const db_query = 'select * from companies';
	connection.query(db_query, (err, result) => {
		res.send(result);
	});
});

app.get('/api/get/students', function(req, res) {
	const db_query = 'select * from students';
	connection.query(db_query, (err, result) => {
		res.send(result);
	});
});

app.get('/api/get/company/:id', function(req, res) {
	const db_query = 'select * from companies where id = ' + req.params.id;
	console.log(db_query);
	connection.query(db_query, (err, result) => {
		res.send(result);
	});
});

app.post('/api/create/company', (req, res) => {
    const sql = "INSERT INTO companies (name, gpa, role, open_for, type, Arrival_Date, offered_ctc, Year) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

	 // Adjusted column name
    const values = [
        req.body.name,
        req.body.gpa,
		req.body.role,
        req.body.openfor,

        req.body.type,
        req.body.date, // Use req.body.date for Arrival_Date
        req.body.ctc,
        req.body.year,
    ];
    connection.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/api/create/student', (req, res) => {
    const sql = "INSERT INTO students (name, branch, year, batch, cgpa, backlogs) VALUES (?, ?, ?, ?, ?, ?);"; // Adjusted column name
    const values = [
        req.body.name,
        req.body.branch,
        req.body.year,
        req.body.batch, // Use req.body.date for Arrival_Date
        req.body.cgpa,
        req.body.backlogs,
    ];
    connection.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.put('/update/:id', (req, res) => {
	console.log('receiving data');
    const sql = "UPDATE companies SET Name = ?, Gpa = ?, role = ?, open_for = ?, Type = ?, Arrival_Date = ?, offered_ctc = ?, Year = ? WHERE id = ?";
    const values = [req.body.name, req.body.gpa, req.body.role, req.body.openfor, req.body.type, req.body.date, req.body.ctc, req.body.year, req.params.id];
    connection.query(sql, values, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json({ message: "Company updated successfully" });
    });
});

app.put('/students/update/:id', (req, res) => {
	console.log('receiving data');
    const sql = "UPDATE students SET Name = ?, branch = ?, year = ?, batch = ?, cgpa = ?, backlogs = ? WHERE id = ?";
    const values = [req.body.name, req.body.branch, req.body.year, req.body.batch, req.body.cgpa, req.body.backlogs, req.params.id];
    connection.query(sql, values, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json({ message: "Company updated successfully" });
    });
});


app.delete('/api/remove/:id', (req, res) => {
    const companyId = req.params.id;

    // Define the SQL query to delete the company with the specified ID
    const sql = "DELETE FROM companies WHERE id = ?";
    
    // Execute the SQL query with the company ID parameter
    connection.query(sql, [companyId], (err, data) => {
        if (err) {
            console.error("Error deleting company:", err);
            return res.status(500).json({ error: "An error occurred while deleting the company" });
        }
        return res.json({ message: "Company deleted successfully" });
    });
});
app.delete('/api/delete/:id', (req, res) => {
    const studentid = req.params.id;

    // Define the SQL query to delete the company with the specified ID
    const sql = "DELETE FROM students WHERE id = ?";
    
    // Execute the SQL query with the company ID parameter
    connection.query(sql, [studentid], (err, data) => {
        if (err) {
            console.error("Error deleting student:", err);
            return res.status(500).json({ error: "An error occurred while deleting the student" });
        }
        return res.json({ message: "Student deleted successfully" });
    });
});


app.post("/api/login",encoder,function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password], function(error,results,fields){
		if(results.length > 0){
			// res.redirect("/");
			res.send({message: 'success', user: results[0], status: 200});
		}else{
			res.send({message: 'failed', status: 400})
			// res.redirect("/create");
		}
		res.end();
	})
})

//when login is success
app.get("/dashboard",function(req,res){
	res.sendFile(__dirname + "/dashboard.html")
})

//set app port
app.listen(5000);