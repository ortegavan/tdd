import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Task {
    title: string;
    completed: boolean;
}

@Component({
    selector: 'app-list',
    imports: [CommonModule],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
})
export class ListComponent {
    tasks = signal<Task[]>([
        { title: 'Task 1', completed: false },
        { title: 'Task 2', completed: false },
        { title: 'Task 3', completed: false },
        { title: 'Task 4', completed: true },
        { title: 'Task 5', completed: true },
        { title: 'Task 6', completed: true },
    ]);

    todoTasks = computed(() => this.tasks().filter((task) => !task.completed));
    completedTasks = computed(() =>
        this.tasks().filter((task) => task.completed)
    );
}
