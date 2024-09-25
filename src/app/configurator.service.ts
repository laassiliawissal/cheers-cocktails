import { computed, effect, inject, Injectable, Signal, signal } from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import { Cocktail } from './cocktail';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {
  
  private http = inject(HttpClient)

  readonly allCocktails : Signal<Cocktail[]> = toSignal(this.http.get<Cocktail[]>('cocktails'), { initialValue: [] });
  
  favoritelist = signal<Cocktail[]>(JSON.parse(localStorage.getItem('favorites') || '[]'));
  

  constructor() {
    console.log('Initial favorites from local storage:', this.favoritelist());
  }

  itsFavorite(cocktail: Cocktail) {
  console.log(this.favoritelist())
    {if (this.favoritelist().includes(cocktail)) {
      const favoriteRemoved = this.favoritelist().filter(c => c.id !== cocktail.id);
      this.favoritelist.set(favoriteRemoved);
      localStorage.setItem('favorites', JSON.stringify(favoriteRemoved))
    } else {
      const favoriteAdded = [...this.favoritelist(), cocktail];
      this.favoritelist.set(favoriteAdded);
      localStorage.setItem('favorites', JSON.stringify(favoriteAdded))
    }
    }
  }
  
  filterCocktails(cocktailName: string): Signal<Cocktail[]> {
    return computed(() => {
      return this.allCocktails().filter(c => c.name.includes(cocktailName));
    })
  }
  getCocktailbyId(id : string): Cocktail {
    // return this.allCocktails().find(cocktail => cocktail.id === id)
    const foundCocktail = this.allCocktails()?.find(cocktail => cocktail.id === id);
    if (!foundCocktail || null || undefined) {
      throw new Error(`Cocktail with id ${id} not found`);
    }
    return foundCocktail;
  }
}


