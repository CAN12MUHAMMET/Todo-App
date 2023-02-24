let btnekle = document.getElementById("addnewtask");
let btntemizle = document.getElementById("btnclear");
let GörevListesi =[];
if(localStorage.getItem("GörevListesi") !== null){
    GörevListesi= JSON.parse(localStorage.getItem("GörevListesi"));
}
let inputtask = document.getElementById("txt");
display();

function display(){
    let ul = document.getElementById("task-list");
    if(GörevListesi.length==0){
       ul.innerHTML="<p class='p-3 m-0'>Görev Listesi Boş.</p>"
    }
    else{
    ul.innerHTML="";
    for(let görev of GörevListesi){
        let li = `<li class="task list-group-item">
        <div class="form-check">
        <input type="checkbox" onclick="checkuptades(${this})" id="${görev.id}" class="form-check-input" checked >
        <label for="${görev.id}" class="form-check-label" checked  >${görev.görevAdi}</label>
        </div>
        <div class="dropdown">
            <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-ellipsis"></i>
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" onclick="deletetask(${görev.id})"><i class="fa-solid fa-trash"></i> Sil</a></li>
                <li><a class="dropdown-item" href="#" onclick='edittask(${görev.id},"${görev.görevAdi}")' ><i class="fa-sharp fa-solid fa-pen"></i> Düzenle</a></li>   
            </ul>
        </div>
        </li>`
        ul.insertAdjacentHTML("beforeend",li);
    }
    }
}

let EditId;
let iseditask = false;

btnekle.addEventListener("click", function(event){
    let inputtaskValue = inputtask.value;
    
    if(inputtaskValue == ""){
        alert("Görev Giriniz..")
    } else {
        if(!iseditask){
            // ekleme 
            GörevListesi.push( {"id":GörevListesi.length + 1, "görevAdi" :inputtaskValue});
            inputtask.value = "";
        } else {
            // güncelleme
            for(let i = 0; i < GörevListesi.length; i++){
                if(GörevListesi[i].id == EditId){
                    GörevListesi[i].görevAdi = inputtaskValue;
                    break;
                }
            }
            inputtask.value = "";
            iseditask = false;
        }
        display();
        localStorage.setItem("GörevListesi",JSON.stringify(GörevListesi));
    }
    event.preventDefault();
});
function deletetask(id){
    for(let i = 0; i < GörevListesi.length; i++){
        if(GörevListesi[i].id == id){
            GörevListesi.splice(i, 1);
            break;
        }
    }
    display();
    localStorage.setItem("GörevListesi",JSON.stringify(GörevListesi));
};

function edittask(taskId, taskName){
    EditId = taskId;
    iseditask = true;
    inputtask.value = taskName;
    inputtask.focus();
    inputtask.classList.add("active");
}
btntemizle.addEventListener("click", function(){
    GörevListesi.splice(0,GörevListesi.length);
    display();
    localStorage.setItem("GörevListesi",JSON.stringify(GörevListesi));
 });