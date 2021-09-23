const toDoButtonEl = document.getElementById("submit-add-to-do");
const inProgressElButtonEl = document.getElementById("submit-add-in-progress");
const doneButtonEl = document.getElementById("submit-add-done");

toDoButtonEl.addEventListener("click",addTaskToCorrectSection)
inProgressElButtonEl.addEventListener("click",addTaskToCorrectSection)
doneButtonEl.addEventListener("click",addTaskToCorrectSection)

// add a task to the correct section
function addTaskToCorrectSection({target}) {  
    if (target === toDoButtonEl || 
        target === inProgressElButtonEl || 
        target === doneButtonEl ){
            
        const section = target.closest("section"); //find the section of the submit event
        let inputTextValue = section.querySelector("input").value; // take the value of the input
        const task = document.createElement("li");
        if (inputTextValue === ""){ //if input text is not have a value ---> alert
            return alert("You did not enter a task")
        }
        task.textContent = inputTextValue;
        task.setAttribute("class", "task"); // add class attribut
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

let data=JSON.parse(localStorage.getItem("tasks"))
function addTasksToLocal(target,newTask){
    if(target === toDoButtonEl){
        data["todo"].unshift(newTask)
        // tasks["todo"].push(newTask)
        localStorage.setItem("tasks",JSON.stringify(data))
    }
    if(target === inProgressElButtonEl){
        data["in-progress"].unshift(newTask)
        localStorage.setItem("tasks",JSON.stringify(data))
    }
    if(target === doneButtonEl){
        data["done"].unshift(newTask)
        // tasks["done"].push(newTask)
        localStorage.setItem("tasks",JSON.stringify(data))
    }
}

// function printData(data) // creates li element of existing data
// {
//     // const sections= document.querySelectorAll("section");
//     // for (let section of sections){
//     //     const ul= section.querySelector("ul");

//     // }
//     for (let i of Object.values(data) ){
//         let liEl = document.createElement("li");
//         liEl.setAttribute("class", "task");
//         liEl.innerText = i
//         List.insertBefore(liEl, List.firstChild);
//     }
// }
printData();
function printData() 
{
    const ul= document.querySelectorAll("ul");
    console.log(ul)
    for(let i of ul){
        
        if(i.classList.contains("to-do-tasks")){
            for(let todo of JSON.parse(localStorage.getItem("tasks"))["todo"]){
                const li= document.createElement("li");
                li.textContent = todo;
                li.classList.add("task");
                i.append(li);
            }   
        }
        if(i.classList.contains("in-progress-tasks")){
            for(let todo of JSON.parse(localStorage.getItem("tasks"))["in-progress"]){
                const li= document.createElement("li");
                li.textContent = todo;
                li.classList.add("task");
                i.append(li);
            }  
        }
        if(i.classList.contains("done-tasks")) {
            for(let todo of JSON.parse(localStorage.getItem("tasks"))["done"]) {
                const li= document.createElement("li");
                li.textContent = todo;
                li.classList.add("task");
                i.append(li);
            }    
        }
    }
}












// edit task
document.addEventListener("dblclick", editTask)

function editTask (event)
{
  
    if (event.target.classList.contains("task")){
        
        const li = event.target;
        console.log(li)
        li.setAttribute("contenteditable",true)
        li.focus();
        console.log(li.textContent);
        if (li.textContent === ""){
            li.remove();
        }

    }
}


// alt 1 2 3
document.addEventListener("mouseover", moveTask)

function moveTask (event)
{
    if (event.target.classList.contains("task")){
        let keysPressed = {};
        document.onkeydown = (e)=>{
            keysPressed[e.key]= true;

            if (keysPressed["Alt"] && e.key === "1"){
                console.log("1");
            }
            if (keysPressed["Alt"] && e.key === "2"){
                console.log("2");
            }
            if (keysPressed["Alt"] && e.key === "3"){
                console.log("3");
            }
        }
        console.log(event);
    }
    
       
}


// function searchFilter() //search maipulation Dom
// {
//     const search = document.getElementById("search").value.toLowerCase(); //converts search text to lower case
//     const allLis= document.querySelectorAll(".task");
//     for(const li of allLis){
//         const liText= li.textContent.toLowerCase() //convert value text to lower case
//         if(!liText.includes(search))
//         {
//             li.remove();
//         }
//     }
//     if(search===""){
//         for(let li of allLis){
//             li.remove();
//         }
//         printData();
//     }
// }

// let toDoArr = JSON.parse(localStorage.getItem("tasks")).todo;
//  // put the data from the local storage in the to do list 
//  for(let i = toDoArr.length -1; i >=0; i-- ){
//     let liEl = document.createElement("li")
//     liEl.setAttribute("class", "task");
//     liEl.innerText = toDoArr[i]
//     toDoListEl.insertBefore(liEl, toDoListEl.firstChild);
// }