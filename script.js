//Get current Date and Time variables
var dateNow = moment();
var dateNowArrInt = moment().toArray();
var reRenderPointer = dateNowArrInt[3];
var calDayIndex = 0;
var calMonthIndex = 0;
var calYearIndex = 0;

//Load current time values into the calendar time dispaly. 
var currentCalDateObj = document.getElementById("curCalDate");
currentCalDateObj.innerText = moment().format("DD-MM-YYYY");

//Get HTML objects
var containerObj = document.getElementById("container");
var dayLeftObj = document.getElementById("dayleft");
var dayRightObj = document.getElementById("dayright");
var monthLeftObj = document.getElementById("monthleft");
var monthRightObj = document.getElementById("monthright");
var yearLeftObj = document.getElementById("yearleft");
var yearRightObj = document.getElementById("yearright");
var currentDayObj = document.getElementById("currentDay");
var startRowObj = document.getElementById("startrow");
var hrWatchDivObj = document.getElementById("hrWatchDiv");

//Add event listeners
dayLeftObj.addEventListener("click", dayLeft);
dayRightObj.addEventListener("click", dayRight);
monthLeftObj.addEventListener("click", monthLeft);
monthRightObj.addEventListener("click", monthRight);
yearLeftObj.addEventListener("click", yearLeft);
yearRightObj.addEventListener("click", yearRight);
hrWatchDivObj.addEventListener("click", yearRight);
//Add change of state listener to rerender the calendar in the event of hour change whilst user is using the app


//Start 1 Sec interval timer to update HTML date and time object on page
var oneSecTick = setInterval(clk,1000);




function clk(){
dateNow = moment();
dateNowArrInt = moment().toArray();
currentDayObj.innerText = dateNow;

if (dateNowArrInt[3] != reRenderPointer){
    reRenderPointer = dateNowArrInt[3] ;
    renderToDO(dateNowArrInt[3])
}
}


//Render to do list on first page load
renderToDO(dateNowArrInt[3]);


function renderToDO(curHr){

   for (let i = 0; i < 24; i++) {   

    //Create flex container with the class flex and give it a unique ID.
    var divObj = document.createElement("div");
    divObj.setAttribute("class","flexToDo");
    divObj.setAttribute("id","flex" + i);    
    document.getElementById("startrow").appendChild(divObj);
    var flexID = divObj.id;

    // Create a time block
    var timeObj = document.createElement("p");
    timeObj.setAttribute("id", "time" + i); 
    timeObj.setAttribute("class","time");
    document.getElementById(flexID).appendChild(timeObj);
    var txt = document.createTextNode(i + ":00");
    document.getElementById("time" + i).appendChild(txt);
    
    // Create a text input box with the class row, a unique id and of type text.
    var inpObj = document.createElement("input");
    inpObj.setAttribute("type", "text");
    inpObj.setAttribute("id", "r" + i);  
    
    //Set attr background colour based upon local time to show past , present and future
    if (i < curHr){
        inpObj.setAttribute("class","row form-control past");  
        
        }else if(i > curHr){
        inpObj.setAttribute("class","row form-control future");

        }else if (i = curHr){
        inpObj.setAttribute("class","row form-control present");
    }
    
    document.getElementById(flexID).appendChild(inpObj);


    //Create a button element with a unique id and class of savBtn
    var btnObj = document.createElement("button");
    btnObj.setAttribute("id", "b" + i); 
    btnObj.setAttribute("class","btn saveBtn btn-outline-primary");  
    btnObj.setAttribute("data-bs-toggle", "tooltip"); 
    btnObj.setAttribute("data-bs-placement", "right"); 
    btnObj.setAttribute("title", "Click to save"); 
    btnObj.textContent = "Save"
    document.getElementById(flexID).appendChild(btnObj);

   }//End For loop for object creation
    

    //Add click event to all savebtn
    var saveBtnObjs = document.getElementsByClassName("saveBtn");

    for (let i = 0; i < saveBtnObjs.length; i++) {
        
        saveBtnObjs[i].addEventListener("click", saveCalendar);
    }//End For loop for event listener saveBtn
    
    //Load calendar values
    loadCalendar();
    
}//End renderToDo Function


function dayLeft(){
    calDayIndex --;
    currentCalDateObj.innerText = moment().add(calDayIndex , "days").format("DD-MM-YYYY");
    loadCalendar(currentCalDateObj.innerText);
}

function dayRight(){
    calDayIndex ++;
    currentCalDateObj.innerText = moment().add(calDayIndex , "days").format("DD-MM-YYYY");
    loadCalendar(currentCalDateObj.innerText);
}

function monthLeft(){
    calMonthIndex --;
    currentCalDateObj.innerText = moment().add(calMonthIndex  , "months").format("DD-MM-YYYY");
    loadCalendar(currentCalDateObj.innerText);
}

function monthRight(){
    calMonthIndex ++;
    currentCalDateObj.innerText = moment().add(calMonthIndex  , "months").format("DD-MM-YYYY");
    loadCalendar(currentCalDateObj.innerText);
}

function yearLeft(){
    calYearIndex --;
    currentCalDateObj.innerText = moment().add(calYearIndex  , "years").format("DD-MM-YYYY");
    loadCalendar(currentCalDateObj.innerText);
}

function yearRight(){
    calYearIndex ++;
    currentCalDateObj.innerText = moment().add(calYearIndex  , "years").format("DD-MM-YYYY");
    loadCalendar(currentCalDateObj.innerText);
}



function loadCalendar(){

    //Clear old calendar entries
    var calObj = document.getElementsByClassName("row");

    for (let i = 0; i < calObj.length; i++) {
        calObj[i].value = "";       
    }
    //Get new calendar items from storage
    let calDispObj = localStorage.getItem(currentCalDateObj.innerText);

    //Render calendar entries for the selected day.
    if (calDispObj != null){

        var calDispObjarr = JSON.parse(calDispObj);

        for (let i = 0; i < calDispObjarr.length; i++) {
            calObj[i].value = calDispObjarr[i];        
        }
    }
}

function saveCalendar(e){
  
  //Get all calendar entries with classname 
  var calData = document.getElementsByClassName("row");
  
  let storeJSONarr = [] ;
  for (let i = 0; i < calData.length; i++) {
        
        storeJSONarr[i] = calData[i].value;        
    }
    //JSON the data and store in local storage
    let calStoreObj = JSON.stringify(storeJSONarr);
    localStorage.setItem(currentCalDateObj.innerText,calStoreObj) 
}







