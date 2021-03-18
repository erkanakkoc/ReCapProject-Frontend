import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerFilterPipe'
})
export class CustomerFilterPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
