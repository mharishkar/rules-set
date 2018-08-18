import { constants } from './../../../app.constant';
import { HttpClient }      from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../../../node_modules/rxjs';

@Injectable()
export class AppService {

    constructor(
        private http : HttpClient
    ) { }

    /**
     * ReadAll Service
     */
    getRuleList(): Observable<any> {
        return this.http.get(`${constants.baseUrl}`);
    }

    /**
     * Readone service 
     * @param ruleId {number}
     */
    getRuleById(ruleId: number): Observable<any> {
        return this.http.get(`${constants.baseUrl}?id=${ruleId}`);
    }

    /**
     * Create service
     * @param ruleset {Object}
     */
    createRuleset(ruleset: {}): Observable<any> {
        return this.http.post(`${constants.baseUrl}`, ruleset);
    }

    /**
     * Delete service
     * @param ruleId {number}
     */
    deleteRuleById(ruleId: number): Observable<any> {
        return this.http.delete(`${constants.baseUrl}/${ruleId}`);
    }
}
