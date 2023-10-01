const express = require('express') // loads the express package
const { engine } = require('express-handlebars'); // loads handlebars for Express
const port = 8080 // defines the port
const app = express() // creates the Express application
const sqlite3 = require('sqlite3') 

// defines handlebars engine
app.engine('handlebars', engine());
// defines the view engine to be handlebars
app.set('view engine', 'handlebars');
// defines the views directory
app.set('views', './views');

// define static directory "public" to access css/ and img/
app.use(express.static('public'))

// MODEL (DATA)
const humans = [
    {"id": "0", "name": "Arvin"},  
]

const db = new sqlite3.Database('projects-at.db')

db.run("CREATE TABLE projects (projectID INTEGER PRIMARY KEY, projectName TEXT NOT NULL, projectYear INTEGER NOT NULL, projectDescription TEXT NOT NULL)", (error) =>{
  if (error){
    console.log("Error: ", error)
  }
  else {
    console.log("---> Table projects created")
    
    const projects = [
      { "id":"1", "name":"Webdevelpoment Project", "year": 2023, "description":"The project I completed in this course was a simple portfolio webside. It showed my CV, some general knowledge about me, contact information and some of the projects I've worked on. HTML and CSS was used for the webside, javascript for server-side programming and SQLlight for databases." },
      { "id":"2", "name":"Nuclear Powerplant", "year": 2021, "description":"The project was done in a team of students from both DIS and DMP. The aim of the project was to simulate a nuclear powerplant. My mission was to build the powerplant using an Arduino with an RFID scanner, a 16x2 lcd display, a potentiometer and a bluetooth module. A RFID scanner was used to scan tags of different employers. The display acted as a safety console to display relevant information. With the potentiometer we where able to increase or decrease the radioactivity and the bluetooth module was used to connect an app on the phone and subsequently send information through." },
      { "id":"3", "name":"Mbot Robot", "year": 2021, "description":"This projected consisted of building a moving robot with an arduino microcontroller as its brain and create the softwere needed.The robot needed to be able to be conected to a phone via bluebooth. And from the phone be controlled like an RC car or swap from manual to automatic driving or vice versa. For the Robots automatic drive it needed to drive by it self within a domain and be able to avoid and detect objects. For these features to be accomplished a Line detector was used for the robot to stay within a domain And an ultrasonicsensor was used to detect and avoid obstacles. With to PWM motors used to move the robot."},
      { "id":"4", "name":"Java TicTacToe", "year": 2022, "description":"The aim of this project was to change and rewrite a TicTacToe program in java so it complied with different design principles and patterns. These being primarly GRASP and MVC. "},
      { "id":"5", "name":"Microchip Microcontroller", "year": 2023, "description":"This project was my NFK mission I did at Tidomat AB. My goal was to change microcontroller of one of their products. It was using an older Microchip MCU and I needed to change it to a newer version of the original MCU. Because the new MCU could only run on microchips latests compiler my mission for the project became to update the old MCU to be compadible on the NEW compiler, and then port over that code and change so it could be used on the new MCU."}
    ]

    projects.forEach( (oneProject) => {
      db.run("INSERT INTO projects(projectID, projectName, projectYear, projectDescription) VALUES (?, ?, ?, ?)", [oneProject.id, oneProject.name, oneProject.year,
        oneProject.description], (error) => {
          if (error) {
            console.log("ERROR: ", error)
          }
          else {
            console.log("Line added into the projects table")
          }
        })
    })
  }
})

db.run("CREATE TABLE skills (skillID INTEGER PRIMARY KEY, skillName TEXT NOT NULL, skillType TEXT NOT NULL, skillDescription TEXT NOT NULL)", (error) => {
  if (error){
    console.log("ERROR: ", error)
  }
  else {
    console.log("---> Table skills created")

    const skills=[
      {"id":"1", "name":"HTML/CSS", "type": "Web Development", "description":"Markup language and style sheet from web development"},
      {"id":"2", "name":"C", "type":"Programming Language", "description":"Programming with C"},
      {"id":"3", "name":"C++", "type":"Programming Language", "description":"Programming with C++"},
      {"id":"4", "name":"Java", "type":"Programming Language", "description":"Programming with Java"},
      {"id":"5", "name":"Javascript", "type":"Programming Language", "description":"Programming with Javascript"},
      {"id":"6", "name":"Node", "type":"Programming Language", "description":"Programming with Javascript on the server side"},
      {"id":"7", "name":"Express", "type":"Framework", "description":"A framework for programming Javascript on the server side"},
      {"id":"8", "name":"Assembler", "type":"Programming Language", "description":"Programming with Assembly"}
    ]

    skills.forEach((oneSkill) => {
      db.run("INSERT INTO skills (skillID, skillName, skillType, skillDescription) VALUES (?, ?, ?, ?)", [oneSkill.id, oneSkill.name, oneSkill.type, oneSkill.description], (error) =>{
        if (error) {
          console.log("ERROR: ", error)
        }
        else {
          console.log("line added into the skills table")
        }
      })  
    })
  }
})

db.run("CREATE TABLE projectsSkills (projectSkillID INTEGER PRIMARY KEY, projectID INTEGER, skillID INTEGER, FOREIGN KEY (projectID) REFERENCES projects (projectID), FOREIGN KEY (skillID) REFERENCES skills (skillID))", (error) => {
  if (error) {
    console.log("ERROR: ", error)
  } 
  else {
    console.log("---> Table projectsSkills created!")

    const projectsSkills = [
      {"id":"1", "projectID":"1", "skillID":"1"},
      {"id":"2", "projectID":"1", "skillID":"5"},
      {"id":"3", "projectID":"1", "skillID":"6"},
      {"id":"4", "projectID":"1", "skillID":"7"},
      {"id":"5", "projectID":"2", "skillID":"3"},
      {"id":"6", "projectID":"3", "skillID":"3"},
      {"id":"7", "projectID":"4", "skillID":"4"},
      {"id":"8", "projectID":"5", "skillID":"2"},
      {"id":"9", "projectID":"5", "skillID":"8"}
    ]
    
    projectsSkills.forEach( (oneProjectSkill) => {
      db.run("INSERT INTO projectsSkills (projectSkillID, projectID, skillID) VALUES (?, ?, ?)", [oneProjectSkill.id, oneProjectSkill.projectID, oneProjectSkill.skillID], (error) => {
        if (error) {
          console.log("ERROR: ", error)
        } 
        else {
          console.log("Line added into the projectsSkills table!")
        }
      })
    })
  }
})



// CONTROLLER (THE BOSS)
// defines route "/"
app.get('/', function(request, response){
  response.render('home.handlebars')
})

// defines route "/humans"
app.get('/about', function(request, response){
  //const model = { listHumans: humans } // defines the model
  // in the next line, you should send the abovedefined 
  // model to the page and not an empty object {}...
  //response.render('about.handlebars', model)



  response.render('about.handlebars')
})

app.get('/cv', function(request, response){
  
  response.render('cv.handlebars')
})


app.get('/contact', function(request,response){

  const id = request.params.id; // Convert the id string to a number

  // Find the human with the given id
  const human = humans.find(h => h.id === id);
  
  response.render('contact.handlebars', human);
 
})

app.get('/projects', function(request,response){
  //const projects_model = { listProjects: projects}
  //response.render('projects.handlebars', projects_model);
  db.all("SELECT * FROM projects", function (error, theProjects) {
    if (error) {
        const model = {
            databaseError: true,
            theError: error,
            projects: []
        }
        // renders the page with the model
        response.render("projects.handlebars", model)
    }
    else {
        const model = {
            databaseError: false,
            theError: "",
            projects: theProjects
        }
        // renders the page with the model
        response.render("projects.handlebars", model)
    }
  })
   
})

app.get('/projects/:id', function(request, response){

  const projectId = request.params.id;
  // Fetch project details
  db.get("SELECT projectID, projectName, projectYear, projectDescription FROM projects WHERE projectID = ?", [projectId], (error, project) => {
      if (error) {
          throw error;
      }

      if (project) {
          // Fetch skills associated with the project
          db.all(`
                SELECT skills.skillID, skills.skillName, skills.skillType, skills.skillDescription
                FROM skills
                JOIN projectSkills ON skills.skillID = projectSkills.skillID
                WHERE projectSkills.projectID = ?
                `, [projectId], (error, skills) => {
                  console.log(skills);
              if (error) {
                  throw error;
              }

              response.render('project.handlebars', { project: project, skills: skills });
          });
      } else {
          response.status(404).send('Project not found');
      }
  });

});

// defines the final default route 404 NOT FOUND
app.use(function(req,res){
  res.status(404).render('404.handlebars');
});

// runs the app and listens to the port
app.listen(port, () => {
    console.log(`Server running and listening on port ${port}...`)
})

