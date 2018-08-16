import { AddRulesComponent } from './component/add-rules/add.rules.component';
import { CommonModule } from '@angular/common';
import { MaterialModules } from './../material-modules/material.modules';
import { RulesSetListComponent }   from './component/rules-set-list/rules.set.list.component';
import { RulesSetRoutingModule }   from './rules.set.router';
import { NgModule }                from "@angular/core";
import { ReactiveFormsModule }     from '@angular/forms';
import { MatTableModule, 
         MatPaginatorModule,
         MatFormFieldModule,
         MatInputModule, 
         MatCardModule, }          from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RulesSetRoutingModule,
        MaterialModules
    ],
    declarations: [
        RulesSetListComponent,
        AddRulesComponent
    ],
    exports: [
        RulesSetRoutingModule
    ],
    providers: [
    ]
})
export class RulesSetModule { }