import { constants } from './../../../../app.constant';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,
         FormBuilder, FormArray, FormControl
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
    
    predicates   : any = [];
    actionsArray : any;
    
    addRulesForm   : FormGroup   
    predicateArray : FormArray;
    rulesArray     : FormArray;

    constructor(private formBuilder : FormBuilder) {
        this.buildForm();
    }

    ngOnInit() { }

    buildForm() {
        this.addRulesForm = this.formBuilder.group({
            rule_name   : ['', Validators.required],
            applicable  : ['', Validators.required],
            ruleArray   : this.formBuilder.array([]),
            actionArray : this.formBuilder.array([]),
        });
        this.addRules();
        this.addActions();
    }

    onChangeFieldName(fieldName, index) {
        const control = this.addRulesForm.controls['ruleArray']['controls'][index].controls['predicateArray'];
        if (fieldName.includes('Received')) {
            control.setValue(constants.datePredicates);
        } else {
            control.setValue(constants.stringPredicates);
        }
    }

    createRules(): FormGroup {
        return this.formBuilder.group({
            field_name     : ['', Validators.required],
            predicateArray : ['', Validators.required],
            description    : ['', Validators.required],
            predicate      : ['', Validators.required]
        });
    }
    
    addRules(): void {
        this.rulesArray = this.addRulesForm.get('ruleArray') as FormArray;
        this.rulesArray.push(this.createRules());
    }

    removeRules(index) {
        const control = <FormArray>this.addRulesForm.controls['ruleArray'];
        control.removeAt(index);
    }

    createActions(): FormGroup {
        return this.formBuilder.group({
            action     : ['', Validators.required]
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

    addLabel(value, index) {
        if (value.includes('Label')) {
            this.showLabel = true;
            console.log(index);
            const control = this.addRulesForm.controls['actionArray']['controls'] as FormGroup;
            this.addRulesForm.controls['actionArray']['controls'].addControl('label', new FormControl('', Validators.required));
            // control.push({label: ''});
        }
        else {
            this.showLabel = false;
            const control = this.addRulesForm.controls['actionArray']['controls'][index].controls['label'];
        }
    }
}
