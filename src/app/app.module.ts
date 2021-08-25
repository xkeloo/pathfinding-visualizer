import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VisualizerModule } from './visualizer/visualizer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    VisualizerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
