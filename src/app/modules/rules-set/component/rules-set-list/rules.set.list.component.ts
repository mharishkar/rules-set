import { AppService } from './../../service/app.service';
import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatCardModule } from '@angular/material';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
    selector    : 'rules-list',
    templateUrl : 'rules.set.list.component.html',
    styleUrls   : ['rules.set.list.component.scss']
})

export class RulesSetListComponent implements OnInit {

    ruleList: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['Id', 'Name', 'Applicable', 'Action'];
    dataSource;
    
    constructor(
        private appService: AppService,
        private router: Router,
        private changeDetectorRefs: ChangeDetectorRef
    ) {
        this.getAllRules();
    }

    getAllRules() {
        this.appService.getRuleList()
            .subscribe(res => {
                this.ruleList = res;
                this.dataSource = new MatTableDataSource<any>(this.ruleList);
                this.dataSource.paginator = this.paginator;
            });
    }

    ngOnInit() {}

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    redirectToViewRuleset(ruleset) {
        this.router.navigate(['/add-rules'], {queryParams: {id: ruleset.id}});
    }

    deleteRule(id): void {
        this.appService.deleteRuleById(id)
            .subscribe(res => {
                this.getAllRules();
                this.changeDetectorRefs.detectChanges();
            });
    }
}

