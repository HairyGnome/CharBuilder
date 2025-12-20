import type { BaseScraper } from './BaseScraper';
import { WeaponScraper } from './WeaponScraper';

const scrapers: BaseScraper[] = [new WeaponScraper()];

for (const scraper of scrapers) {
  await scraper.run();
}
