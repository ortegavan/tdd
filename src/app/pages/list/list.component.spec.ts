import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { By } from '@angular/platform-browser';
import { TaskService } from 'src/app/shared/services/task/task.service';
import { of } from 'rxjs';
import { Task } from 'src/app/shared/interfaces/task.interface';

class FakeTaskService implements TaskService {
    getAll = jest.fn();
}

describe('ListComponent', () => {
    let fixture: ComponentFixture<ListComponent>;
    let taskService: TaskService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListComponent],
            providers: [
                {
                    provide: TaskService,
                    useClass: FakeTaskService,
                },
            ],
        }).compileComponents();

        taskService = TestBed.inject(TaskService);
    });

    it('deve listar as tarefas', () => {
        (taskService.getAll as jest.Mock).mockReturnValue(
            of([
                { title: 'Task 1', completed: false },
                { title: 'Task 2', completed: false },
                { title: 'Task 3', completed: false },
                { title: 'Task 4', completed: true },
                { title: 'Task 5', completed: true },
                { title: 'Task 6', completed: true },
            ] as Task[])
        );

        fixture = TestBed.createComponent(ListComponent);
        fixture.detectChanges();

        const todo = fixture.debugElement.query(By.css('[data-testid="todo"]'));
        expect(todo).toBeTruthy();

        const tasks = todo.queryAll(By.css('[data-testid="todo-item"]'));
        expect(tasks.length).toBe(3);
    });

    it('deve listar as tarefas concluídas', () => {
        (taskService.getAll as jest.Mock).mockReturnValue(
            of([
                { title: 'Task 1', completed: false },
                { title: 'Task 2', completed: false },
                { title: 'Task 3', completed: false },
                { title: 'Task 4', completed: true },
                { title: 'Task 5', completed: true },
                { title: 'Task 6', completed: true },
            ] as Task[])
        );

        fixture = TestBed.createComponent(ListComponent);
        fixture.detectChanges();

        const done = fixture.debugElement.query(By.css('[data-testid="done"]'));
        expect(done).toBeTruthy();

        const tasks = done.queryAll(By.css('[data-testid="done-item"]'));
        expect(tasks.length).toBe(3);
    });
});
