import {Component, Inject,HostListener} from '@angular/core';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApisService } from '../apis.service';



@Component({
  selector: 'app-content-modal',
  templateUrl: './content-modal.component.html',
  styleUrls: ['./content-modal.component.css']
})
export class ContentModalComponent {

  public isLikedBtn:boolean=false;
  public isSmallScreen: boolean;
  public selectedBlogData:any;
  public readMoreList:any;
  public exploreMoreList:any;
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private api:ApisService,public dialogRef: MatDialogRef<ContentModalComponent>) {
    this.isSmallScreen=window.innerWidth >550;
   
    this.selectedBlogData=data[0];
    this.readMoreList=data[1];
    this.exploreMoreList=data.length==3?data[2]:[];
  }

  public ngOnInit(){
    let isLiked:any=localStorage.getItem("isLiked_"+this.selectedBlogData.id);
   
     if(isLiked!=null && isLiked=="true"){
      this.isLikedBtn=true;
        return;
     }
  
  }

  public updateLikes(blog:any){
  
     let isLiked:any=localStorage.getItem("isLiked_"+blog.id);
   
     if(isLiked!=null && isLiked=="true"){
      this.isLikedBtn=true;
        return;
     }
      localStorage.setItem("isLiked_"+blog.id,"true");
      blog.likes=blog.likes+1;
    
      this.api.updateData(blog).subscribe((data)=>{
        this.data = data;
        this.isLikedBtn=true;
    });

  }

  public emptyCall(){
    return;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    // Update the screen size property
    this.isSmallScreen = window.innerWidth > 550;
   
  }

  public nextPost(id:number){
    let nextPost={id:id};
    this.dialogRef.close(nextPost);
  }

}
