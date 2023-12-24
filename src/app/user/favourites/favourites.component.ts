import { Component, OnInit } from '@angular/core';
import { FavouriteService } from './services/favourite.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})

export class FavouritesComponent implements OnInit {

  myFav: any;
  pageSize:Number=100;
  pageNumber:number=1;
  constructor(
    private _FavouriteService:FavouriteService,
    private _ToastrService:ToastrService,
    private Router:Router
  ) { }

  ngOnInit() {
      this.getAllFav();
    }

    getAllFav(){
      let parms = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
  
      }
      this._FavouriteService.onGetAllFav(parms).subscribe({
        next:(res: any)=>{
          console.log(res);
          this.myFav = res.data;
        },
        error:(err)=>{},
        complete:()=>{
        }
      })
    }

    removeFav(id:number){
      this._FavouriteService.onRemoveFav(id).subscribe({
        next:(res)=>{
          console.log(res);
        },
        error:(err)=>{
          this._ToastrService.error('error','error')
        },
        complete:()=>{
          this._ToastrService.success('recipe removed from favaourites','success');
          this.Router.navigate(['/dashboard/user/favourites'])
          this.getAllFav();
        }
      })
    }
   

}
