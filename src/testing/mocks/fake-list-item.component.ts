import { Component, input, output } from '@angular/core';
import { ListItemComponent } from 'src/app/pages/list-item/list-item.component';
import { Task } from 'src/app/shared/interfaces/task.interface';

@Component({
    selector: 'app-list-item',
    standalone: true,
    template: '',
})
export class FakeListItemComponent implements ListItemComponent {
    task = input.required<Task>();
    completed = output<Task>();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onComplete(): void {}
}
