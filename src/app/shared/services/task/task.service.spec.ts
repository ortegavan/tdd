import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TaskService } from './task.service';
import { Task } from '../../interfaces/task.interface';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('TasksService', () => {
    let service: TaskService;
    let controller: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });

        service = TestBed.inject(TaskService);
        controller = TestBed.inject(HttpTestingController);
    });

    it('deve retornar uma lista de tarefas', fakeAsync(() => {
        let result: Task[] | null = null;

        service.getAll().subscribe((tasks) => {
            result = tasks;
        });

        const fakeTasks = [
            { title: 'Task 1', completed: false },
            { title: 'Task 2', completed: false },
            { title: 'Task 3', completed: false },
            { title: 'Task 4', completed: true },
            { title: 'Task 5', completed: true },
            { title: 'Task 6', completed: true },
        ];

        const request = controller.expectOne('/tasks');
        request.flush(fakeTasks);

        tick();

        expect(result).toEqual(fakeTasks);
    }));
});
