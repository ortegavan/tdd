import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemComponent } from './list-item.component';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { TestHelper } from '@testing/helpers/test-helper';

describe('ListItemComponent', () => {
    let fixture: ComponentFixture<ListItemComponent>;
    let helper: TestHelper<ListItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListItemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ListItemComponent);
        helper = new TestHelper(fixture);
    });

    it('deve renderizar o título da tarefa', () => {
        const fakeTask: Task = {
            title: 'Nome da tarefa',
            completed: false,
        };
        fixture.componentRef.setInput('task', fakeTask);
        fixture.detectChanges();

        const text = helper.getTextContentByTestId('task-title');

        expect(text).toEqual(fakeTask.title);
    });
});
