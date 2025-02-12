import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { By } from '@angular/platform-browser';

describe('ListComponent', () => {
    let fixture: ComponentFixture<ListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ListComponent);
        fixture.detectChanges();
    });

    it('deve listar as tarefas pendentes', () => {
        const todo = fixture.debugElement.query(By.css('[data-testid="todo"]'));
        expect(todo).toBeTruthy();

        const tasks = todo.queryAll(By.css('[data-testid="todo-item"]'));
        expect(tasks.length).toBe(3);
    });

    it('deve listar as tarefas concluídas', () => {
        const done = fixture.debugElement.query(By.css('[data-testid="done"]'));
        expect(done).toBeTruthy();

        const tasks = done.queryAll(By.css('[data-testid="done-item"]'));
        expect(tasks.length).toBe(3);
    });
});
