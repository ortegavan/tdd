import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';

@Component({
    selector: 'app-list',
    imports: [CommonModule],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
    tasksService = inject(TasksService);
    tasks = signal<Task[]>([]);

    todoTasks = computed(() => this.tasks().filter((task) => !task.completed));
    completedTasks = computed(() =>
        this.tasks().filter((task) => task.completed)
    );

    ngOnInit(): void {
        this.tasksService.getAll().subscribe((tasks) => {
            this.tasks.set(tasks);
        });
    }
}
