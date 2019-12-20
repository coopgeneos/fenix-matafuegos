import { Pipe, PipeTransform } from '@angular/core';

const EN_ES = {
  name: 'nombre',
  username: 'nombre de usuario',
  edit: 'editar',
  role: 'rol',
  invoiced: 'facturada',
  closed: 'cerrada',
  created: 'creada',
  completingit: 'completandose',
  canceled: 'cancelada'
}

@Pipe({
  name: 'translate'
})
export class TranslatorPipe implements PipeTransform {

  transform(word: string, dictionary?: string) : string {
    try {
      let dict = eval(dictionary);
      return dict[word.toLocaleLowerCase()];
    } catch(err) {
      return word;
    }
  }

}
