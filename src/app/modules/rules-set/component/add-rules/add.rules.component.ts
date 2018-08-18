import { AppService } from './../../service/app.service';
import { constants } from './../../../../app.constant';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,
         FormBuilder, FormArray, FormControl
        }                                from '@angular/forms';
import { ActivatedRoute, Router } from '../../../../../../node_modules/@angular/router';

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

    ruleId: number;

    constructor(
        private formBuilder : FormBuilder,
        private appService: AppService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {}
    
    ngOnInit() { 
        this.activatedRoute.queryParams.subscribe(val => {
            if (val.id) {
                this.ruleId = val.id;
                this.getRuleById();
            }
        });
        this.buildForm();
    }

    getRuleById() {
        this.appService.getRuleById(this.ruleId)
            .subscribe(res => {
                this.patchRulesetForm(res[0]);
            });
    }

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

    patchRulesetForm(ruleset) {
        this.addRulesForm.patchValue(ruleset, {onlySelf: true});
        ruleset.actionArray.map((action, index) => {
            if (action.action.includes('Label')) {
                this.addLabel(action.action, index, action.label);
            }
        });
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

    addLabel(value, index, label?) {
        if (value.includes('Label')) {
            const control = <FormGroup>this.addRulesForm.controls['actionArray']['controls'];
            control[index].addControl('label', new FormControl(label ? label : '', Validators.required));
        }
        else {
            const control = <FormGroup>this.addRulesForm.controls['actionArray']['controls'];
            control[index].removeControl('label', new FormControl('', Validators.required));
        }
    }

    rulesSubmitHandler(ruleset) {
        this.ruleId
            ? this.updateRuleset(ruleset, this.ruleId)
            : this.createRuleset(ruleset);
    }

    createRuleset(ruleset) {
        this.appService.createRuleset(ruleset)
            .subscribe(res =>{
                this.router.navigateByUrl('/rules-list');
            });
    }

    updateRuleset(ruleset, id) {
        this.appService.updateRuleset(ruleset, id)
            .subscribe(res =>{
                this.router.navigateByUrl('/rules-list');
            });
    }
}
