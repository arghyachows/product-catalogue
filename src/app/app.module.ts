import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Components
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { HowToUseComponent } from './how-to-use/how-to-use.component';

//Service for ProductCatalogue

import { ProductCatalogueService } from "./services/product-catalogue.service";

//Modules used in this tutorial
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';



//In memory Web api to simulate an http server
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';


const appRoutes :Routes = [
  { path: '', component: ProductListComponent },
  { path: 'howtouse', component: HowToUseComponent }
  ];
 

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    AddProductComponent,
    ViewProductComponent,
    HowToUseComponent
  ],
  
   imports: [
    BrowserModule, 
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    RouterModule.forRoot(appRoutes),
   
  ],
  providers: [ProductCatalogueService],
  bootstrap: [AppComponent]
})
export class AppModule { }