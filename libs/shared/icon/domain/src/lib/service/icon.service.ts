import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { icons, IconType } from '@stt/shared/icon/model';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  readonly #matIconRegistry = inject(MatIconRegistry);

  readonly #domSanitizer = inject(DomSanitizer);

  init(): void {
    icons.forEach((i) => this.registerSvgIcon(i, `icons/${i}.svg`));
  }

  private registerSvgIcon(key: IconType, url: string): void {
    this.#matIconRegistry.addSvgIcon(
      key,
      this.#domSanitizer.bypassSecurityTrustResourceUrl(url),
    );
  }
}
