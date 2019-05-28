import { Component, OnInit } from '@angular/core';
import { Hero } from '../../data/hero';
import { HeroService } from '../../Service/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes-all.component.html',
  styleUrls: ['./heroes-all.component.css']
})
export class HeroesAllComponent implements OnInit {

  heroes: Hero[];
  heroesFiltred:Hero[];
  value:String;

  constructor(private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroesFiltred = heroes);

    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);

  }

  ngOnInit() {
    this.getHeroes();
    this.value = "";
  }

  searchByName(): void{
    //d'abbord, on réinisialise la liste des heros avec les valeurs de la bdd
    this.heroesFiltred = this.heroes;
    //puis on filtre la liste affichée par la value entrée si elle a au moins un caractere
    if (this.value.length > 0) {
      this.heroesFiltred = this.heroesFiltred.filter(el =>  el.name.toUpperCase().indexOf(this.value.toUpperCase()) > -1);
    }
  }

  sortBy(attribut): void{
    // on trie la liste par l'attribut voulu
    this.heroesFiltred = this.heroesFiltred.sort(function (a, b) {return b.getAttr(attribut) - a.getAttr(attribut) ;});
  }

  delete(idHero): void {
    // on trie la liste par l'attribut voulu
    this.heroService.deleteHero(idHero);
  }
}
