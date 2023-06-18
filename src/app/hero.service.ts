import { Injectable } from '@angular/core';
import {Hero} from "./hero";
import {HEROES} from "./mock-heroes";
import {catchError, Observable, of, tap} from "rxjs";
import {MessagesService} from "./messages.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  private heroesUrl :string = 'api/heroes';

  constructor(private messageService:MessagesService,
              private httpClient:HttpClient
              ){}
  public getHeroes() : Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(this.heroesUrl).pipe(
      tap(_=> this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes',[])));
  }

  public getHero(id :number):Observable<Hero|undefined>{
    this.messageService.add(`HeroService: fetched hero id = ${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  private log(msg:string):void{
    this.messageService.add(`HeroService:${msg}`);
  }

  private handleError<T>(operation: string = 'operation', result?: T) : (error:any)=>Observable<T> {
    return (error:any):Observable<T> => {
      console.log(error);
      this.log(`${operation} failed : ${error.message}`);
      return of(result as T);
    };
  }

}
