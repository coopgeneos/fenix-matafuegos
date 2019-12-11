import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SortEvent } from 'src/app/commons/directives/sortable.directive';
import { FilterEvent } from 'src/app/commons/directives/filterable.directive';
import { Condition } from 'src/app/commons/directives/filterable.directive'
/* import { NgbPaginationLast } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { keys } from 'ts-transformer-keys'; */

interface State {
  page: number;
  pageSize: number;
  filter:FilterEvent[],
  sort: SortEvent
}

export class BaseServiceAPI<T> {

  protected _url: string;

  private _endpointName:string = null;

  private _state: State = {
    page: 1,
    pageSize: 50,
    filter: [],
    sort: {column:'',direction:''},
  };

  // Just for search
  private _loading:boolean = true;
  private _listData: T[] = [];
  private _total: number = 0;
  private _err: any = {};

  constructor(protected httpClient : HttpClient, endpointName: string) {
    this._endpointName = endpointName ;
    this._url = environment.api_url;
  }

  public search(options?: Object) : Promise<T[]>{
    return this._search(options);
  }

  public get(id:any) {
    return this._get(id);
  }
  public getTodo() {
    return this.__get();
  }
  public add(data:T) {
    delete data['id'];
    delete data['createdAt'];
    delete data['deletedAt'];
    this.transformCollections(data);
    return this._add(data);
  }

  public delete(id:any) {
    return this._delete(id);
  }

  public update(id:any,data:T) {
    delete data['createdAt'];
    delete data['deletedAt'];
    this.transformCollections(data);
   return  this._update(id,data);
  }

  public clearState(){
    this._state = {
      page: 1,
      pageSize: 50,
      filter: [],
      sort: {column:'',direction:''}
    }
  }

  private transformCollections(data: T) {
    let keys = Object.keys(data);
    for(let i=0; i<keys.length; i++){
      let key = keys[i];
      // Es un arreglo de objetos y esos objetos tienen ID ? => Lo transformo en un arreglo de IDs
      // Es un Object con id? => Lo transformo en un ID
      if(data[key]){
        if(Array.isArray(data[key]) && data[key].length > 0 && data[key][0]['id']){
          data[key] = data[key].map(elem => {return elem.id});
        } else if(typeof data[key] == 'object' && data[key]['id']){
          data[key] = data[key]['id'];
        }
      }
    }
  }

  private _search(options?: Object) : Promise<T[]> {
    return new Promise((resolve, reject) => {
      this._loading = true;

      let limit = '?limit='+this.pageSize;
      let skip = '&skip='+this.pageSize*(this.page - 1)
      if(options){
        /*
          En el caso de limit se fuerza a que sea un numero muy grande, porque si se quita, 
          por defecto el WS te devuelve 30 elementos
        */
        limit = (options['pageSize'] != undefined && options['pageSize'] == 0) ? '?limit=9999999' : limit;
        if(options['sort']) this._state.sort = options['sort'];
      }

      let url = `${environment.api_url}${this._endpointName}${limit}${skip}`;
    
      if (this._state.sort.column)
        url += `&sort=${this._state.sort.column}%20${this._state.sort.direction}`;
      
      let where = this.toSailsWhere();
      url = where == "" ? url : url + `&${where}`;
      
      // Fetch && Count Data
      let urlCount = `${environment.api_url}${this._endpointName}/count?`;
      urlCount = where == "" ? urlCount : urlCount + `&${where}`;
      this.httpClient.get<any>(urlCount)
      .subscribe( 
        data => { 
          // Evita que la paginación se extienda
          // ¿Por que 600? porque el paginador muestra de manera prolija hasta 24 páginas.
          // En caso de que el usuario decida paginar de a 25 registros (el menor de los casos)
          // se va a dar que va a haber la mayor cantidad de opciones.
          // 25 * 24 = 600 
          this._total = data.count > 600 ? 600 : data.count; 
          this.httpClient.get<T[]>(url)
          .subscribe( 
            data => {
              this._listData = data;
              resolve(data)
            },
            err => {
              this._err = err;
              console.log('Error!',err)
              reject(`Error!' ${err}`)
            },
            () => this._loading = false);
      });
    })
  }

  public toSailsWhere(): string {
    let where = "";
    for (let i = 0 ; i<this._state.filter.length; i++){
      if (this._state.filter[i].value) {
        if (this._state.filter[i].condition) {
          where += `${this.toSailsFilter(this._state.filter[i])},`
        } else {
          where += `"${this._state.filter[i].column}":{"contains":"${this._state.filter[i].value}"},`;
        }
      } 
    }
    
    // Quito la coma final
    let iwc = where.lastIndexOf(',');
    where = where.substring(0, (iwc != -1) ? iwc : where.length);

    where = where != "" ? `where={${where}}` : where;
    
    return where;
  }

  private toSailsFilter(filter: FilterEvent) : string {
    switch (filter.condition) {
      case Condition["="]:
        return `"${filter.column}":"${filter.value}"`;
      case Condition["or"]:
        let result = "";
        if(Array.isArray(filter.value)){
          result  = filter.value.reduce((total, current) => {
            return total + `{${this.toSailsFilter(current)}}`;
          },`"or":[`)
        }
        result = result.substring(0, result.length-1);
        result += `]` 
        return result; 
      case Condition["between"]: 
        return `"${filter.column}":{">":"${filter.value.from}","<":"${filter.value.to}"}`
      default:
        return `"${filter.column}":{"${Condition[filter.condition]}":"${filter.value}"}`;
    }
  }

  private _add(data:T) {
    let url = `${environment.api_url}${this._endpointName}`; 
    return this.httpClient.post<T>(url,data);
  }

  private _update(id:any, data:T) {
    let url = `${environment.api_url}${this._endpointName}/${id}`; 
    return this.httpClient.patch<T>(url,data);
  }

  private _delete(id:any) {
    let url = `${environment.api_url}${this._endpointName}/${id}`; 
    return this.httpClient.delete<any>(url);
  }
  
  private _get(id:any) {
    let url = `${environment.api_url}${this._endpointName}/${id}`;
    return this.httpClient.get<T>(url);
  }
  private __get() {
    let url = `${environment.api_url}${this._endpointName}`;
    return this.httpClient.get<T>(url);
  }
  // Setters and Getters

  get loading() { return this._loading; }
  get listData() { return this._listData }
  get err() { return this._err }

  get total() { return this._total }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get filters() { return this._state.filter; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set filter(filter: FilterEvent) { 
      //Creates a copy
      let newFilter:FilterEvent[] = [];

      //Filter same columns
      newFilter = this._state.filter.filter( item => item.column !== filter.column);
      
      //Not blank values
      if (filter.value)
        newFilter.push(filter)
      this._set({filter:newFilter.filter(item => item.value )})
    }
  set filters(filters: FilterEvent[]) {
      //Creates a copy
      let newFilter:FilterEvent[] = [];
      
      // removes duplicated filters. those who have same column value. The first one preserved
      for(let i=0; i<filters.length; i++){
        for(let j=i+1; j<filters.length; j++){
          if(j<filters.length && filters[i].column === filters[j].column)
            filters[j].value = null;
        }
      }
      
      //Not blank values
      newFilter = filters.filter(item => {return item.value != null});
      
      Object.assign(this._state, {filter:newFilter});
    }
  set sort(sort:SortEvent) { this._set({sort}); }

  //Workaround for update listdata when order, filter or pageSize changes
  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search();
  }


}
