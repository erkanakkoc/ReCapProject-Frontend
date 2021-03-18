import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'colorFilterPipe'
})
export class ColorFilterPipePipe implements PipeTransform {

  transform(value: Color[], filterText: string[]): Color[] {
    
    return filterText?value.filter((co:Color)=>co.colorName.indexOf);
  }

}
