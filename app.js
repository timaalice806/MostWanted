function app(people) {
  var searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  switch (searchType) {
    case "yes":
      var person = searchByName(people);
      mainMenu(person, people);
      break;
    case "no":
      var person = searchByTraits(people); //master function to take people, choose a trait to narrow down by, display that list of people, ask to narrow down by more traits (yes or no prompt), repeat process until only one person is left
      mainMenu(person, people);
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
      mainMenu(person, people);
      break;
    case "family":
      var newFamilyTree = mapFamilyTrees(people);
      var newFamilyList = searchForFamily(person, newFamilyTree, people);
      if (newFamilyList.length !== 0) {
        displayFamily(newFamilyList);
      } else {
        alert("No Family Members Found!");
      }
      mainMenu(person, people);
      break;
    case "descendants":
      var newFamilyTree = mapFamilyTrees(people);
      var descendantsList = searchForDescendants(person, newFamilyTree);
      if (descendantsList.length !== 0) {
        displayPeople(descendantsList);
      } else {
        alert("No Descendants Found!");
      }
      mainMenu(person, people);
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
function searchForDescendants(person, newFamilyTree) {
  var personTree;
  for (i in newFamilyTree) {
    if (i == person.id) {
      personTree = newFamilyTree[i];
    }
  }
  var newDescendants = [];
  var descendantsList = childrenOfDescendants(personTree, newDescendants);
  return descendantsList;
}
function childrenOfDescendants(personTree, descendants) {
  for (var childID in personTree["children"]) {
    descendants.push(personTree["children"][childID]);
    if (personTree["children"][childID].hasOwnProperty("children")) {
      childrenOfDescendants(personTree["children"][childID], descendants);
    }
  }
  return descendants;
}
function searchByTraits(people) {
  var person;
  var traitType = promptFor(
    "Which trait would you like to search for? Choose one of the following: gender, dob, height, weight, eyecolor, occupation",
    chars
  ).toLowerCase();
  switch (traitType) {
    case "gender":
      var response = promptFor(
        "Which gender to filter by? male or female",
        chars
      ).toLowerCase();
      var filteredPeople = searchBySingleTrait(people, response, "gender");
      person = filteredPeopleCheck(filteredPeople);
      break;
    case "dob":
      var response = promptFor(
        "Type in the Date of Birth in m/d/year format",
        chars
      );
      var filteredPeople = searchBySingleTrait(people, response, "dob");
      person = filteredPeopleCheck(filteredPeople);
      break;
    case "height":
      var response = parseInt(promptFor("Enter height:", chars));
      var filteredPeople = searchBySingleTrait(people, response, "height");
      person = filteredPeopleCheck(filteredPeople);
      break;
    case "weight":
      var response = parseInt(promptFor("Enter weight", chars));
      var filteredPeople = searchBySingleTrait(people, response, "weight");
      person = filteredPeopleCheck(filteredPeople);
      break;
    case "eyecolor":
      var response = promptFor(
        "Enter the eye color to filter by: ",
        chars
      ).toLowerCase();
      var filteredPeople = searchBySingleTrait(people, response, "eyeColor");
      person = filteredPeopleCheck(filteredPeople);
      break;
    case "occupation":
      var response = promptFor(
        "Enter the occupation to filter by: ",
        chars
      ).toLowerCase();
      var filteredPeople = searchBySingleTrait(people, response, "occupation");
      person = filteredPeopleCheck(filteredPeople);
      break;
    default:
      alert("Invalid input. Please try again!");
      searchByTraits(people);
  }
  return person;
}
function mapFamilyTrees(people) {
  var tree = [],
    mappedNewPeople = {},
    pEl,
    mappedEl;
  for (var i = 0; i < people.length; i++) {
    pEl = people[i];
    mappedNewPeople[pEl.id] = pEl;
    mappedNewPeople[pEl.id]["children"] = [];
  }
  for (var id in mappedNewPeople) {
    if (mappedNewPeople.hasOwnProperty(id)) {
      mappedEl = mappedNewPeople[id];
      for (var parentID in mappedEl["parents"]) {
        if (mappedEl["parents"][parentID]) {
          mappedNewPeople[mappedEl["parents"][parentID]]["children"].push(
            mappedEl
          );
        }
      }
    } else {
      tree.push(mappedEl);
    }
  }
  return mappedNewPeople;
}
function filteredPeopleCheck(filteredPeople) {
  var person;
  if (filteredPeople.length === 1) {
    person = filteredPeople[0];
  } else if (filteredPeople.length > 1) {
    displayPeople(filteredPeople);
    person = searchByTraits(filteredPeople);
  } else {
    person = null;
    alert(
      "No person found with these traits! You will be prompted to try again."
    );
  }
  return person;
}
function searchByName(people) {
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);
  let filteredPeople = people.filter(function(el) {
    if (el.firstName === firstName && el.lastName === lastName) {
      return el;
    }
  });
  if (filteredPeople.length === 1) {
    var person = filteredPeople[0];
    return person;
  } else if (filteredPeople.length > 1) {
    return filteredPeople;
  } else {
    var person = null;
    return person;
  }
}
function searchForFamily(person, familyTrees, people) {
  // find the person Tree, find immediate family members (parents and siblings; children optional) and display names WITH Relation
  var personTree;
  for (var i in familyTrees) {
    if (i == person.id) {
      personTree = familyTrees[i];
    }
  }
  var familyList = [];
  if (personTree["parents"].length !== 0) {
    for (var i in personTree["parents"]) {
      var foundParent = people.filter(function(el) {
        if (el["id"] === personTree["parents"][i]) {
          return el;
        }
      });
      var addParent = foundParent[0];
      familyList.push(addParent);
      var lastAdd = familyList.length - 1;
      familyList[lastAdd].relation = "Parent";
    }
  }
  if (personTree["currentSpouse"] !== null) {
    var foundSpouse = people.filter(function(el) {
      if (el["id"] === personTree["currentSpouse"]) {
        return el;
      }
    });
    var addSpouse = foundSpouse[0];
    familyList.push(addSpouse);
    var lastAdd = familyList.length - 1;
    familyList[lastAdd].relation = "Spouse";
  }
  if (familyList.length !== 0) {
    if (
      (familyList[0].relation == "Parent" &&
        familyList[1].relation == "Parent") ||
      familyList[0].relation == "Parent"
    ) {
      var foundSiblings = people.filter(function(el) {
        if (el.parents.toString() === personTree["parents"].toString()) {
          if (el["id"] !== personTree["id"]) {
            return el;
          }
        }
      });
      if (foundSiblings.length !== 0) {
        for (var sibling of foundSiblings) {
          familyList.push(sibling);
          var lastAdd = familyList.length - 1;
          familyList[lastAdd].relation = "Sibling";
        }
      }
    }
  }
  if (personTree["children"] !== 0) {
    for (var i of personTree["children"]) {
      var foundChild = people.filter(function(el) {
        if (el["id"] === i["id"]) {
          return el;
        }
      });
      var addChild = foundChild[0];
      familyList.push(addChild);
      var lastAdd = familyList.length - 1;
      familyList[lastAdd].relation = "Child";
    }
  }
  return familyList;
}
// alerts the family list
function displayFamily(familyList) {
  alert(
    familyList
      .map(function(person) {
        return (
          person.firstName + " " + person.lastName + "'s " + person.relation
        );
      })
      .join("\n")
  );
}
function searchBySingleTrait(people, response, trait) {
  let filteredPeople = people.filter(function(el) {
    if (el[trait] === response) {
      return el;
    }
  });
  return filteredPeople;
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
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation;
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