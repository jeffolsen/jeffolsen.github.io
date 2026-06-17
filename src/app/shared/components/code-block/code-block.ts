import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-code-block',
  imports: [],
  templateUrl: './code-block.html',
})
export class CodeBlock {
  readonly data = input<unknown>();
  readonly label = input<string>();

  protected readonly formatted = computed(() => JSON.stringify(this.data(), null, 2) ?? '');
}
