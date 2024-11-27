import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
    selector: 'app-header',
    standalone: true,
    template: '',
})
class FakeHeaderComponent {}

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({}).compileComponents();

        TestBed.overrideComponent(AppComponent, {
            remove: {
                imports: [HeaderComponent],
            },
            add: {
                imports: [FakeHeaderComponent],
            },
        });
    });

    it('deve renderizar o componente header', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const element = fixture.debugElement.query(By.css('app-header'));
        expect(element).toBeTruthy();
    });

    it('deve renderizar o router-outlet', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const element = fixture.debugElement.query(By.css('router-outlet'));
        expect(element).toBeTruthy();
    });
});
