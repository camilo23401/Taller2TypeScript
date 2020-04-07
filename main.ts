import { Course } from './course.js';
import { Student } from './student.js';

import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const inputSearchBox2: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-2");


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByRange();

renderStudentInTable(dataStudent);
renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
function renderStudentInTable(students: Student[]): void {

  console.log('Desplegando info del estudiante');
  students.forEach((student) => {
      let trElement = document.createElement("tr");
      trElement.innerHTML = `<td>${"Codigo"}</td>
                              <td>${student.codigo}</td>`;
      let trElement2 = document.createElement("tr");
      trElement2.innerHTML = `<td>${"Cedula"}</td>
                              <td>${student.cedula}</td>`;
      let trElement3 = document.createElement("tr");
      trElement3.innerHTML = `<td>${"Edad"}</td>
                              <td>${student.edad}</td>`;
      let trElement4 = document.createElement("tr");
      trElement4.innerHTML = `<td>${"Direccion"}</td>
                              <td>${student.direccion}</td>`;
      let trElement5 = document.createElement("tr");
      trElement5.innerHTML = `<td>${"Telefono"}</td>
                              <td>${student.telefono}</td>`;
       let trElement6 = document.createElement("tr");
      trElement6.innerHTML = `<td>${"E-mail"}</td>
                              <td>${student.email}</td>`;
      studentTbody.appendChild(trElement);
      studentTbody.appendChild(trElement2);
      studentTbody.appendChild(trElement3);
      studentTbody.appendChild(trElement4);
      studentTbody.appendChild(trElement5);
      studentTbody.appendChild(trElement6);
  });
}
 

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}

function applyFilterByRange(){
  let todo = inputSearchBox2.value;
  let split = todo.split(",");
  let min = Number(split[0]);
  let max = Number(split[1]);
  if(min==null||max==null)
  {
    min = 2;
    max = 1;
  }
  clearCoursesInTable();
  let coursesFiltered: Course[] =searchCourseByRange(min, max, dataCourses);
  renderCoursesInTable(coursesFiltered);
}
function searchCourseByRange(min: number, max:number, courses: Course[]){
   if (min>max)
  {
    return dataCourses;
  }
  else
  {
    return courses.filter( x => (x.credits>= min && x.credits <=max));
  }      
}