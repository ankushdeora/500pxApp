import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'name'
})
export class sortByName implements PipeTransform{
    transform(array: Array<any>): Array<string> {
        console.log("sortByName");
        array.sort((a: any, b: any) => {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 0;
        }
        });
        return array;
    }
}

@Pipe({
    name: 'year'
})
export class sortByYear implements PipeTransform{
    transform(array: Array<any>): Array<string> {
        console.log("sortByYear");
        array.sort((a: any, b: any) => {
        // console.log("a.createdatdate: "+a.created_at_date);
        if (a.created_at_date.getTime() < b.created_at_date.getTime()) {
            return -1;
        } else if (a.created_at_date.getTime() > b.created_at_date.getTime()) {
            return 1;
        } else {
            return 0;
        }
        });
        return array;
    }
}
  
@Pipe({
    name: 'Artist'
})
export class sortByArtist implements PipeTransform{
    transform(array: Array<any>): Array<string> {
        console.log("sortByArtist");
        array.sort((a: any, b: any) => {
        if (a.user.fullname < b.user.fullname) {
            return -1;
        } else if (a.user.fullname > b.user.fullname) {
            return 1;
        } else {
            return 0;
        }
        });
        return array;
    }
}

@Pipe({
    name: 'condition' 
})
export class ConditionPipe implements PipeTransform{
    transform(val,condition: string) {
       
        console.log('condition = '+condition);
        
        if (condition=="title") {
            return new sortByName().transform(val);
        }
        else if(condition=="year"){
            return new sortByYear().transform(val);
        } 
        else {
            return new sortByArtist().transform(val);
        }
    }
}