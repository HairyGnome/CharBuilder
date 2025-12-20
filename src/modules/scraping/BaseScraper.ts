export abstract class BaseScraper {
  url = 'https://balint0928.github.io/quartz/Core-Rules';
  folder = '';

  abstract run(): Promise<void>;
}
