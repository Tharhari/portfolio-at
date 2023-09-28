const express = require('express') // loads the express package
const { engine } = require('express-handlebars'); // loads handlebars for Express
const port = 8080 // defines the port
const app = express() // creates the Express application

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
const projects = [
  {"id": "0", "project": "Portfolio website"},
  {"id": "1", "project": "Java chess program"},
]



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
  const projects_model = { listProjects: projects}

  response.render('projects.handlebars', projects_model);
   
})

app.get('/projects/:id', function(request, response){
  // get the id from the dynamic route
  const id = request.params.id;

  const projects_model = projects.find(h => h.id === id);


  if (projects_model) {
      
      response.render('project.handlebars', projects_model);
  } else {
      
      response.status(404).render('404.handlebars');
  }
});

// defines the final default route 404 NOT FOUND
app.use(function(req,res){
  res.status(404).render('404.handlebars');
});

// runs the app and listens to the port
app.listen(port, () => {
    console.log(`Server running and listening on port ${port}...`)
})

