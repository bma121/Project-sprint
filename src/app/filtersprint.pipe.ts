import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtersprint'
})
export class FiltersprintPipe implements PipeTransform {

  transform(sp2: any, term: any): any {
    // check if search term is undefined
    if (term === undefined) {return sp2; }
    return sp2.filter(function(sprint) {
      return sprint.length.toLowerCase().includes(term.toLowerCase());
    });

  }

}
