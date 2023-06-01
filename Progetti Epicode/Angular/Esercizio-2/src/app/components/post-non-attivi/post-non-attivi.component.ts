import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import { Interface } from 'src/app/interface.interface';
@Component({
  selector: 'app-post-non-attivi',
  templateUrl: './post-non-attivi.component.html',
  styleUrls: ['./post-non-attivi.component.scss']
})
export class PostNonAttiviComponent implements OnInit {
  postList: Interface[] = [];
  constructor(private postSrv: PostService) {
    this.postSrv.getPosts().then(res =>{
      this.postList = res;
    })
   }
  ngOnInit(): void {
  }

}
