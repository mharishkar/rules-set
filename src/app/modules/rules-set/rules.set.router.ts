import { AddRulesComponent } from './component/add-rules/add.rules.component';
import { RulesSetListComponent } from './component/rules-set-list/rules.set.list.component';
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: 'rules-list', 
        component: RulesSetListComponent,
    },
    {
        path : '',
        redirectTo : 'add-rules',
        pathMatch: 'full'
    },
    {
        path: 'add-rules', 
        component: AddRulesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RulesSetRoutingModule { }