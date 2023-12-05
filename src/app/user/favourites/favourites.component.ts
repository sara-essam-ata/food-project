import { Component, OnInit } from '@angular/core';
import { FavouriteService } from './services/favourite.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})

export class FavouritesComponent implements OnInit {

  myFav: any;
  constructor(
    private _FavouriteService:FavouriteService,
    private _ToastrService:ToastrService,
    private Router:Router
  ) { }

  ngOnInit() {
      this.getAllFav();
    }

    getAllFav(){
      this._FavouriteService.onGetAllFav().subscribe({
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
