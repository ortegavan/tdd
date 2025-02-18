import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { TaskService } from 'src/app/shared/services/task/task.service';
import { NoItemsComponent } from '../no-items/no-items.component';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
    selector: 'app-list',
    imports: [CommonModule, NoItemsComponent, ListItemComponent],
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

    onComplete(task: Task): void {
        this.taskService
            .patch(task.id, { completed: true })
            .subscribe((task) => this.updateTasks(task));
    }

    private updateTasks(task: Task): void {
        this.tasks.update((tasks) =>
            tasks.map((t) => (t.id === task.id ? task : t))
        );
    }
}
