import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string,radioOption:string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    
    searchText = searchText.toLowerCase();
    if(radioOption=="nome"){
        return items.filter( it => {
          return it.nome.toLowerCase().includes(searchText);
        });}
        else if(radioOption=="id"){
          return items.filter( it => {
            return it.id.toLowerCase().includes(searchText);
          });
        }
        else if(radioOption=="marca"){
          return items.filter( it => {
            return it.marca.toLowerCase().includes(searchText);
          });
        }
        else if(radioOption=="modello"){
          return items.filter( it => {
            return it.modello.toLowerCase().includes(searchText);
          });
        }
   } 
}