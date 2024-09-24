import { Split } from './../../../node_modules/type-fest/ts41/utilities.d';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfiguratorService } from '../configurator.service';
import { Cocktail } from '../cocktail';

@Component({
  selector: 'app-detail-cocktail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './detail-cocktail.component.html',
  styleUrl: './detail-cocktail.component.scss'
})
export class DetailCocktailComponent {
  @Input() cocktail: string;

  //I have the cocktail ID 
  //using it I can get the Cocktail object and manipulate the page

 
  
  protected service = inject(ConfiguratorService);

  isFavorite(cocktail: Cocktail):boolean {
    const favouriteList = this.service.favoritelist();
    return favouriteList.some(fav => fav.id === cocktail.id);
  }

  // getIngredientslist() {
  //   this.service.getCocktailbyId(this.cocktail)?.ingredients.split(',')
  // }

  

}
