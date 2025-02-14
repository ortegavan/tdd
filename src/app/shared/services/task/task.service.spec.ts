import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TaskService } from './task.service';
import { Task } from '../../interfaces/task.interface';

describe('TasksService', () => {
    let service: TaskService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TaskService);
    });

    it('deve retornar uma lista de tarefas', fakeAsync(() => {
        let result: Task[] | null = null;

        service.getAll().subscribe((tasks) => {
            result = tasks;
        });

        tick();
        expect(result).toEqual([
            { title: 'Task 1', completed: false },
            { title: 'Task 2', completed: false },
            { title: 'Task 3', completed: false },
            { title: 'Task 4', completed: true },
            { title: 'Task 5', completed: true },
            { title: 'Task 6', completed: true },
        ]);
    }));
});
