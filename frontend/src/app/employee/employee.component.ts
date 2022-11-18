import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee.model';            //model  db 
import { EmployeeserService } from '../service/employeeser.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
empForm!: FormGroup;            
showmodel:boolean = false;
editmode:boolean = false
employee:any             //the getdata() will work in the starting of project that time the data will get here.   
empId:any



  constructor(private form:FormBuilder,private empService:EmployeeserService)  { }

  ngOnInit(): void {
    this.empForm = this.form.group({
      // _id:['001',[Validators.required]],
      id:[''],
      name:['',[Validators.required]],
      position:['',[Validators.required]],
      dept:['',[Validators.required]]
    })
    this.getEmployee()   //the get-function has the data
  
  }
  
  // GET THE EMPLOYEE
  
  getEmployee(){
    this.empService.getEmployeeList().subscribe((res:Employee[]) => {
     console.log("Rsesss",res)
      this.employee = res;            //all the data in res that will assign into a varibale employeee
    })
  }
  // MODEL SUBMIT BUTTON

  onEmpSubmit(){

    var id = this.empForm.value.id
    var name = this.empForm.value.name
    var position = this.empForm.value.position         
    var dept = this.empForm.value.dept
    
    
    if(this.empForm.valid){
      if(this.editmode){          //works it in the  edit button click  or work addEmp part
        this.empService.editemploye(this.empId,name,position,dept).subscribe(res => {    
          console.log(res,"resonse")
          this.getEmployee()          //
          this.onClosemodal()
        },
        err => {
          console.log("Error part",err)
        }
      )
    }

      else{
        this.empService.addEmployee(name,position,dept).subscribe(      //values with form transfer it into service
          res => {                                       //get the res from serve
          console.log("RESPONSE",res);
          
          this.getEmployee()
          this.onClosemodal()
       
        },err => {
          console.log("Error part",err)
        }
      )
      }
    }
    
  }

  

  //ADD EMP BUTTON

  OnAddEmployee(){
    this.showmodel = true
  }

  // MODEL
  onClosemodal(){
    this.showmodel = false
  }

  //DELETE EMP

  ondelete(id: any){
    if(confirm('Are you sure want to delete the employee')){
      this.empService.deleteemployee(id).subscribe(res => {
        console.log(res)
        this.getEmployee();
      })
    }

  }

//EDIT EMP
onEditEmployee(details:any){
    
    this.empId = details._id
    this.editmode=true;
    this.showmodel=true;
    this.empForm.patchValue(details)
    
  }

  


}
