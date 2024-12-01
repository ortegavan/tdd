import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { By } from '@angular/platform-browser';

describe('ListComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve listar as tarefas', () => {
        const todo = fixture.debugElement.query(By.css('[data-testid="todo"]'));
        expect(todo).toBeTruthy();

        const todoItens = todo.queryAll(By.css('[data-testid="todo-item"]'));
        expect(todoItens.length).toBe(3);

        const completed = fixture.debugElement.query(
            By.css('[data-testid="completed"]')
        );
        expect(completed).toBeTruthy();

        const completedItens = completed.queryAll(
            By.css('[data-testid="completed-item"]')
        );
        expect(completedItens.length).toBe(3);
    });
});
