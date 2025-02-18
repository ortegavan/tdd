import { HttpClient } from '@angular/common/http';
import { TaskService } from 'src/app/shared/services/task/task.service';

export class FakeTaskService implements TaskService {
    httpClient!: HttpClient;
    getAll = jest.fn();
    patch = jest.fn();
}
