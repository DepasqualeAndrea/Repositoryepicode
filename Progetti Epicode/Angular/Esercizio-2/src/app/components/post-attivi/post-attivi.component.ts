import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import { Interface } from 'src/app/interface.interface';
@Component({
  selector: 'app-post-attivi',
  templateUrl: './post-attivi.component.html',
  styleUrls: ['./post-attivi.component.scss']
})
export class PostAttiviComponent implements OnInit {



  postList: Interface[] = [];
  constructor(private postSrv: PostService) {
    this.postSrv.getPosts().then(res =>{
      this.postList = res;
    })
   }

  ngOnInit(): void {
  }

}
