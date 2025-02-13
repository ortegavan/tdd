import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TasksService } from './tasks.service';

describe('TasksService', () => {
    let service: TasksService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TasksService);
    });

    it('deve retornar uma lista de tarefas', fakeAsync(() => {
        let result: any;

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
