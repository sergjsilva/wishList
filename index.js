let todoInput=document.querySelector(".input");
let addTodoButton=document.querySelector(".button");

let showTodos=document.querySelector(".todos-container");


//localStorage.clear();

let todo;
let inicialLocalList=JSON.parse(sessionStorage.getItem("wishList")); //parse a JSON string and convert it into a JavaScript object.
let todoList=inicialLocalList||[];// if no data, please iniciate as an empty array


/* Create a unique ID */
function createUniqueID()
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (param) {
        let number = Math.random() * 16 | 0;
        let randomNumber = param == 'x' ? number : (number & 0x3 | 0x8);
        return randomNumber.toString(16);
    }
    );
}


function createHTML(obj)
{
    return (`
    <div clas="todo relative">
        <input id="item-${obj.id}" type="checkbox" class="t-checkbox" data-key="${obj.id}" 
            ${obj.isCompleted?"checked":""}> <label for="item-${obj.id}" class="todo todo-text t-pointer ${obj.isCompleted?"checked-todo":""} " data-key=${obj.id}>${obj.todo}</lavel>
        <button class="button cursor t-pointer absolute right-0">
            <span data-todokey=${obj.id} class="del-btn material-icons-outlined">delete</span>
        </button>
    </div>`
    );
}


function renderTodoList(todoList)
{
    showTodos.innerHTML=todoList.map(createHTML);
}

showTodos.addEventListener("click", (event)=>{
    let key=event.target.dataset.key;
    let delTodoKey=event.target.dataset.todokey;

    todoList=todoList.map(obj=>obj.id===key?{...obj, isCompleted:!obj.isCompleted}:obj);
    todoList=todoList.filter((obj)=>obj.id!==delTodoKey);//return all obj that the ID is different from delTodoKey
    
    const objStrList = JSON.stringify(todoList);
    sessionStorage.setItem("wishList", objStrList);

   // console.log(todoList);
    renderTodoList(todoList);//update the list item

});

addTodoButton.addEventListener("click", (event)=>{
    event.preventDefault();//Do not reload the page
    todo=todoInput.value;
    todoInput.value="";// clearing input form field
    if (todo.length > 0)
    {
        todoList.push({id: createUniqueID(), todo:todo, isCompleted: false}); //Creating an array of objects
    }

    const objStrList = JSON.stringify(todoList);
    sessionStorage.setItem("wishList", objStrList);
    renderTodoList(todoList);

});

renderTodoList(todoList);