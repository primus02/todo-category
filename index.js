//SELECTORS
const todoContainer= document.querySelector(".todo-container");
const submitBtn= document.querySelector(".submit");
const todo= document.querySelector(".input-todo");
let todoArray= [];
let todoCats=[];
let exists;

//Event Listeners
//Add Categories and Todos
submitBtn.addEventListener("click", ()=> {
    exists= false;
    if(todo.value === ""){
        alert("Input field cannot be empty!");
        return;
     }

    let todoDate= new Date().toLocaleString();
    let newTodo= {category: todo.value[0].toUpperCase(), title: todo.value, createdAt: todoDate};
   
    for(let i=0; i < todoCats.length ; i++){
        if(todoCats[i] === todo.value[0].toUpperCase()){
        exists= true;
        }
    }
  
     if(!exists){
         todoCats.push(todo.value[0].toUpperCase());
     }
  
    todoArray.push(newTodo);

    localStorage.setItem("todoArray", JSON.stringify(todoArray));

    todoCats.sort((a,b)=> {
        if(a < b){
            return -1;
        }
        if(a > b){
            return 1;
        }
        return 0;
   })

localStorage.setItem("todoCats", JSON.stringify(todoCats));


   todoContainer.innerHTML= "";

    displayCats(todoCats);

    displayTodoItems(todoArray)

   todo.value= "";
});


//Delete Todos
let deleteButtons= document.querySelectorAll(".delete-btn");
deleteButtons.forEach(button=> {
    button.addEventListener("click", (e)=> {
        deleteTodo(e);
    })
})


//Functions
//Display Categories
function displayCats(todoCats){
    todoCats.forEach(cat=> { 
       
        let todoCat= `
                   <div class="todo-item">
                        <h4>${cat}</h4>
                        
                   </div>
               `;
 
 
       todoContainer.insertAdjacentHTML("beforeend", todoCat);
    });

}

//Display Todos
function displayTodoItems(todoArray){

    let todoItems= document.querySelectorAll(".todo-item");

    todoArray.forEach(todo=> {
        todoItems.forEach(todoItem=> {
             if(todo.category === todoItem.children[0].innerHTML){
                 todoItem.insertAdjacentHTML("beforeend", `<div class="todo-details">
                                        <p class="title">${todo.title}</p>
                                        <p class="date">${todo.createdAt}</p>
                                        <p class="button"><button id=${todo.title} class="delete-btn">Delete</button></p>
                                     </div>`, )
             }
        })
    })
}


//Delete Todos
function deleteTodo(e){
      let response= confirm("Do you really want to delete this todo?");
      if(!response){
          return;
      }
      else{
          e.target.parentElement.parentElement.remove();

        todoArray.splice(todoArray.findIndex(item=> item.title.toLowerCase() === e.target.id.toLowerCase()), 1)
         console.log(todoArray)

          localStorage.setItem("todoArray", JSON.stringify(todoArray));
      }
}


//Delete Categories
let todoItems= document.querySelectorAll(".todo-item");
  todoItems.forEach(item=> {
      let filters= item.querySelectorAll("div");
      if(filters.length < 1){
          item.remove();

          todoCats.splice(todoCats.findIndex(cat=> cat === item.children[0].innerHTML), 1);
      }
  })



//Retrieve data from the local storage
  let savedCats= localStorage.getItem("todoCats");
let savedTodos= localStorage.getItem("todoArray")

if(savedCats !== null){
    todoCats= JSON.parse(savedCats);
    displayCats(todoCats)
}

if(savedTodos !== null){
    todoArray= JSON.parse(savedTodos);
   displayTodoItems(todoArray);
}