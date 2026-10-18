import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SummaryMetric } from '@stt/features/dashboard/model';
import { icons } from '@stt/shared/icon/model';
import { Dashboard } from './dashboard';

type YearlyMetric = SummaryMetric['currentYear'];

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
});
