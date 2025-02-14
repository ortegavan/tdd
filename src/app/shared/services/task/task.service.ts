import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../interfaces/task.interface';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    getAll(): Observable<Task[]> {
        return of([
            { title: 'Task 1', completed: false },
            { title: 'Task 2', completed: false },
            { title: 'Task 3', completed: false },
            { title: 'Task 4', completed: true },
            { title: 'Task 5', completed: true },
            { title: 'Task 6', completed: true },
        ]);
    }
}
