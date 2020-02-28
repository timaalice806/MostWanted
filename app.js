function app(people) {
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  switch (searchType) {
    case "yes":
      mainMenu(searchByName(people), [0]);
      break;
    case "no":
      //searchBySingleTrait(people);
      searchByMultipleTraits();
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
      displayPerson(person);
      break;
    case "family":
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
  return filteredPeople[0];
  // TODO: What to do with filteredPeople?
}
function searchBySingleTrait(people) {
  let criteriaType = promptFor(
    "Search by trait: Gender, D.O.B(MM/DD/YYYY), Height, Weight, Eye Color, Occupation",
    chars
  ).toLowerCase();
  let criteriaArr = [];
  let enteredGender = prompt("Please enter 'male' or 'female':");
  switch (criteriaType) {
    case "gender":
      criteriaArr = people.filter(function(el) {
        if (el.gender == enteredGender) {
          return true;
        }
      });
      return criteriaArr;
    case "DOB":
      break;
    case "height":
      let enteredHeight = prompt("Please enter 'height':");
      let heightCriteriaArr = people.filter(function(el) {
        if (el.height == parseInt(enteredHeight)) {
          return true;
        }
      });
      return heightCriteriaArr;
    case "weight":
      let enteredWeight = prompt("Please enter 'weight':");
      let weightCriteriaArr = people.filter(function(el) {
        if (el.weight == parseInt(enteredWeight)) {
          return true;
        }
      });
      return weightCriteriaArr;
    case "eye color":
      let enteredColor = prompt("Please enter 'eye color':");
      let colorCriteriaArr = people.filter(function(el) {
        if (el.eyeColor == enteredColor) {
          return true;
        }
      });
      return colorCriteriaArr;
    case "occupation":
      let enteredOcc = prompt("Please enter 'occupation':");
      let occCriteriaArr = people.filter(function(el) {
        if (el.occupation == enteredOcc) {
          return true;
        }
      });
      return occCriteriaArr;
    default:
      alert("Please enter a valid response.");
      searchBySingleTrait(people);
      break;
  }
}

const searchByMultipleTraits = (people) => {
  let gender = promptFor("Please enter a gender, please enter n/a if unknow: ", chars);
  let dob = promptFor("Please enter a dob, please enter n/a if unknow: ", chars);
  let occupation = promptFor("Please enter their occupation, please enter n/a if unknow: ", chars);
  let eyeColor = promptFor("Please enter a eyeColor, please enter n/a if unknow: ", chars);
  let weight = promptFor("Please enter a weight, please enter n/a if unknow: ", chars);

  let peopleSearch = people;

  peopleSearch = peopleSearch.filter(el => {
    if(gender == "n/a"){
      return peopleSearch;
    }else if(el.gender == gender){
      return el;
    } 
  })
  peopleSearch = peopleSearch.filter(el => {
    if(dob == "n/a"){
      return peopleSearch
    }else if(el.dob == dob){
      return el
    } 
  })
  peopleSearch = peopleSearch.filter(el => {
    if(occupation == "n/a"){
      return peopleSearch
    }else if(el.occupation == occupation){
      return el
    } 
  })
  peopleSearch = peopleSearch.filter(el => {
    if(eyeColor == "n/a"){
      return peopleSearch
    }else if(el.eyeColor == eyeColor){
      return el
    } 
  })
  peopleSearch = peopleSearch.filter(el => {
    if(weight == "n/a"){
      return peopleSearch
    }else if(el.weight == weight){
      return el
    } 
  })
  return peopleSearch[0];
}

// alerts a list of people
function displayPeople(people) {
  alert("Result: " + people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n")
  )}
  
function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Age: " + new Date(person.dob) + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function displayFamily(person, people){
  let perents = [] 
  
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
