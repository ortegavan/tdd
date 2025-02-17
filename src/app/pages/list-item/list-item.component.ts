import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/shared/interfaces/task.interface';

@Component({
    selector: 'app-list-item',
    imports: [CommonModule],
    templateUrl: './list-item.component.html',
    styleUrl: './list-item.component.scss',
})
export class ListItemComponent {
    task = input.required<Task>();
    completed = output<Task>();

    onComplete() {
        this.completed.emit(this.task());
    }
}
