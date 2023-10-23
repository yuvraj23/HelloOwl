import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPortfolioComponent } from './my-portfolio/my-portfolio.component';

const routes: Routes = [
  { path: 'portfoli', component: MyPortfolioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

