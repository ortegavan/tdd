import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './shared/components/header/header.component';
import { FakeHeaderComponent } from '@testing/mocks/fake-header.component';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent, RouterModule.forRoot([])],
        }).compileComponents();

        TestBed.overrideComponent(AppComponent, {
            remove: {
                imports: [HeaderComponent],
            },
            add: {
                imports: [FakeHeaderComponent],
            },
        });
    });

    it(`deve renderizar o componente header`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const header = fixture.debugElement.query(By.css('app-header'));
        expect(header).toBeTruthy();
    });

    it(`deve renderizar o router-outlet`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const outlet = fixture.debugElement.query(By.css('router-outlet'));
        expect(outlet).toBeTruthy();
    });
});
