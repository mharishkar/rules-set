import { Routes , RouterModule} from '@angular/router';
import { NgModule }             from "@angular/core";


const ROUTES: Routes = [
    { 
        path: '',      
        loadChildren: './modules/rules-set/rules.set.module#RulesSetModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
