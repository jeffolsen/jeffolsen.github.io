import { Component, inject, signal } from '@angular/core';

import { Api } from './core/api';
import { CodeBlock } from './shared/components/code-block/code-block';

@Component({
  selector: 'app-root',
  imports: [CodeBlock],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly api = inject(Api);

  protected readonly title = signal('jeffolsen-site');
  protected readonly data = signal<unknown>(undefined);

  constructor() {
    // Placeholder endpoint — swap for the real apiBaseUrl/path once known, see public/config.json.
    this.api.fetch('/todos/1').subscribe((response) => this.data.set(response));
  }
}
