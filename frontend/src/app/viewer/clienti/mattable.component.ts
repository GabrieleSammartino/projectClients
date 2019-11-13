import {ApiService} from "../../../api.service.ts";
import {Component, ChangeDetectionStrategy, OnInit, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {
    MatPaginator, MatSort, MatTableDataSource,
    MatDialog, MatDialogRef, MAT_DIALOG_DATA
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

export class Captain {
    name: string;
    surname: string;
}

export class SpaceCraft {
    name: string;
    isConstitutionClass: boolean;
    captain: Captain;
}

const SPACECRAFT_DATA: SpaceCraft[] = [
    {name: 'Endurance', isConstitutionClass: false, captain: {name: 'Joseph', surname: 'Cooper'}},
    {name: 'Enterprise', isConstitutionClass: false, captain: {name: 'Christopher', surname: 'Pike'}},
    {name: 'Discovery', isConstitutionClass: false, captain: {name: 'Christopher', surname: 'Pike'}},
    {name: 'Enterprise', isConstitutionClass: false, captain: {name: 'Jean-Luc', surname: 'Pickard'}}
];


@Component({
    templateUrl: 'mattable.component.html'
})
export class MatTableComponent implements OnInit {
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    filterEntity: Client;
    filterType: MatTableFilter;
    //  displayedColumns: string[] = ['name', 'captainName', 'captainSurname', 'isConstitutionClass'];
    dataSource;
    displayedColumns: string[] = ['company', 'name', 'exchangeId', 'relationId', 'stateId', 'categoryId', 'url', 'typoAct', 'tag', 'opportunities'];


    public states = [];
    public tags = [];
    public exchanges = [];
    public relations = [];
    public categories = [];

    public opportunities = [];


    public clients: any;


    constructor(private http: HttpClient,
                private router: Router,
                public service: ApiService,
                public dialog: MatDialog
    ) {

    }

    public goToUrl(url) {
        console.log(url);

        window.open(url, "_blank");
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
        this.filterEntity = new Client();
        // this.filterEntity.captain = new Captain();
        this.filterType = MatTableFilter.ANYWHERE;
        // this.dataSource = new MatTableDataSource(SPACECRAFT_DATA);
        console.log("this.filterEntity", this.filterEntity)
        this.service.getClients().then(data => {
            this.clients = data;
            console.log('clients', this.clients);
            // this.dataSource = new MatTableDataSource<Client>(this.clients);
            console.log("this.dataSource", data);

            for (let i = 0; i < data.length; i++) {
                for (let f = 0; f < this.states.length; f++) {
                    if (data[i].stateId === this.states[f]._id) data[i].stateId = this.states[f].name

                }
            }
            for (let i = 0; i < data.length; i++) {
                for (let f = 0; f < this.relations.length; f++) {
                    if (data[i].relationId === this.relations[f]._id) data[i].relationId = this.relations[f].name

                }
            }
            for (let i = 0; i < data.length; i++) {
                for (let f = 0; f < this.tags.length; f++) {
                    if (data[i].tagId === this.tags[f]._id) data[i].tagId = this.tags[f].name

                }
            }
            for (let i = 0; i < data.length; i++) {
                for (let f = 0; f < this.exchanges.length; f++) {
                    if (data[i].exchangeId === this.exchanges[f]._id) data[i].exchangeId = this.exchanges[f].name

                }
            }
            for (let i = 0; i < data.length; i++) {
                for (let f = 0; f < this.categories.length; f++) {
                    if (data[i].categoryId === this.categories[f]._id) data[i].categoryId = this.categories[f].name

                }
            }
            for (let i = 0; i < data.length; i++) {
                console.log("clientId", data[i]);
                this.service.getOppClient(data[i]._id).then( dataOpp => {
                    console.log("clientId", data[i]._id);
                    console.log("oppCl", dataOpp)
                    var countKey = Object.keys(dataOpp).length;

                    console.log("dataOpp.lenght", countKey)
                    data[i].opportunities = dataOpp;

                    if (dataOpp !== '' || dataOpp !== []) {
                        var active = 0;
                        data[i].opportunitiesTot = countKey;
                        for (let f = 0 ; f < dataOpp.length; f++) {
                            if (dataOpp[f].active === true) {
                                active++
                            }
                        }
                        data[i].opportunitiesAct = active;
                    }

                })
            }
            console.log("clientsFinal", data);

            this.dataSource = new MatTableDataSource(data);
            console.log(" this.dataSourceMatTableDataSource", this.dataSource)

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

        });

    }
getOppCl(clientId) {
        this.service.getOppClient(clientId).then(data => {
            console.log("clientId", clientId);
            console.log("oppCl", data)

        })
}
    onRowClicked(row) {

        console.log('Row clicked: ', row);
         console.log("clientRow",row._id)
        localStorage.setItem('idClient', row._id);
        localStorage.setItem('category', row.categoryId);
        localStorage.setItem('state', row.stateId);
        localStorage.setItem('exchange', row.exchangeId);
        localStorage.setItem('relation', row.relationId);

        this.router.navigate(['/viewer/client/']);
    }
}
