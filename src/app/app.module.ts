import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from '@services/auth.service';
import { EngineService } from '@services/engine.service';
import { KeyboardService } from '@services/keyboard.service';
import { MouseService } from '@services/mouse.service';

import { AppComponent } from './app.component';
import { BackgroundMapComponent } from './components/background-map/background-map.component';
import { SpriteComponent } from './components/sprite/sprite.component';
import { WorldPlayerComponent } from './components/world-player/world-player.component';

import { LoginComponent } from './containers/login/login.component';
import { OverworldComponent } from './containers/overworld/overworld.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCUUPb3217oBcjyJFp-jqW9aMfceNrSzYo",
  authDomain: "proto-game-ac909.firebaseapp.com",
  databaseURL: "https://proto-game-ac909.firebaseio.com",
  storageBucket: "proto-game-ac909.appspot.com",
  messagingSenderId: "443666997132"
};

@NgModule({
  declarations: [
    AppComponent,
    BackgroundMapComponent,
    LoginComponent,
    OverworldComponent,
    SpriteComponent,
    WorldPlayerComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [
    AuthService,
    EngineService,
    KeyboardService,
    MouseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
