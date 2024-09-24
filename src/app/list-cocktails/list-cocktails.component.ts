import { Component, inject, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfiguratorService } from '../configurator.service';
import { Cocktail } from '../cocktail';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-list-cocktails',
  standalone: true,
  imports: [RouterModule, AsyncPipe, FormsModule],
  templateUrl: './list-cocktails.component.html',
  styleUrl: './list-cocktails.component.scss'
})
export class ListCocktailsComponent {

  protected service = inject(ConfiguratorService);

  protected filteredCocktails: Signal<Cocktail[]> | undefined;

  applyFilterCocktails(name: string): void{
    this.filteredCocktails = this.service.filterCocktails(name);
  }

  isFavorite(cocktail: Cocktail):boolean {
    const favouriteList = this.service.favoritelist();
    return favouriteList.some(fav => fav.id === cocktail.id);
  }




}
