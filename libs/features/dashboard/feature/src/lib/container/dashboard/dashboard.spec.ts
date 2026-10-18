import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SummaryMetric, YearlyMetric } from '@stt/features/dashboard/model';
import { icons } from '@stt/shared/icon/model';
import { Dashboard } from './dashboard';

const SUMMARY_URL = 'api/v1/metrics/summary';

/** A summary response; override only the fields a test cares about. */
const summaryMetric = (
  overrides: {
    currentYear?: Partial<YearlyMetric>;
    previousYear?: Partial<YearlyMetric>;
  } = {},
): SummaryMetric => ({
  currentYear: {
    year: 2026,
    totalPeopleTrainingRequirementReached: 7,
    totalPeopleTrainingRequirementAlmostReached: 3,
    totalTrainings: 42,
    averageParticipants: 8.5,
    ...overrides.currentYear,
  },
  previousYear: {
    year: 2025,
    totalPeopleTrainingRequirementReached: 5,
    totalPeopleTrainingRequirementAlmostReached: 4,
    totalTrainings: 38,
    averageParticipants: 7.2,
    ...overrides.previousYear,
  },
});

describe('Dashboard', () => {
  let fixture: ComponentFixture<Dashboard>;
  let httpTesting: HttpTestingController;

  /** Renders the dashboard and answers its summary request with `summary`. */
  const renderDashboard = async (
    summary: SummaryMetric = summaryMetric(),
  ): Promise<HTMLElement> => {
    fixture = TestBed.createComponent(Dashboard);
    fixture.detectChanges();
    flushSummary(summary);
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  };

  const flushSummary = (summary: SummaryMetric) =>
    httpTesting.expectOne(SUMMARY_URL).flush(summary);

  const text = (element: Element | null | undefined): string =>
    element?.textContent?.replace(/\s+/g, ' ').trim() ?? '';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);

    // The app loads its SVG icons over HTTP at startup; register empty ones
    // so that only the metrics API goes through the HTTP mock.
    const iconRegistry = TestBed.inject(MatIconRegistry);
    const sanitizer = TestBed.inject(DomSanitizer);
    icons.forEach((icon) =>
      iconRegistry.addSvgIconLiteral(
        icon,
        sanitizer.bypassSecurityTrustHtml('<svg></svg>'),
      ),
    );
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('shows the page title and subtitle', async () => {
    const page = await renderDashboard();

    const pageTitle = page.querySelector('stt-page-title');
    expect(text(pageTitle?.querySelector('h1'))).toBe('Dashboard');
    expect(text(pageTitle)).toContain(
      'Overview of all trainings and requirements',
    );
  });

  it('renders the current year first and the previous year second', async () => {
    const page = await renderDashboard(
      summaryMetric({
        currentYear: { year: 2031 },
        previousYear: { year: 2030 },
      }),
    );

    const yearGroups = page.querySelectorAll('stt-yearly-metric-group');
    expect(yearGroups).toHaveLength(2);
    expect(text(yearGroups[0])).toContain('2031');
    expect(text(yearGroups[1])).toContain('2030');
  });

  describe('training requirement tile', () => {
    const requirementTiles = (page: HTMLElement) =>
      page.querySelectorAll('stt-training-requirement-metric-tile');

    /** The element's text nodes in reading order, separated by spaces. */
    const spacedText = (element: Element): string => {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const parts: string[] = [];
      while (walker.nextNode()) {
        const part = walker.currentNode.textContent?.trim();
        if (part) parts.push(part);
      }
      return parts.join(' ').replace(/\s+/g, ' ');
    };

    it('shows the title, subtitle and details cue', async () => {
      const page = await renderDashboard();

      const tile = text(requirementTiles(page)[0]);
      expect(tile).toContain('Training Requirement');
      expect(tile).toContain(
        'Status of reached and almost reached requirements',
      );
      expect(tile).toContain('Details');
    });

    it('shows the Reached and Almost Reached counts of each year', async () => {
      const page = await renderDashboard(
        summaryMetric({
          currentYear: {
            totalPeopleTrainingRequirementReached: 11,
            totalPeopleTrainingRequirementAlmostReached: 6,
          },
          previousYear: {
            totalPeopleTrainingRequirementReached: 9,
            totalPeopleTrainingRequirementAlmostReached: 2,
          },
        }),
      );

      const [currentYearTile, previousYearTile] = requirementTiles(page);
      expect(spacedText(currentYearTile)).toContain(
        '11 Reached 6 Almost Reached',
      );
      expect(spacedText(previousYearTile)).toContain(
        '9 Reached 2 Almost Reached',
      );
    });

    describe('navigation to the Training Requirement page', () => {
      let router: Router;

      beforeEach(() => {
        router = TestBed.inject(Router);
        router.resetConfig([
          { path: 'training-requirement', children: [] },
          { path: '**', children: [] },
        ]);
      });

      /** The tile's focusable click target. */
      const clickTarget = (tile: Element): HTMLElement => {
        const target = tile.querySelector<HTMLElement>('[tabindex="0"]');
        if (!target) throw new Error('The tile has no focusable target');
        return target;
      };

      const cases = [
        { yearGroup: 'current', index: 0 },
        { yearGroup: 'previous', index: 1 },
      ];

      it.each(cases)(
        'opens it for the $yearGroup year when the tile is clicked',
        async ({ yearGroup, index }) => {
          const page = await renderDashboard();

          clickTarget(requirementTiles(page)[index]).click();
          await fixture.whenStable();

          expect(router.url).toBe(`/training-requirement?year=${yearGroup}`);
        },
      );

      it.each(cases)(
        'opens it for the $yearGroup year when Enter is pressed on the focused tile',
        async ({ yearGroup, index }) => {
          const page = await renderDashboard();

          const target = clickTarget(requirementTiles(page)[index]);
          target.focus();
          target.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
          );
          await fixture.whenStable();

          expect(router.url).toBe(`/training-requirement?year=${yearGroup}`);
        },
      );
    });
  });

  describe('metric tiles', () => {
    /** The value shown on the metric tile titled `title` in each year group. */
    const metricValues = (page: HTMLElement, title: string): string[] =>
      Array.from(page.querySelectorAll('stt-yearly-metric-group')).map(
        (yearGroup) => {
          const tile = Array.from(
            yearGroup.querySelectorAll('stt-metric-tile'),
          ).find(
            (candidate) => text(candidate.querySelector('.title')) === title,
          );
          if (!tile) throw new Error(`No metric tile titled "${title}"`);
          return text(tile.querySelector('.value'));
        },
      );

    it('shows the average participants of each year', async () => {
      const page = await renderDashboard(
        summaryMetric({
          currentYear: { averageParticipants: 9.25 },
          previousYear: { averageParticipants: 6 },
        }),
      );

      expect(metricValues(page, 'Ø Participants')).toEqual(['9.3', '6']);
    });

    it('shows the Total Trainings of each year', async () => {
      const page = await renderDashboard(
        summaryMetric({
          currentYear: { totalTrainings: 57 },
          previousYear: { totalTrainings: 31 },
        }),
      );

      expect(metricValues(page, 'Total Trainings')).toEqual(['57', '31']);
    });
  });

  describe('year heading', () => {
    it('marks only the current year with the Current Year pill', async () => {
      const page = await renderDashboard();

      const [currentYear, previousYear] = Array.from(
        page.querySelectorAll('stt-yearly-metric-group'),
      );
      expect(text(currentYear)).toContain('Current Year');
      expect(text(previousYear)).not.toContain('Current Year');
    });

    it('shows the calendar year each year covers as dd.MM.yyyy', async () => {
      const page = await renderDashboard(
        summaryMetric({
          currentYear: { year: 2031 },
          previousYear: { year: 2030 },
        }),
      );

      const [currentYear, previousYear] = Array.from(
        page.querySelectorAll('stt-yearly-metric-group'),
      );
      expect(text(currentYear)).toContain('01.01.2031 – 31.12.2031');
      expect(text(previousYear)).toContain('01.01.2030 – 31.12.2030');
    });

    it('shows a calendar icon next to each date range', async () => {
      const page = await renderDashboard();

      const calendarIcons = page.querySelectorAll(
        'stt-yearly-metric-group mat-icon[data-mat-icon-name="calendar"]',
      );
      expect(calendarIcons).toHaveLength(2);
    });
  });
});
