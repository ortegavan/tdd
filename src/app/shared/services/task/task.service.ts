import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../interfaces/task.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    httpClient = inject(HttpClient);

    getAll(): Observable<Task[]> {
        return this.httpClient.get<Task[]>('/tasks');
    }
}
