import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class TestHelper<T> {
    constructor(private fixture: ComponentFixture<T>) {}

    queryByTestId(testId: string): DebugElement {
        return this.fixture.debugElement.query(
            By.css(`[data-testid="${testId}"]`)
        );
    }

    getTextContentByTestId(testId: string): string {
        return this.queryByTestId(testId).nativeElement.textContent;
    }
}
