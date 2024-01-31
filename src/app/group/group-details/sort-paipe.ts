import { Pipe, PipeTransform } from '@angular/core';
import { GroupDialogItems } from 'src/app/core/models/interface';

@Pipe({
  name: 'sortDialog',
  standalone: true,
})
export class SortSearchPipe implements PipeTransform {
  transform(cards: GroupDialogItems[]): GroupDialogItems[] {
    if (!cards || !Array.isArray(cards)) {
      return [];
    }

    const sortedCards = [...cards];

    sortedCards.sort((a, b) => {
      const dateA = +a.createdAt.S;
      const dateB = +b.createdAt.S;

      return dateA - dateB;
    });

    return sortedCards;
  }
}
