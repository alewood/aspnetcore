import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string,radioOption:string,searchText2:string, secondOpt:string): any[] {
    if(!items) return [];
    if(!searchText && !searchText2) return items;
    var result;
    searchText = searchText.toLowerCase();
    searchText2 = searchText2.toLowerCase();
    if(radioOption=="nome"){
       result= items.filter( it => {
          return it.nome.toLowerCase().includes(searchText);
        });}
        else if(radioOption=="partId"){
          result= items.filter( it => {
            return it.partId.toLowerCase().includes(searchText);
          });
        }
        else if(radioOption=="serialId"){
         result= items.filter( it => {
            return it.serialId.toLowerCase().includes(searchText);
          });
        }
        else if(radioOption=="marca"){
          result= items.filter( it => {
            return it.marca.toLowerCase().includes(searchText);
          });
        }
        else if(radioOption=="modello"){
          result= items.filter( it => {
            return it.modello.toLowerCase().includes(searchText);
          });
        }
        if(searchText2=="")
        return result;
        else{
          if(secondOpt=="nome"){
            return  result.filter( it => {
               return it.nome.toLowerCase().includes(searchText2);
             });}
             else if(secondOpt=="partId"){
               return result.filter( it => {
                 return it.partId.toLowerCase().includes(searchText2);
               });
             }
             else if(secondOpt=="serialId"){
              return result.filter( it => {
                 return it.serialId.toLowerCase().includes(searchText2);
               });
             }
             else if(secondOpt=="marca"){
               return result.filter( it => {
                 return it.marca.toLowerCase().includes(searchText2);
               });
             }
             else if(secondOpt=="modello"){
               return result.filter( it => {
                 return it.modello.toLowerCase().includes(searchText2);
               });
             }

        }
   } 
}