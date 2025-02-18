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

        const fakeTasks: Task[] = [
            { id: '1', title: 'Task 1', completed: false },
            { id: '2', title: 'Task 2', completed: false },
            { id: '3', title: 'Task 3', completed: false },
            { id: '4', title: 'Task 4', completed: true },
            { id: '5', title: 'Task 5', completed: true },
            { id: '6', title: 'Task 6', completed: true },
        ];

        const request = controller.expectOne('/api/tasks');
        request.flush(fakeTasks);

        tick();

        expect(result).toEqual(fakeTasks);
    }));

    it('deve atualizar uma tarefa', fakeAsync(() => {
        const fakeTask: Task = { id: '1', title: 'Task 1', completed: false };
        let result: Task | null = null;

        service
            .patch(fakeTask.id, { completed: true })
            .subscribe((response) => {
                result = response;
            });

        const request = controller.expectOne((req) => {
            return (
                req.url === `/api/tasks/${fakeTask.id}` &&
                req.method === 'PATCH'
            );
        });
        const response = { ...fakeTask, completed: true };
        request.flush(response);

        tick();

        expect(result).toEqual(response);
    }));
});
