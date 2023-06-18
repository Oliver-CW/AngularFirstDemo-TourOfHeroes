import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit{

  hero : Hero|undefined;
  constructor(private heroService:HeroService,
              private activatedRoute:ActivatedRoute,
              private location:Location)
  {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes():void{
    const id :string|null= this.activatedRoute.snapshot.paramMap.get('id');
    this.heroService.getHero(Number(id)).subscribe(hero => this.hero = hero);
  }

  goBack() :void{
    this.location.back();
  }
}

