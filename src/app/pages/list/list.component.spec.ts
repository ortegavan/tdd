import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { By } from '@angular/platform-browser';
import { TaskService } from 'src/app/shared/services/task/task.service';
import { of } from 'rxjs';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { FakeTaskService } from '@testing/mocks/fake-task.service';
import { FakeListItemComponent } from '@testing/mocks/fake-list-item.component';
import { ListItemComponent } from '../list-item/list-item.component';
import { TestHelper } from '@testing/helpers/test-helper';

describe('ListComponent', () => {
    let fixture: ComponentFixture<ListComponent>;
    let taskService: TaskService;
    let helper: TestHelper<ListComponent>;

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

        TestBed.overrideComponent(ListComponent, {
            remove: {
                imports: [ListItemComponent],
            },
            add: {
                imports: [FakeListItemComponent],
            },
        });

        fixture = TestBed.createComponent(ListComponent);
        helper = new TestHelper(fixture);

        taskService = TestBed.inject(TaskService);
    });

    it('deve listar as tarefas pendentes', () => {
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

        fixture.detectChanges();

        const todo = fixture.debugElement.query(By.css('[data-testid="todo"]'));
        expect(todo).toBeTruthy();

        const tasks = todo.queryAll(By.css('[data-testid="todo-item"]'));
        expect(tasks.length).toBe(3);

        expect(tasks[0].componentInstance.task()).toEqual({
            title: 'Task 1',
            completed: false,
        });
        expect(tasks[1].componentInstance.task()).toEqual({
            title: 'Task 2',
            completed: false,
        });
        expect(tasks[2].componentInstance.task()).toEqual({
            title: 'Task 3',
            completed: false,
        });
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

        fixture.detectChanges();

        const done = fixture.debugElement.query(By.css('[data-testid="done"]'));
        expect(done).toBeTruthy();

        const tasks = done.queryAll(By.css('[data-testid="done-item"]'));
        expect(tasks.length).toBe(3);

        expect(tasks[0].componentInstance.task()).toEqual({
            title: 'Task 4',
            completed: true,
        });
        expect(tasks[1].componentInstance.task()).toEqual({
            title: 'Task 5',
            completed: true,
        });
        expect(tasks[2].componentInstance.task()).toEqual({
            title: 'Task 6',
            completed: true,
        });
    });

    describe('quando a tarefa está pendente', () => {
        it('deve completar uma tarefa', () => {
            const fakeTask: Task = {
                id: '1',
                title: 'Task 1',
                completed: false,
            };
            const fakeTasks: Task[] = [fakeTask];
            const completedTask: Task = { ...fakeTask, completed: true };

            (taskService.getAll as jest.Mock).mockReturnValue(of(fakeTasks));
            (taskService.patch as jest.Mock).mockReturnValue(of(completedTask));

            fixture.detectChanges();

            expect(helper.queryByTestId('done-item')).toBeNull();

            const todoItem = helper.queryByTestId('todo-item');
            todoItem.componentInstance.completed.emit(fakeTask);

            expect(taskService.patch).toHaveBeenCalledWith(fakeTask.id, {
                completed: true,
            });

            fixture.detectChanges();

            expect(helper.queryByTestId('done-item')).toBeTruthy();
        });
    });
});
