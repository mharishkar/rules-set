import { CommonModule } from '@angular/common';
import { NgModule }                from "@angular/core";
import { MatTableModule, 
         MatPaginatorModule,
         MatFormFieldModule,
         MatInputModule, 
         MatCardModule, MatButtonModule }          from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
    imports: [
        CommonModule,
        MatCardModule,        
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
    ],
    declarations: [
    ],
    exports: [
        MatCardModule,        
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
    ],
    providers: [
    ]
})
export class MaterialModules { }