import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../api.service.ts';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
    moduleId: module.id,
    templateUrl: 'clientcreate.component.html'
})

export class ClientcreateComponent implements OnInit {
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
    public checkDoc: any;
    public email: any;

    public catName = '';
    public catNew = false;


    public states = [];
    public tags = [];
    public exchanges = [];
    public relations = [];
    public categories = [];
    public opportunities = [];

    constructor(private http: HttpClient,
                private router: Router,
                public service: ApiService,
    ) {
    }
    onChange() {

    }
    public add(type) {
        console.log("catname", this.catName)
        if (type === 'cat') {
            let category = {
                name: this.catName
            };

            this.service.newCategory(category).then(data => {
                console.log(category.name);
                this.catNew = true;
                console.log(data);
                this.service.getCategories().then(dataCats => {
                    this.categories = dataCats;
                    console.log('categories', this.categories);
                });
            })



            Swal.fire({
                title: "Categoria Aggiunta: ",
                text: this.catName,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success"
            })


        }
    }


    public createClient() {

        this.service.newClient(['0']).then(data => {
            console.log(data);
            console.log("categoryId", this.categoryId)
        })
    }

    ngOnInit() {
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
    }
}










