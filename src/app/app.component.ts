import { Component,OnDestroy,Renderer2 } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApisService } from './apis.service';
import {MatDialog} from '@angular/material/dialog';
import { ContentModalComponent } from './content-modal/content-modal.component';
import { SubscribeModalComponent } from './subscribe-modal/subscribe-modal.component';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Hello Owl';
    public data:any;
    private $onDestroySubject: Subject<void> = new Subject();
    public diu="https://drive.google.com/file/d/1Ef4KL1FRaKbwvTS_Ca9CTG4QlOpIw_OA/view?usp=drivesdk";

    public listOfData:any;
    public selectedBlog:any;
    public isSubscribeClick:boolean=false;
    public subscribeMailId:string;
    public contentType:any;
    public isProcess:boolean;
    public isShowing: boolean;
    public isOpen:boolean;
    public isLandingPage:boolean;
    public trendingList:any;
    public mostViewList:any;
    public isSmallScreen: boolean;
    public readMore:any;
    public exploreMore:any;
    public initCap=12;
    public isDisableLoadBtn=false;
    public readMoreIds:any;
    
    public constructor(private api:ApisService,public dialog: MatDialog){
      this.data="No data";
      this.listOfData=[];
      this.subscribeMailId="";
      this.contentType="All";
      this.isProcess=true;
      this.isShowing=false;
      this.isOpen=false;
      this.isLandingPage=true;
      this.isSmallScreen=window.innerWidth >1000;
      this.readMoreIds=[];
    }

    public getBlog(tagStr:string){

      this.listOfData=[];
      
      this.isProcess=true;
      this.isLandingPage=true;
      let tag={tags:tagStr}
      this.api.getTaggedPost(tag).subscribe((data)=>{
        this.data = data;
        this.listOfData=[];
        setTimeout(() => {
          this.arrageListData(this.data);
          this.isProcess=false;
         
        }, 500);
    });

    }


    ngOnInit() {
   

      this.isLandingPage=true;
      this.isProcess=true;
      let tag={tags:"landing"}

      this.api.getTaggedPost(tag).subscribe((data)=>{

        this.data = data;
        let numOfEleInRow=3;
  
        let list:any=[];
        let len=this.data.length<=this.initCap? this.data.length: this.initCap;
      
        let i=0;
        for(;i<len;i++){
        if(i%numOfEleInRow==0){
          if(list.length>0){
            this.listOfData.push(list);
          }
          list=[]
        }
        list.push(this.data[i]);
        }

        if(list.length>0 && i!=len){
          this.listOfData.push(list);
        }

        if(this.listOfData.length==0){
          this.listOfData.push(list);
        }

        this.isProcess=false;
        this.isLandingPage=true;
        this.getTreandingPosts("trending");
        this.getTreandingPosts("most-view");



  });
  }

  public arrageListData(data:any){
   
    let list:any=[];
    let numOfEleInRow=3;
    let len=this.data.length<this.initCap ? this.data.length: this.initCap;
    for(let i=0;i<len;i++){
    if(i%numOfEleInRow==0){
      if(list.length>0){
        this.listOfData.push(list);
      }
      list=[]
    }
    list.push(this.data[i]);
    }
    if(list.length>0){
      this.listOfData.push(list);
    }
  }


  public getTreandingPosts(trendingTags:string){

    let tag={tags:trendingTags} 
    this.api.getTaggedPost(tag).subscribe((data:any)=>{
        

      let list:any=[];
      let trendsList:any=[];
  
      for(let i=0;i<Object.keys(data).length;i++){
          
        if(i%2==0){
          if(list.length>0){
            trendsList.push(list);
          }
          list=[]
        }
        if(i==4){
          break;
        }
        list.push(data[i]);
     
      }
      if(list.length>0){
        trendsList.push(list);
      }
      if(trendingTags=="trending"){
        this.trendingList=trendsList;
      }else if(trendingTags=="most-view"){
        this.mostViewList=trendsList;
      }

});

  }

  public setExploreMore(dataList:any,current:any):any{
  
    let list:any=[];
    for(let i=0;i<dataList.length;i++){


      if(this.readMoreIds.includes(dataList[i].id)){
        continue;
      }
   
      if(dataList[i].id!=current.id){
        list.push(dataList[i]);
      }
      if(list.length==3){
          break;
      }
    }
    return list;
  }


  public setReadMore(dataList:any,current:any):any{
  
    let list:any=[];
  

    let ll=current.tag_list;
    ll=ll.split(",");
    let currentBlogTags=this.getTags(ll);

    for(let i=0;i<dataList.length;i++){
      
      let blogTags:any=this.getTags(dataList[i].tag_list.split(","));

      if(dataList[i].id!=current.id ){

        for(let t=0;t<currentBlogTags.length;t++){
          if(blogTags.includes(currentBlogTags[t])){
            list.push(dataList[i]);
            this.readMoreIds.push(dataList[i].id)
            break;
          }
        }

        
      }
      if(list.length==3){
          break;
      }
    }
    return list;
  }
  

public getTags(ll:any):[]{

  let blogTags:any=[];
    for(let i=0;i<ll.length;i++){
      let tagName=ll[i];
      tagName= tagName.replaceAll("'","");
      tagName=tagName.replaceAll("]","");
      tagName=tagName.replaceAll("[","");
      blogTags.push(tagName.trim());
    }
    return blogTags;
}

  openDialog(selectedBlog:any) {
   
    this.readMore=this.setReadMore(this.data,selectedBlog);
    this.exploreMore=this.setExploreMore(this.data,selectedBlog);

    let dataList=[selectedBlog,this.readMore,this.exploreMore];
  
    const dialogRef=this.dialog.open(ContentModalComponent, {
      data:dataList,
      maxWidth: '95vw',
      maxHeight: '98%',
      height: '100%',
      width: '95%'
    }
    );
    dialogRef.afterClosed().subscribe(result => {
    
      if(result?.id){
        for(let i=0;i<this.data.length;i++){
          if(this.data[i].id==result.id){
            this.openDialog(this.data[i]);
            break;
          }
        }
      }
      this.subscribeMailId = result;
    });
  
  }

  public subscribe(){
    this.isSubscribeClick=true;
  }


  openSubscribeDialog(): void {
    const dialogRef = this.dialog.open(SubscribeModalComponent, {
      data: {name: "yuvraj"},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.subscribeMailId = result;
    });
  }

  public toggleSidenav() {
    this.isShowing = !this.isShowing;
  }

  public hideSideBtn(){
      this.isOpen=this.isOpen?false:true;
    
  }

  public setLandingPage(){
    this.isLandingPage=false;
    this.listOfData=[];
  }

  public calculateReadTime(content:any):number {
    const wordsPerMinute = 200;
    const text = content.trim().replace(/<\/?[^>]+>/gi, ''); // remove HTML tags
    const wordCount = text.split(/\s+/).length;
    const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
    return readTimeMinutes;
  }

  public loadingBlog(){

    let len=this.data.length;
    let nextPage=this.initCap+12;

    if(len-nextPage<0){
      this.isDisableLoadBtn=true;
      this.initCap=len;
    }else{
      this.initCap=nextPage;
    }
    this.listOfData=[];
    this.arrageListData(this.data);
  }



}
