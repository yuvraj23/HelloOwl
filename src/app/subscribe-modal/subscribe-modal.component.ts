import { Component,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ApisService } from '../apis.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-subscribe-modal',
  templateUrl: './subscribe-modal.component.html',
  styleUrls: ['./subscribe-modal.component.css']
})
export class SubscribeModalComponent {
  public subscibeStage=0;
  public userName:any;
  public emailId:any;
  public subScriberData:any;
  public isSubscribe:string;
  public subscribeMsg:any;
  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private api:ApisService
  ) {
    this.isSubscribe="";
    
  }

  ngOnInit(){
  
    this.subscibeStage=0;
    let isSubscribe:any=localStorage.getItem("isSubscribe");
    if(isSubscribe!=null && isSubscribe=="true"){
      this.subscibeStage=2;
      this.subscribeMsg="You are already memeber of our community";
       return;
    }
    
  }

  onNoClick(): void {
  
    this.subscibeStage=1;
    let subscribeInfo={name:this.userName,email:this.emailId}

    this.api.addSubscriber(subscribeInfo).subscribe((data)=>{
      this.subScriberData = data;

      setTimeout(() => {
        this.subscibeStage=2;
        localStorage.setItem("isSubscribe","true");
        this.subscribeMsg="You have subscribe successfully"

      }, 2000);
      
   });
  }

 
}
