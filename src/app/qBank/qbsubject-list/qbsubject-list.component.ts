import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/servies/crud.service';
import { SharedService } from 'src/app/servies/shared.service';

@Component({
  selector: 'app-qbsubject-list',
  templateUrl: './qbsubject-list.component.html',
  styleUrls: ['./qbsubject-list.component.css']
})
export class QBsubjectListComponent implements OnInit {
  subject_data :any
  constructor(
    private _crud: CrudService,
    private _shared: SharedService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._shared.course_id.subscribe(
      (res: any) => {
        console.log(res);
        this.get_subject(res)
      }
    )


  }

  get_subject(id: number) {
    this._crud.get_subject(id).subscribe(
      (res: any) => {
        console.log(res);
         this.subject_data =  res
      }
    )
  }


  OnUnit(id:number){
    this._shared.subject_id.next(id)
    this._router.navigate(['/QBunitList'])
  }

}
