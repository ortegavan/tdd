import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { TaskService } from 'src/app/shared/services/task/task.service';
import { NoItemsComponent } from '../no-items/no-items.component';

@Component({
    selector: 'app-list',
    imports: [CommonModule, NoItemsComponent],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
    taskService = inject(TaskService);
    tasks = signal<Task[]>([]);

    todoTasks = computed(() => this.tasks().filter((task) => !task.completed));
    completedTasks = computed(() =>
        this.tasks().filter((task) => task.completed)
    );

    ngOnInit(): void {
        this.taskService.getAll().subscribe((tasks) => {
            this.tasks.set(tasks);
        });
    }
}
