import { constants } from './../../../../app.constant';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,
         FormBuilder, AbstractControl
        }                                from '@angular/forms';

@Component({
    selector    : 'add-rules',
    templateUrl : 'add.rules.component.html',
    styleUrls   : ['add.rules.component.scss']
})

export class AddRulesComponent implements OnInit {
    readonly fieldNames   : Array<string> = constants.fieldNames;
    readonly actions      : Array<string> = constants.Actions;
             showLabel    : boolean       = false;
             addRulesForm : FormGroup   

    predicates : Array<string>

    constructor(
        private formBuilder : FormBuilder
    ) {
        this.buildForm();
     }

    ngOnInit() { }

    buildForm() {
        this.addRulesForm = this.formBuilder.group({
            rule_name  : ['', Validators.required],
            applicable : ['', Validators.required],
            
        })
    }

    changeDropDownValues(value) {
        value.includes('Received')
            ?  this.predicates = constants.datePredicates
            :  this.predicates = constants.stringPredicates;
    }

    addLabel(value) {
        value.includes('Label') 
            ? this.showLabel = true
            : this.showLabel = false;
    }
}