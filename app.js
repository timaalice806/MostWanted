function app(people) {
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  switch (searchType) {
    case "yes":
    mainMenu(searchByName(people), people)            
      break;
    case "no":
      searchBySingleTrait(people)
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
      break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt(
    "Found " +
      person.firstName +
      " " +
      person.lastName +
      " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'"
  );

  switch (displayOption) {
    case "info":
      // TODO: get person's info
      break;
    case "family":
      // TODO: get person's family
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people) {
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  let filteredPeople = people.filter(function(el) {
    if (el.firstName === firstName && el.lastName === lastName) {
      return el;
    }
  });

  // TODO: What to do with filteredPeople?
}
function searchBySingleTrait (people) {
  let criteriaType = promptFor("Search by trait: Gender, D.O.B(MMDDYYYY), Height, Weight, Eye Color, Occupation", chars).toLowerCase();
  var criteriaArr = [];
switch (criteriaType) {
  case "gender":
  let enteredGender = prompt("Please enter 'male' or 'female':")
  var criteriaArr = people.filter(function(el){
    if(el.gender == enteredGender){
      return true;
    }
  })
    break;
  case "DOB":
    break;  
  case "height":
    let enteredHeight = prompt("Please enter 'height':")
    var criteriaArr = people.filter(function(el){
      if(el.height == parseInt(enteredHeight)){
        return true;
      }
    })
    console.log(criteriaArr)
    break;
  case "weight":
    let enteredWeight = prompt("Please enter 'weight':")
    var criteriaArr = people.filter(function(el){
      if(el.weight == parseInt(enteredWeight)){
        return true;
      }
    })
    console.log(criteriaArr)
    break;
  case "eye color":
    let enteredColor = prompt("Please enter 'eye color':")
    var criteriaArr = people.filter(function(el){
      if(el.eyeColor == enteredColor){
        return true;
      }
    })
    console.log(criteriaArr)
    break; 
  case "occupation":
    let enteredOcc = prompt("Please enter 'occupation':")
    var criteriaArr = people.filter(function(el){
      if(el.occupation == enteredOcc){
        return true;
      }
    })
    console.log(criteriaArr)
    break; 
  default:
    alert("Please enter a valid response.")
    searchBySingleTrait(people)
    return;    
}
}

// alerts a list of people
function displayPeople(people) {
  alert(
    people
      .map(function(person) {
        return person.firstName + " " + person.lastName;
      })
      .join("\n")
  );
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, callback) {
  do {
    var response = prompt(question).trim();
  } while (!response || !callback(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}
