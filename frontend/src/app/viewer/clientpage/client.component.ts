import {Component, OnInit, ViewChild} from '@angular/core';

import {ApiService} from '../../../api.service.ts';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {
    MatPaginator, MatSort, MatTableDataSource,
     MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map, startWith, switchMap, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {MatTableFilter} from 'mat-table-filter';
export class Opportunity {
    name: string;
    company: string;
    desc: string;
    active: Boolean;

}
declare var $: any;
export class Client {
    company: string;
    name: string;
    exchangeId: string;
    relationId: string;
    stateId: string;
    categoryId: string;
    url: string;
    typoAct: string;
    note: string;
    tagId: string;




}
@Component({
    moduleId: module.id,
    selector: 'user-cmp',
    templateUrl: 'client.component.html'
})

export class ClientComponent implements OnInit {
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    filterEntity: Opportunity;
    filterType: MatTableFilter;
    dataSourceOpp;
    displayedColumns: string[] = ['name', 'desc', 'active'];
    public opportunities = [];
    public client: any;
    public clientId = '';
    public states = [];
    public exchanges = [];
    public relations = [];
    public categories = [];

    public tagSId: null;
    public typoOpp: null;
    public descOpp: null;
    public email: null;


    public cateName = '';
    public stateName = '';
    public exchangeName = '';
    public relationName = '';

    public categoryId;
   public stateId;
   public relationId;
   public exchangeId;

    items = ['Pizza', 'Pasta', 'Parmesan'];

    tagItems = ['Amsterdam', 'Washington', 'Sydney', 'Beijing'];


    public catName = null;
    public relName = null;
    public statName = null;
    public excName = null;
    public tagName = null;

    public reloadCat = false;

    public tags = [];
    public tagsnames = [];

    constructor(private http: HttpClient,
                private router: Router,
                public service: ApiService,
                public dialog: MatDialog
    ) {

    }

    ngOnInit() {
        this.filterEntity = new Opportunity();
        this.filterType = MatTableFilter.ANYWHERE;
        this.service.getOppClient(localStorage.getItem('idClient')).then(data => {
            this.opportunities = data;

            this.dataSourceOpp = new MatTableDataSource( this.opportunities);
            console.log('opportunities',  this.dataSourceOpp);

            this.dataSourceOpp.paginator = this.paginator;
            this.dataSourceOpp.sort = this.sort;


        });
        //  Activate the tooltips
        $('[rel="tooltip"]').tooltip();

        var tagClass = $('.tagsinput').data('color');

        if ($(".tagsinput").length != 0) {
            $('.tagsinput').tagsinput();
        }

        $('.bootstrap-tagsinput').addClass('' + tagClass + '-badge');


        this.service.getOpportunities().then(data => {
            this.opportunities = data;
            console.log('opportunities', this.opportunities);
        });
        this.service.getstates().then(data => {
            this.states = data;
            console.log('states', this.states);
        });
        this.service.getExchanges().then(data => {
            this.exchanges = data;
            console.log('exchanges', this.exchanges);
        });
        this.service.getTags().then(data => {
            this.tags = data;
            console.log('tags', this.tags);
        });
        this.service.getRelations().then(data => {
            this.relations = data;
            console.log('relations', this.relations);
        });
        this.service.getCategories().then(data => {
            this.categories = data;
            console.log('categories', this.categories);
        });
        this.clientId = localStorage.getItem('idClient');
        this.catName = localStorage.getItem('category');
        this.stateName = localStorage.getItem('state');
        this.exchangeName = localStorage.getItem('exchange');
        this.relationName = localStorage.getItem('relation');

        console.log('this.clientId', this.clientId);
        console.log('this.  this.catName', this.catName);
        console.log('this.stateName', this.stateName);
        console.log('this.exchangeName', this.exchangeName);
        console.log('this.relationName', this.relationName);

        this.service.getClient(this.clientId).then(data => {
            console.log("cliente", data);


            this.service.getOppClient(data._id).then(dataOpp => {

                var countKey = Object.keys(dataOpp).length;

                console.log("dataOpp.lenght", countKey)
                data.opportunities = dataOpp;

                if (dataOpp !== '' || dataOpp !== []) {
                    var active = 0;
                    data.opportunitiesTot = countKey;
                    for (let f = 0; f < dataOpp.length; f++) {
                        if (dataOpp[f].active === true) {
                            active++
                        }
                    }
                    data.opportunitiesAct = active;
                }

            });
            this.client = data;
            for (let i = 0; i < this.client.tagIds.length; i++) {
                for (let f = 0; f < this.tags.length; f++) {
                    if (this.client.tagIds[i] === this.tags[f]._id) this.tagsnames.push(this.tags[f].name);

                }
            }
            console.log("this.clienttag",  this.tagsnames )
        })
        setTimeout(() => {
            $('.selectpicker').selectpicker('refresh');
        }, 200);
    }
    public add(type) {

        if (type === 'cat') {
            let category = {
                name: this.catName
            };

            this.service.newCategory(category).then(data => {
                console.log(category.name);
                console.log(data);
                this.service.getCategories().then(dataCats => {
                    this.categories = dataCats;
                    console.log('categories', this.categories);
                    this.categories = [...this.categories];
                    this.reloadCat = true;


                });
                setTimeout(() => {
                    $('.selectpicker').selectpicker('refresh');
                }, 200);
            })
            Swal.fire({
                title: "Categoria Aggiunta: ",
                text: this.catName,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success"
            })


        }
        if (type === 'rel') {
            let relation = {
                name: this.relName
            };

            this.service.newRelation(relation).then(data => {
                console.log(relation.name);
                console.log(data);
                this.service.getRelations().then(dataType => {
                    this.relations = dataType;
                    console.log('relations', this.relations);
                    this.reloadCat = true;


                });
                setTimeout(() => {
                    $('.selectpicker').selectpicker('refresh');
                }, 200);
            })
            Swal.fire({
                title: "Relazione Aggiunta: ",
                text: this.relName,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success"
            })


        }
        if (type === 'stat') {
            let state = {
                name: this.statName
            };

            this.service.newState(state).then(data => {
                console.log(state.name);
                console.log(data);
                this.service.getstates().then(dataType => {
                    this.states = dataType;
                    console.log('states', this.states);
                    this.reloadCat = true;


                });
                setTimeout(() => {
                    $('.selectpicker').selectpicker('refresh');
                }, 200);
            })
            Swal.fire({
                title: "Stato sede Aggiunto: ",
                text: this.statName,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success"
            })


        }
        if (type === 'exc') {
            let exchange = {
                name: this.excName
            };

            this.service.newExchange(exchange).then(data => {
                console.log(exchange.name);
                console.log(data);
                this.service.getExchanges().then(dataType => {
                    this.exchanges = dataType;
                    console.log('exchanges', this.exchanges);
                    this.exchanges = [...this.exchanges];
                    this.reloadCat = true;


                });
                setTimeout(() => {
                    $('.selectpicker').selectpicker('refresh');
                }, 200);
            })
            Swal.fire({
                title: "Mercato Aggiunto: ",
                text: this.excName,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success"
            })


        }
        if (type === 'tag') {
            let tag = {
                name: this.tagName
            };

            this.service.newTag(tag).then(data => {
                console.log(tag.name);
                console.log(data);
                this.service.getTags().then(dataType => {
                    this.tags = dataType;
                    console.log('tags', this.tags);
                    this.tags = [...this.tags];
                    this.reloadCat = true;


                });
                setTimeout(() => {
                    $('.selectpicker').selectpicker('refresh');
                }, 200);
            })
            Swal.fire({
                title: "Tag Aggiunto: ",
                text: this.tagName,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success"
            })


        }



    }

}


/*

arrayDocs: (2) ["9859319846.pdf", "Linea 7 notturna.pdf"]
categoryId: "234234"
checkDoc: []
company: "FreeEdit"
descOpp: "uwu"
exchangeId: "324234"
name: "Gino Lorenzi"
note: "le uwo"
relationId: "23424"
stateId: "5da4480bee2e780e7cc4c477"
tagIds: []
typoAct: "uwulotic"
typoOpp: "owo"
url: "Free-Edit.com"
__v: 0
_id: "5da445123ac9f243fc8f7f3f"
__proto__: Object
﻿
​*/