import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesAllComponent } from './Heroes/heroes-all/heroes-all.component';
import { FightSelectComponent } from './Fight/fight-select/fight-select.component';
import { HeroDetailComponent } from './Heroes/hero-detail/hero-detail.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { WeaponAllComponent } from './Weapons/weapon-all/weapon-all.component';
import { WeaponDetailComponent } from './Weapons/weapon-detail/weapon-detail.component';

import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireStorageModule} from "@angular/fire/storage";
import { HeroNewComponent } from './Heroes/hero-new/hero-new.component';
import { WeaponNewComponent } from './Weapons/weapon-new/weapon-new.component';
import { FightGameComponent } from './Fight/fight-game/fight-game.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesAllComponent,
    HeroDetailComponent,
    DashboardComponent,
    WeaponAllComponent,
    WeaponDetailComponent,
    AppComponent,
    HeroNewComponent,
    WeaponNewComponent,
    FightSelectComponent,
    FightGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
