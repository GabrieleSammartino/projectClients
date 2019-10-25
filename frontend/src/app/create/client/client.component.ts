import { Component } from '@angular/core';
import {ApiService} from '../../../api.service.ts';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
    moduleId: module.id,
    templateUrl: 'client.component.html'
})

export class ClientComponent {
    public company: any;
    public name: any;
    public typoAct: any;
    public url: any;
    public categoryId: any;
    public relationId: any;
    public exchangeId: any;
    public stateId: any;
    public tagId: any;
    public typoOpp: any;
    public descOpp: any;
    public note: any;
    public arrayDocs: any;

    constructor(private http: HttpClient,
                private router: Router,
                public service: ApiService,
    ) {}

    public createClient(){

    }








}

