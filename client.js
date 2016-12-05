/*
I created a new JSON data file, inside it, you will find an array of objects.
Each object, is each one of you!

http://devjana.net/support/tau_students.json

You first task is to make an AJAX call from the client side app.js, using
an .ajax method and access the json data through the url above. When successful,
it should bring the data back down for use. You will then need to combine that
with what you have learned about parsing objects and arrays to complete the
challenge.

JSON/Ajax reference: https://github.com/devjanaprime/tauAjaxJsonInClass

What I would like to see on the DOM, is one person at a time represented - t
he info for the first person in the json data. One the screen should also be
Prev and Next buttons, that when pressed, show the information for the
appropriate person. These should wrap - prev when on the first person should
wrap around to show the last person and vice versa.

Also on the DOM should be a display showing the number of people and which is
being currently viewed (eg. 2/20)

When a person is displayed, show their name (first & last) and their info.
Only one person should be shown at any given time.

KINDA HARD MODE
Add a button for each person - appended to DOM when the json is read in.
Clicking any button will display that person. Place these between the prev
and next buttons.

Ex: [Prev] [Larry] [Moe] [Curly] [Next]

HARD MODE
Include a fade out and fade in animation in-between transitioning people.

PRO MODE
Include a timer that moves to the next person if the user is not clicking on
next or prev. If the user clicks on next or prev, the timer should be reset.
The timer should transition between people every 10 seconds.
*/

//Holds the data response from Dev's server when the ajax call successfully
//comes back.
var peopleArray = [];
//Tracks which person we are currently looking at.
var personIndex = 0;
//Tracks how long our array is. This is just a helper variable to help keep
//things easier to read for us.
var arrayLength = 0;

$(document).ready(function(){
    //Communication to the Server, we are defining where we want to 'get'
    //information from, and then what to do when we hear back from the
    //server.
    $.ajax({
        dataType: "JSON",
        url: "http://devjana.net/support/tau_students.json",
        success: function(response){
          //What comes back is an object that contains an array. We want to
          //simplify working with that object, so we just grab the 'tau'
          //property out of the object and set it equal to our empty
          //peopleArray variable.
          peopleArray = response.tau;
          //Once again, so we don't need to type 'peopleArray.length' everytime
          //we want to use that value, we set arrayLength equal to it.
          arrayLength = peopleArray.length;
          //Now that the array is equal to the response, we need to make buttons
          //for each person in the array, which createPeopleButtons does for us!
          createPeopleButtons();
          //Now that all that 'stuff' is created and set, we can update our
          //display to see each person with updatePerson.
          updatePerson();
        }
    });

    //Function that I create to make event listeners.
    enable();
});

//Adds Event Listeners
function enable(){
  $(".people-btn-container").on("click", ".person", clickSpecific);
  $(".btn-prev").on("click", prevPerson);
  $(".btn-next").on("click", nextPerson);
}

//What happens when we click on the btn-prev from the HTML
function prevPerson(){
  //Set our index for the person we are looking at back one.
  personIndex--;
  //If we hit -1 or less, move the counter to the last person in the array.
  if(personIndex < 0){
    //Dont forget we need to account for the fact that arrayLength is 1-15,
    //not 0-14 like we need it.
    personIndex = arrayLength - 1;
  }
  //Once we update the index of the person we want to look at, lets update
  //our display to the correct person.
  updatePerson();
}

//Same as the above function, but the reverse, we are now advancing one person.
function nextPerson(){
  personIndex++;
  if(personIndex >= arrayLength){
    personIndex = 0;
  }
  updatePerson();
}

//This is the event that if we click on a specific person, we set the index
//to that specific person.
function clickSpecific(){
  //Grab the data off the button and set the index to that data.
  personIndex = $(this).data("index");
  //Update the display to reflect the new value of the person we selected.
  updatePerson();
}

function createPeopleButtons(){
  //Loop through the array of people,
  for(var i = 0; i < peopleArray.length; i++){
    //Add a button for each person in the array, set a data value on the
    //element that captures their index, for use in the 'clickSpecific'
    //function.
    $(".people-btn-container").append("<button class='person' data-index='" + i + "'></button>");
    //Helper line of code that creates a variable called 'el', which gets
    //set to the Div we created above. Now, anytime we want to do something to
    //that div, we won't need to retarget it with jQuery again. Its in a handy
    //variable that stores the 'reference' to that element.
    var el = $(".people-btn-container").children().last();
    //Set the text of that button equal to the first name of the person that
    //we are looking at in the array.
    el.text(peopleArray[i].first_name);
    //The line below can be used instead of manually adding the data-index,
    //like we did in line 127. The trade off, is that in the method below,
    //we can't see it in the DOM in the inspector tools.
    // el.data("index", i);
  }
}

function updatePerson(){
  //Update the display with the information of the person who is currently
  //set as the personIndex. Which can be changed with the nextPerson, prevPerson,
  //or clickSpecific functions.
  $("#personFirstName").text(peopleArray[personIndex].first_name);
  $("#personLastName").text(peopleArray[personIndex].last_name);
  $("#personInfo").text(peopleArray[personIndex].info);

  //Update the display that shows which person of how many. Ex, 2/20
  $("#tracker").text((personIndex + 1) + "/" + arrayLength);
}
