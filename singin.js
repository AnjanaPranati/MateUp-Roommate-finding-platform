var mysql = require("mysql");
const express = require("express"); 
const app = express();

var path = require("path");
const bcrypt = require('bcrypt');
var bodyparser = require("body-parser");
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "assets")));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Anju@2004",
    database: "signin"
});

con.connect(function (error) {
    if (error) throw error;
    console.log("connected successfully");
});

app.get("/sign", function (req, res) {
    res.sendFile(path.join(__dirname, 'assets', "indexSign.html"));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'indexLog.html'));
});
app.get('/find', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'find.html'));
});

app.post("/sign", async function (req, res) {
    try {
        var name = req.body.name;
        var email = req.body.email;
        var mon = req.body.mobile;
        var sem = req.body.sem;
        var username = req.body.username;
        var password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);

        var sql = "INSERT INTO usersign(user_name, user_mail, user_mon, user_sem, username, user_password) VALUES (?, ?, ?, ?, ?, ?)";
        con.query(sql, [name, email, mon, sem, username, hashedPassword], function (error, result) {
            if (error) throw error;
            /*res.send('User registered successfully');*/
            res.redirect('/login');
        });
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'welcome.html'));
});

app.post('/login', async function (req, res) {
    const { username, password } = req.body;
    const query = 'SELECT * FROM usersign WHERE username = ?';
    con.query(query, [username], async (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Server error');
            return;
        }
        if (results.length > 0) {
            const user = results[0];
            const match = await bcrypt.compare(password, user.user_password);
            if (match) {
                console.log('Login successful for user:', username);
                res.redirect('/find');
            } else {
                console.log('Invalid password for user:', username);
                res.send('Invalid username or password');
            }
        } else {
            console.log('No user found with username:', username);
            res.send('Invalid username or password');
        }
    });
});
app.get('/details', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'option1.html'));
});
app.post("/details", async function (req, res) {
    try {
        var name1 = req.body.name;
        var age = req.body.age;
        var gender = req.body.gender;
        var collegename = req.body.college;
        var sem1 = req.body.semester;
        var rt = req.body.room_type;
        var no_roomates = req.body.roommates;
        var rent = req.body.rent;
        var locality = req.body.locality;
        var address=req.body.address;
        var mobile = req.body.mobile;
        var e_mail = req.body.email;
    

        var sql1 = "INSERT INTO room(u_name, u_age, u_gender,college_name, sem,room_type,no_of_roomates,rent,locality,address,mobile,u_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        con.query(sql1, [name1, age, gender, collegename,sem1,rt,no_roomates,rent,locality,address,mobile,e_mail], function (error, result) {
            if (error) throw error;
            res.redirect('/welcome');
        });
    } catch (error) {
        res.status(500).send('Error registering details');
    }
});

app.listen(4500, () => {
    console.log("Server is running on port 4500");
});
