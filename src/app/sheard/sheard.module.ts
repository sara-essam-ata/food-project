import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DeleteComponent } from './delete/delete.component';


@NgModule({
  declarations: [
    NavbarComponent,SidebarComponent, HomeComponent,DeleteComponent ],
  imports: [
    CommonModule,
    MatButtonModule, MatDividerModule, MatIconModule,HttpClientModule,ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({}), 
    MatDialogModule,
    MatPaginatorModule
    
  ],
  exports:[
    MatButtonModule, MatDividerModule, MatIconModule,HttpClientModule,ReactiveFormsModule,FormsModule
     ,MatDialogModule,NavbarComponent,SidebarComponent,HomeComponent,MatPaginatorModule, DeleteComponent]
})
export class SheardModule {}
