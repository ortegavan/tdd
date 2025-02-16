import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemComponent } from './list-item.component';
import { By } from '@angular/platform-browser';
import { Task } from 'src/app/shared/interfaces/task.interface';

describe('ListItemComponent', () => {
    let fixture: ComponentFixture<ListItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListItemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ListItemComponent);
    });

    it('deve renderizar o título da tarefa', () => {
        const fakeTask: Task = {
            title: 'Item 1',
            completed: false,
        };
        fixture.componentRef.setInput('task', fakeTask);
        fixture.detectChanges();

        const element = fixture.debugElement.query(
            By.css('[data-testid="task-title"]')
        );
        const text = element.nativeElement.textContent;

        expect(text).toEqual(fakeTask.title);
    });
});
