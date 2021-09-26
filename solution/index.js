const toDobuttel = document.getElementById("submit-add-to-do");
const inProButtonel = document.getElementById("submit-add-in-progress");
const doneButtonEl = document.getElementById("submit-add-done");
// adding event listner to submit the task to the crorrect section
toDobuttel.addEventListener("click",addTaskToCorrectSection)
inProButtonel.addEventListener("click",addTaskToCorrectSection)
doneButtonEl.addEventListener("click",addTaskToCorrectSection)


// add a task to the correct section
function addTaskToCorrectSection({target}) { 
    if (target === toDobuttel || 
        target === inProButtonel || 
        target === doneButtonEl ){
            
        const section = target.closest("section"); //find the section of the submit event
        let inputTextValue = section.querySelector("input").value; // take the value of the input
        const task = document.createElement("li");
        if (inputTextValue === ""){ //if input text is not have a value  alert
            return alert("You did not enter a task")
        }
        task.textContent = inputTextValue;
        task.setAttribute("class", "task"); // add class attribut
        task.setAttribute("draggable","true") //add attribut for the drag and drop 
        task.setAttribute("ondragstart","drag(event)")//add attribut for the dragd and drop 
        task.setAttribute("id",Math.random())
        const ul = section.querySelector("ul");
        ul.insertBefore(task, ul.firstChild); // add before first child
        addTasksToLocal(target,task.textContent)
        section.querySelector("input").value = ""; //reset input value
    }
}

// to
const toDoListEl = document.getElementsByClassName("to-do-tasks")[0];
const inputAddToDoEl = document.getElementById("add-to-do-task");

// in
const inProgressListEl = document.getElementsByClassName("in-progress-tasks")[0];
const inputAddInProgressEl = document.getElementById("add-in-progress-task");

// done
const doneListEl = document.getElementsByClassName("done-tasks")[0];
const inputAddDoneEl = document.getElementById("add-done-tasks");


//saving to the localStorage
if(!JSON.parse(localStorage.getItem("tasks"))){
    let data ={
        "todo": [],
        "in-progress": [],
        "done": []
    }

     localStorage.setItem("tasks" ,JSON.stringify(data) )
}else{
    localStorage.getItem("tasks")
}

//adding tasks to the local storage
let data=JSON.parse(localStorage.getItem("tasks"))
function addTasksToLocal(target,newTask){
    if(target === toDobuttel){
        data["todo"].unshift(newTask)
        localStorage.setItem("tasks",JSON.stringify(data))
    }
    if(target === inProButtonel){
        data["in-progress"].unshift(newTask)
        localStorage.setItem("tasks",JSON.stringify(data))
    }
    if(target === doneButtonEl){
        data["done"].unshift(newTask)
        localStorage.setItem("tasks",JSON.stringify(data))
    }
}


//print the data 
printData();
function printData() 
{
    const ul= document.querySelectorAll("ul");
    console.log(ul)
    for(let i of ul){
        
        if(i.classList.contains("to-do-tasks")){
            for(let tod of JSON.parse(localStorage.getItem("tasks"))["todo"]){
                const li= document.createElement("li");
                li.textContent = tod;
                li.classList.add("task");
                li.setAttribute("draggable","true");
                li.setAttribute("ondragstart","drag(event)");
                li.setAttribute("id",Math.random());
                i.append(li);
            }   
        }
        if(i.classList.contains("in-progress-tasks")){
            for(let todo of JSON.parse(localStorage.getItem("tasks"))["in-progress"]){
                const li= document.createElement("li");
                li.textContent = todo;
                li.classList.add("task");
                li.setAttribute("draggable","true");
                li.setAttribute("ondragstart","drag(event)");
                li.setAttribute("id",Math.random());
                i.append(li);
            }  
        }
        if(i.classList.contains("done-tasks")) {
            for(let todo of JSON.parse(localStorage.getItem("tasks"))["done"]) {
                const li= document.createElement("li");
                li.textContent = todo;
                li.classList.add("task");
                li.setAttribute("draggable","true");
                li.setAttribute("ondragstart","drag(event)");
                li.setAttribute("id",Math.random());
                i.append(li);
            }    
        }
    }
}




document.addEventListener("dblclick", editTask)//adding event listner to edit task
function editTask (event)
{
    if (event.target.classList.contains("task")){//target to only tasks
        const lis = event.target;
        const oldValue = lis.textContent;
        lis.setAttribute("contenteditable",true)
        lis.focus(); 
        lis.addEventListener("blur", Blur);
        function Blur (){
            const newValue = lis.textContent;
            const section = lis.closest("section");
            const buttonId = section.querySelector("button").id;
            let arrName = section.id;
            
            if(lis.textContent === ""){//if changing to an empty task
                alert("you must enter value"); // alert
                lis.remove();
                let index = data[arrName].indexOf(oldValue);
                data[arrName].splice(index,1);}
            else{
                blurTask (buttonId,arrName,oldValue,newValue)
            }
            localStorage.setItem("tasks",JSON.stringify(data))

        }
    }

}
function blurTask (buttonId,arrName,oldValue,newValue){

    if ((buttonId === "submit-add-to-do")||
        (buttonId === "submit-add-in-progress")||
        (buttonId === "submit-add-done")){

            let index = data[arrName].indexOf(oldValue)
            data[arrName].splice(index,1,newValue)
    }

}



///changing task place by alt+(1,2,3)
document.querySelectorAll('.task').forEach(item => {
    item.addEventListener('mouseover', (e)=>switchTasks(e))  })

    let specificLis;
function switchTasks(e)
{
    specificLis=e.target;
    document.addEventListener("keydown",pressKeys)
}
function pressKeys(e)
{
    const value=specificLis.textContent;
    const section = specificLis.closest("section");

    if (section === null)
    return;

    if(e.altKey&&e.key==='1')
    {
        ul = document.querySelector(".to-do-tasks");
        ul.insertBefore(specificLis,ul.firstChild);
        data["todo"].unshift(value);
        let PropObj = section.id;
        let index = data[PropObj].indexOf(value);
        data[PropObj].splice(index,1);
    }
    if(e.altKey&&e.key==='2')
    { 
        ul = document.querySelector(".in-progress-tasks");
        ul.insertBefore(specificLis,ul.firstChild);
        data["in-progress"].unshift(value);
        let PropObj = section.id;
        let index = data[PropObj].indexOf(value);
        data[PropObj].splice(index,1);
    }
    if(e.altKey&&e.key==='3')
    {
        ul = document.querySelector(".done-tasks");
        ul.insertBefore(specificLis,ul.firstChild);
        data["done"].unshift(value);
        let PropObj = section.id;
        let index = data[PropObj].indexOf(value);
        data[PropObj].splice(index,1);
    }
   
    localStorage.setItem("tasks",JSON.stringify(data))
}
    







//search 
function searchSort() {
    let input = document.getElementById('search').value
    input=input.toLowerCase();
    let tasksArr = document.getElementsByClassName('task');

    for (i = 0; i < tasksArr.length; i++)
     { 
        if (!tasksArr[i].innerHTML.toLowerCase().includes(input)) {
            tasksArr[i].style.display="none";
        }
        else {
            tasksArr[i].style.display="list-item";               
        }
    }
}
const searchbar = document.getElementById("search");
searchbar.addEventListener("keyup",searchSort);


//drag and drop 
function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
        let list=ev.target;
        let  value=list.textContent;        
        let PropObj =ev.target.parentElement.parentElement.id
        let index = data[PropObj].indexOf(value);
        data[PropObj].splice(index,1);
}

function drop(ev) {
        let dat = ev.dataTransfer.getData("text");
        ev.target.firstChild.appendChild(document.getElementById(dat));
        let value=document.getElementById(dat).textContent;
        data[ev.target.id].unshift(value);
        localStorage.setItem("tasks",JSON.stringify(data))
}   

 
                           


//save to api 
const url="https://json-bins.herokuapp.com/bin/614c614318fa9b97f9f6adbd";
async function save(){
    document.getElementById("loader").setAttribute("class","lds-roller");
    const saving= await fetch("https://json-bins.herokuapp.com/bin/614c614318fa9b97f9f6adbd",{
        method:"PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"},
            body:JSON.stringify({"tasks":{data}})
    })
    document.getElementById("loader").removeAttribute("class","lds-roller");
}


//load the api 
async function load() {
  try{ document.getElementById("loader").setAttribute("class","lds-roller")
    const data = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",},
    }
                const response=await fetch("https://json-bins.herokuapp.com/bin/614c614318fa9b97f9f6adbd",data)
                const dat = await response.json();
                console.log(dat.tasks.data)
                localStorage.setItem("tasks",JSON.stringify(dat.tasks.data));
                window.location.reload(false);
                document.getElementById("loader").removeAttribute("class","lds-roller")
      }
      catch{ alert ("error loading")}    
}



//info pargraph hide and show
function pargraph(){
    const element=document.getElementById("parg")
    if (element.classList.contains("hide")){
        element.removeAttribute("class","hide")
    }
    else element.setAttribute("class","hide")
    console.log(element)
}