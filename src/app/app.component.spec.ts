import { TestBed, inject, async, fakeAsync, tick} from '@angular/core/testing';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { By } from '@angular/platform-browser';
import { AppTestingModule } from './app-testing-module';
import { ProductListComponent } from './product-list/product-list.component';
import { HowToUseComponent } from './how-to-use/how-to-use.component';
import { APP_BASE_HREF } from '@angular/common';


import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule],
      
    }).compileComponents();
  }));


  it(`should have as title 'Product Catalogue'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Product Catalogue1');
  }));


  it('should go to url',
    fakeAsync((inject([Router, Location], (router: Router, location: Location) => {
      let anchorLinks,a1,a2,a3;
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

     anchorLinks= fixture.debugElement.queryAll(By.css('a'));
     a1 = anchorLinks[0];
     a2 = anchorLinks[1];
     a3 = anchorLinks[2];
     
    console.log(location.path());
     a1.triggerEventHandler("click", {button: 0});
     tick();
     console.log("Hello", location.path());
     expect(location.path()).toEqual("");

     a2.nativeElement.click();
     tick()
     expect(location.path()).toEqual("/howtouse");
          
    
  }))));
});


