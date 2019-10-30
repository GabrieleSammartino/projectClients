import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

    constructor(public http: Http) {
    }

    private url = 'http://localhost:3000';
    //GET CLIENTS
    public getClients(): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            this.http.get(this.url + '/clients/')
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (error) => {
                    resolve('Qualcosa non va' + error)
                })
        })
    }
    //GET STATES

    public getstates(): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            this.http.get(this.url + '/states/')
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (error) => {
                    resolve('Qualcosa non va' + error)
                })
        })
    }
    //GET RELATIONS

    public getRelations(): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            this.http.get(this.url + '/relations/')
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (error) => {
                    resolve('Qualcosa non va' + error)
                })
        })
    }
    //GET EXCHANGES

    public getExchanges(): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            this.http.get(this.url + '/exchanges/')
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (error) => {
                    resolve('Qualcosa non va' + error)
                })
        })
    }
    //GET TAGS

    public getTags(): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            this.http.get(this.url + '/tags/')
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (error) => {
                    resolve('Qualcosa non va' + error)
                })
        })
    }
    //GET CATEGORIES

    public getCategories(): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            this.http.get(this.url + '/categories/')
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (error) => {
                    resolve('Qualcosa non va' + error)
                })
        })
    }
    //GET OPPORTUNITIES

    public getOpportunities(): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            this.http.get(this.url + '/opportunities/')
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (error) => {
                    resolve('Qualcosa non va' + error)
                })
        })
    }
    public getOppClient(clientId): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            this.http.get(this.url + '/oppclient/?clientId=' + clientId)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (error) => {
                    resolve('Qualcosa non va' + error)
                })
        })
    }
//POST CLIENT






// LOGIN
    public login(params): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            this.http.post(this.url + '/api/auth/login', params)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (error) => {
                    resolve('Qualcosa non va' + error)
                })
        })
    }
// REGISTER
    public signUp(params): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            this.http.post(this.url + '/api/auth/register', params)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (error) => {
                    resolve('Qualcosa non va' + error)
                })
        })
    }

}
