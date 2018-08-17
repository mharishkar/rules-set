import { constants } from './../../../../app.constant';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,
         FormBuilder, FormArray
        }                                from '@angular/forms';

@Component({
    selector    : 'add-rules',
    templateUrl : 'add.rules.component.html',
    styleUrls   : ['add.rules.component.scss']
})

export class AddRulesComponent implements OnInit {
    readonly fieldNames   : Array<string> = constants.fieldNames;
    readonly actions      : Array<string> = constants.Actions;
    
    showLabel: boolean = false;
    
    predicates  : any = [];
    actionsArray: any;
    
    addRulesForm  : FormGroup   
    predicateArray: FormArray;
    rulesArray    : FormArray;

    constructor(
        private formBuilder : FormBuilder
    ) {
        this.buildForm();
        this.changeDropDownValues('from',0);
    }

    ngOnInit() { }

    buildForm() {
        this.addRulesForm = this.formBuilder.group({
            rule_name   : ['', Validators.required],
            applicable  : ['', Validators.required],
            ruleArray  : this.formBuilder.array([]),
            actionArray : this.formBuilder.array([]),
        });

        this.addRules();
        this.addActions();
    }

    createRules(): FormGroup {
        return this.formBuilder.group({
            field_name  : ['', Validators.required],
            predicate   : ['', Validators.required],
            description : ['', Validators.required]
        });
    }
    
    addRules(): void {
        this.rulesArray = this.addRulesForm.get('ruleArray') as FormArray;
        this.rulesArray.push(this.createRules());
    }

    removeRules(index) {
        const control = <FormArray>this.addRulesForm.controls['ruleArray'];
        control.removeAt(index);
        this.predicates.splice(index,1);
    }

    createActions(): FormGroup {
        return this.formBuilder.group({
            action     : ['', Validators.required],
            label_name : []
        });
    }
    
    addActions(): void {
        this.actionsArray = this.addRulesForm.get('actionArray') as FormArray;
        this.actionsArray.push(this.createActions());
    }

    removeActions(index) {
        const control = <FormArray>this.addRulesForm.controls['actionArray'];
        control.removeAt(index);
    }

    changeDropDownValues(value,index) {
        value.includes('Received')
            ?  this.getPredicates(constants.datePredicates)
            :  this.getPredicates(constants.stringPredicates);
    }

    getPredicates(value) {
        console.log(value);
        return value || [];
    }

    addLabel(value) {
        value.includes('Label') 
            ? this.showLabel = true
            : this.showLabel = false;
    }
}