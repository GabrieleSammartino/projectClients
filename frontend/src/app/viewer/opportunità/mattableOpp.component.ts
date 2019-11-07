import {ApiService} from '../../../api.service.ts';
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
export class Opportunity {
    name: string;
    company: string;
    desc: string;
    active: Boolean;

}

@Component({
    templateUrl: 'mattableOpp.component.html'
})
export class MatTableComponentOpp implements OnInit {
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    filterEntity: Opportunity;
    filterType: MatTableFilter;
    //  displayedColumns: string[] = ['name', 'captainName', 'captainSurname', 'isConstitutionClass'];
    dataSourceOpp;
    displayedColumns: string[] = ['name', 'company', 'desc', 'active'];
    public opportunities = [];

    constructor(private http: HttpClient,
                private router: Router,
                public service: ApiService,
                public dialog: MatDialog
    ) {


    }

    public goToUrl(url) {
        console.log(url);

        window.open(url, '_blank');
    }

    ngOnInit() {
        this.filterEntity = new Opportunity();
        this.filterType = MatTableFilter.ANYWHERE;
        this.service.getOpportunities().then(data => {
            this.opportunities = data;

            this.dataSourceOpp = new MatTableDataSource( this.opportunities);
            console.log('opportunities',  this.dataSourceOpp);

            this.dataSourceOpp.paginator = this.paginator;
            this.dataSourceOpp.sort = this.sort;


        });

    }

}
