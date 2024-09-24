import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListCocktailsComponent } from './list-cocktails/list-cocktails.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule, ListCocktailsComponent ],
  templateUrl: 'app.component.html',
})
export class AppComponent {
}
