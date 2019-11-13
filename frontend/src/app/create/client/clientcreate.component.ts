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
    public company: null;
    public name: null;
    public typoAct: null;
    public url: null;
    public stateId: null;
    public tagSId = [];
    public typoOpp: null;
    public descOpp: null;
    public note: null;
    public email: null;

    public categoryId: null;
    public relationId: null;
    public exchangeId: null;

    public catName = null;
    public relName = null;
    public statName = null;
    public excName = null;
    public tagName = null;


    public reloadCat = false;


    public states = [];
    public tags = [];
    public exchanges = [];
    public relations = [];
    public categories = [];
    public opportunities = [];

    public doc: File = null;
    public checkDoc: File = null;

    constructor(private http: HttpClient,
                private router: Router,
                public service: ApiService,
    ) {

    }

    handleFileInput(files: FileList) {
        this.doc = files.item(0);
        console.log("doc", this.doc);

    }

    handleFileInput2(files: FileList) {
        this.checkDoc = files.item(0);
        console.log("checkDoc", this.checkDoc);

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
   public addTag(event) {
        console.log(event);
    }


    public createClient() {
        console.log("this.tagSId", this.tagSId);


        var formData = new FormData();
        formData.append('company', this.company);
        formData.append('name', this.name);
        formData.append('typoAct', this.typoAct);
        formData.append('url', this.url);
        formData.append('categoryId', this.categoryId);
        formData.append('relationId', this.relationId);
        formData.append('email', this.email);
        formData.append('exchangeId', this.exchangeId);
        formData.append('stateId', this.stateId);

        for (var i = 0; i < this.tagSId.length; i++) {
            formData.append("tagIds[" + i + "]", this.tagSId[i])
        }



        formData.append('typoOpp', this.typoOpp);
        formData.append('descOpp', this.descOpp);
        formData.append('note', this.note);
        formData.append('doc', this.doc);
        formData.append('checkDoc', this.checkDoc);
        console.log("formData", formData);



        this.service.newClient(formData).then(data => {
            console.log(data);
            if (data.status === 400) {
                Swal.fire({
                    title: "Errore ",
                    text: data._body,
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success",
                    type: "error"
                })
            }
            else {
                Swal.fire({
                    title: "Creato correttamente ",
                    text: data,
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success",
                    type: "success"
                })
            }

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

            setTimeout(() => {
                $('.selectpicker').selectpicker('refresh');
            }, 200);

    }

}










