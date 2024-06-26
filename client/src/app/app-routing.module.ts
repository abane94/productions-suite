import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'recipes',
  //   loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
  // },
  {
    path: 'materials',
    loadChildren: () => import('./materials/materials.module').then(m => m.MaterialsModule)
  },
  {
    path: 'processes',
    loadChildren: () => import('./processes/process.module').then(m => m.ProcessModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/product.module').then(m => m.ProductModule)
  },
  // {
  //   path: 'customers',
  //   loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  // },
  // {
  //   path: 'quotes',
  //   loadChildren: () => import('./quotes/quotes.module').then(m => m.QuotesModule)
  // },
  { path: '', redirectTo: 'materials', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
