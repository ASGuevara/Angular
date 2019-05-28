import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesAllComponent }      from './Heroes/heroes-all/heroes-all.component';
import { HeroDetailComponent }  from './Heroes/hero-detail/hero-detail.component';

import { DashboardComponent }   from './dashboard/dashboard.component';

import {WeaponAllComponent} from "./Weapons/weapon-all/weapon-all.component";
import {WeaponDetailComponent} from "./Weapons/weapon-detail/weapon-detail.component";
import {HeroNewComponent} from "./Heroes/hero-new/hero-new.component";
import {WeaponNewComponent} from "./Weapons/weapon-new/weapon-new.component";

import {FightSelectComponent} from "./Fight/fight-select/fight-select.component";
import {FightGameComponent} from "./Fight/fight-game/fight-game.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesAllComponent },
  { path: 'fight/select', component: FightSelectComponent },
  { path: 'fight/:hero1/vs/:hero2', component: FightGameComponent },
  { path: 'weapon', component: WeaponAllComponent },
  { path: 'weapon/:id', component: WeaponDetailComponent },
  { path: 'new/hero', component: HeroNewComponent },
  { path: 'new/weapon', component: WeaponNewComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
