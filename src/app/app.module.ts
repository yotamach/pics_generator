import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {MatAutocompleteModule , MatToolbarModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatInputModule, MatDividerModule, MatRadioModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PicComponent } from './pic/pic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PicComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDividerModule,
    MatRadioModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
