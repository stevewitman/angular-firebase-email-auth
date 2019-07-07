import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const config = {
  apiKey: 'AIzaSyBgA-4I3IngZKPT1Ms--bKfIJPxYLo7rn4',
  authDomain: 'linkrdotme.firebaseapp.com',
  databaseURL: 'https://linkrdotme.firebaseio.com',
  projectId: 'linkrdotme',
  storageBucket: 'linkrdotme.appspot.com',
  messagingSenderId: '835617391666',
  appId: '1:835617391666:web:56b9bcab157216db'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
