import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { HeroService } from '../hero.service';
import { Hero } from '../interface/hero';

@Component({
   selector: 'app-hero-search',
   templateUrl: './hero-search.component.html',
   styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
   heroes$!: Observable<Hero[]>;
   private searchTerms = new Subject<string>();

   constructor(private heroeService: HeroService) {}

   ngOnInit(): void {
      this.heroes$ = this.searchTerms.pipe(
         // wait 300ms after each keystroke before considering the term
         debounceTime(300),
         // ignore new term if same as previous term
         distinctUntilChanged(),
         // switch to new search observable each time the term changes
         switchMap((term: string) => this.heroeService.searchHeroes(term))
      )
   }

   // push a search term into the observable stream.
   search(term: string): void{
      console.log('term: ', term)
      this.searchTerms.next(term);
   }


}
