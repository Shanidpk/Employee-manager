import { Injectable } from '@angular/core';

import {HttpClient, HttpClientModule} from '@angular/common/http';

import {Employee} from '../employee.model'
 
@Injectable({
  providedIn: 'root'
})
export class EmployeeserService {
  url = "http://localhost:3000/employee";
  constructor(private http:HttpClient) { }


  addEmployee(name:any,position:any,dept:any){
    const data={
     
      name,
      position,
      dept
    }
    return this.http.post(this.url,data);          //return it into server
  }

  getEmployeeList(){
    return this.http.get<Employee[]>(this.url);      
  }

  deleteemployee(id:any){
    return this.http.delete(`${this.url}/${id}`)
  }

  editemploye(id:any,name:any,position:any,dept:any){     //model
    // console.log("EMP DEATILS",emp)
    const data = {
      id,name,position,dept
    }
    return this.http.put(`${this.url}/${id}`,data)
  }

}

