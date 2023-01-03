var express = require("express")
var app = express()

var cors = require("cors")
let projectCollection;


app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({extends: false}));
app.use(cors());

//mongoDB connection
const MongoClient = require('mongodb').MongoClient;

//add database connection
const uri = 'mongodb+srv://psapkota:mamu1997@cluster0.raumtos.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {useNewUrlParser: true})

const insertProjects = (project, callback) => {
    projectCollection.insert(project, callback);
}

const getProjects = (callback) => {
    projectCollection.find({}).toArray(callback);
}

const createCollection = (collectionName) => {
    client.connect((err,db) => {
        projectCollection = client.db().collection(collectionName);
        if(!err){
            console.log('MongoDB Connected')
        }
        else {
            console.log("DB Error: ", err);
            process.exit(1);
        }
    }
    )
}

const cardList = [
    {
        title: "Kakadu National Park",
        image: "kakadu.png",
        link: "Australia's Capital Cities",
        desciption: "Located in Northern Territory, Towards the end-of-year dry season, the birds and reptiles of Kakadu National Park in the Northern Territory are crammed into ever shrinking wetlands."
    },
    {
        title: "Sydney Harbour Bridge",
        image: "sydhrb.png",
        link: "Australia's Capital Cities",
        desciption: "Located in Sydney of New South Wales, Climb to the dizzying heights of the Sydney Harbour Bridge for a 360-degree panorama of the world's greatest harbour."
    }
]

app.get('/test', (request, response) => {
        var user_name = request.query.user_name;
        response.end("Hello " + user_name + "!");
    })

app.get('/mulTwoNumbers/:firstNumber/:secondNumber', function (req, res) {
        var firstNumber = parseInt(req.params.firstNumber);
        var secondNumber = parseInt(req.params.secondNumber);
        var result = firstNumber * secondNumber || null;
        if (result == null) {
            res.json({ result: result, statusCode: 400 }).status(400);
        }
        else {
            res.json({ result: result, statusCode: 200 }).status(200);
        }
    })


app.get('/api/projects',(req, res) => {
    getProjects((err, result) => {
        if(err) {
            res.json({statusCode: 400, message:err})
        }
        else {
            res.json({statusCode: 200, message:"Success", data: result})
        }
    })
})

app.post('/api/projects', (req,res) => {
    console.log("Project added", req.body)
    var newPro = req.body;
    insertProjects( newPro, (err, result)=> {
        if(err) {
            res.json({statusCode: 400, message:err})
        }
        else {
            res.json({statusCode: 200, message:"Added Successfully", data: result})
        }
    })
})

var port = process.env.port || 3000;

app.listen(port, () =>{
    console.log("App listening to: " + port)
    createCollection("Australia")
})