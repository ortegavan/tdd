import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type Task = {
    title: string;
    completed: boolean;
};

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
})
export class ListComponent {
    tasks = signal<Task[]>([
        { title: 'Task 1', completed: false },
        { title: 'Task 2', completed: false },
        { title: 'Task 3', completed: false },
        { title: 'Task 1', completed: true },
        { title: 'Task 2', completed: true },
        { title: 'Task 3', completed: true },
    ]);

    todoTasks = computed(() => this.tasks().filter((task) => !task.completed));
    completedTasks = computed(() =>
        this.tasks().filter((task) => task.completed)
    );
}
