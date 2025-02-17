import { TestBed } from '@angular/core/testing';
import { ListItemComponent } from './list-item.component';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { TestHelper } from '@testing/helpers/test-helper';
import { Component } from '@angular/core';

async function setup(task: Task) {
    @Component({
        standalone: true,
        imports: [ListItemComponent],
        template: `
            <app-list-item
                [task]="task"
                (completed)="onCompleteTask($event)"
            ></app-list-item>
        `,
    })
    class HostComponent {
        task: Task = task;
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCompleteTask(): void {}
    }

    await TestBed.configureTestingModule({
        imports: [HostComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(HostComponent);
    const helper = new TestHelper(fixture);

    return { fixture, helper };
}

describe('ListItemComponent', () => {
    it('deve renderizar o título da tarefa', async () => {
        const fakeTask: Task = {
            title: 'Nome da tarefa',
            completed: false,
        };

        const { fixture, helper } = await setup(fakeTask);

        fixture.detectChanges();

        const text = helper.getTextContentByTestId('task-title');

        expect(text).toBe(fakeTask.title);
    });

    it('deve emitir um evento ao completar a tarefa', async () => {
        const fakeTask: Task = {
            title: 'Nome da tarefa',
            completed: false,
        };

        const { fixture, helper } = await setup(fakeTask);
        const spy = jest.spyOn(fixture.componentInstance, 'onCompleteTask');

        fixture.detectChanges();

        const btn = helper.queryByTestId('complete-action');
        btn.triggerEventHandler('click', null);

        expect(spy).toHaveBeenCalled();
    });
});
