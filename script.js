var arr=[];
var id1=1;
var studentId=null;
function Student(name,email,gpa,age,degree){
    this.id=id1++;
    this.name=name;
    this.email=email;
    this.gpa=gpa;
    this.age=age;
    this.degree=degree;
}
const form=document.getElementById("form");
const tableEl=document.querySelector("table");
const searchEl=document.getElementById("searchInput");
function mySubmission(e,id3){
    e.preventDefault();
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const gpa=document.getElementById("gpa").value;
    const age=document.getElementById("age").value;
    const degree=document.getElementById("degree").value;

    if(studentId!=null){
        for(i of arr){
                if(i.id==studentId){
                    i.name=name;
                    i.email=email;
                    i.gpa=gpa;
                    i.age=age;
                    i.degree=degree;
                    break;
                }
        }
        console.log("after edit",arr);
        updateTable();
        document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("gpa").value="";
    document.getElementById("age").value="";
    document.getElementById("degree").value="";
    document.getElementById("submit").innerHTML="Add Student"
    studentId=null;
    return;
    }    
 
    const student=new Student(name,email,gpa,age,degree);
    arr.push(student);
    
    
    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("gpa").value="";
    document.getElementById("age").value="";
    document.getElementById("degree").value="";
    updateTable();
    console.log("data added",arr)
  
}

function updateTable(){
    const tbodye=document.querySelector('tbody');
    tbodye.innerHTML="";
    for(student of arr){
    tbodye.innerHTML+=`
    <td>${student.id}</td>
    <td>${student.name}</td>
    <td>${student.email}</td>
    <td>${student.age}</td>
    <td>${student.gpa}</td>
    <td>${student.degree} <span><i class="fa-solid fa-pen-to-square edit" id="edit"></i>
    <i class="fa-solid fa-trash-can delete" id="delete"></i><span>
    </td> ` 
    }

}

function onEditRow(e){
var id2=e.target.closest("tr").cells.item(0).innerHTML;
document.getElementById("submit").innerHTML="Edit Student";
const name=e.target.closest("tr").cells.item(1).innerHTML;
    const email=e.target.closest("tr").cells.item(2).innerHTML;
    const gpa=e.target.closest("tr").cells.item(3).innerHTML;
    const age=e.target.closest("tr").cells.item(4).innerHTML;
    var degree=e.target.closest("tr").cells.item(5).innerHTML;
    degree=degree.split("<").shift()
    degree=degree.substring(0,degree.length-1)
    document.getElementById("name").value=name;
    document.getElementById("email").value=email;
    document.getElementById("gpa").value=gpa;
    document.getElementById("age").value=age;
    document.getElementById("degree").value=degree;
   
    studentId=e.target.closest("tr").cells.item(0).innerHTML;
    rowNum=e.target.closest("tr").rowIndex;
    console.log(studentId,rowNum)

    console.log("before edit",arr)
    
}


function onDeleteRowOrEditRow(e){
   
    if(e.target.classList.contains("delete")){
        const btn=e.target;
        var id2=e.target.closest("tr").cells.item(0).innerHTML;
        btn.closest("tr").remove();
        arr=arr.filter((i)=>{return i.id!=id2})
        console.log("data deleted",arr)
    }
    if(e.target.classList.contains("edit")){
        onEditRow(e);
    }
}

function onSearch(e){
    var input=e.target.value;
    console.log(input);
    if(input==""){
        updateTable();
        return;
    }
    else{
        var newArr=arr.filter((i)=>{return (i.name.startsWith(input))||(i.email.startsWith(input))||(i.degree.startsWith(input))});
        searchInputTable(newArr)
    }
}

function searchInputTable(newArr){
    const tbodye=document.querySelector('tbody');
    tbodye.innerHTML="";
    for(student of newArr){
    tbodye.innerHTML+=`
    <td>${student.id}</td>
    <td>${student.name}</td>
    <td>${student.email}</td>
    <td>${student.age}</td>
    <td>${student.gpa}</td>
    <td>${student.degree} <span><i class="fa-solid fa-pen-to-square edit" id="edit"></i>
    <i class="fa-solid fa-trash-can delete" id="delete"></i><span>
    </td> ` 
    }
}

form.addEventListener('submit',mySubmission);
tableEl.addEventListener("click",onDeleteRowOrEditRow);
searchEl.addEventListener("input",onSearch);

