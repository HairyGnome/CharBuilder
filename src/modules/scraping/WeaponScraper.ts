import type { DamageTypes, WeaponData } from 'src/models/weapon_types';
import { BaseScraper } from './BaseScraper';
import { parseHTML } from 'linkedom';
import { writeFile } from 'fs/promises';
import { join } from 'path';

// Slugify helper function for Node.js environment
const slugify = (text: string): string => text.replaceAll(' ', '_');

export class WeaponScraper extends BaseScraper {
  override folder = '/f_Equipment/Weapons-and-Masteries';

  override async run(): Promise<void> {
    console.log('Gathering weapon data...');
    const weapons: WeaponData[] = [];

    const response = await fetch(this.url + this.folder);

    if (!response.ok) {
      throw new Error(`Failed to fetch weapons page: ${response.statusText}`);
    }

    const html = await response.text();
    const { document } = parseHTML(html);

    const weaponElements = document.querySelectorAll('tbody > tr');

    for (const weapon of weaponElements) {
      const name = slugify(
        weapon.querySelector('td:nth-child(1)')?.textContent?.trim().toLowerCase() ??
          'unknown_weapon',
      );
      // Damage format is special for these weapons
      // Need to handle these cases separately
      if (
        name.toLowerCase() === 'blowgun' ||
        name.toLowerCase() === 'net' ||
        name.toLowerCase() === 'cestus'
      )
        continue;
      const damageText = weapon.querySelector('td:nth-child(2)')?.textContent?.trim() ?? '0';
      const [amount, type] = damageText.split(' ');
      const splitAmount = amount?.split('d') ?? [];
      if (splitAmount.length !== 2) throw new Error(`Invalid damage format for weapon ${name}`);
      const dieCount = parseInt(splitAmount[0] ?? '0', 10);
      const dieSides = parseInt(splitAmount[1] ?? '4', 10);
      const die = { amount: dieCount, type: dieSides };
      const bulkText = weapon.querySelector('td:nth-child(3)')?.textContent?.trim() ?? '0';
      const bulk = bulkText === 'L' ? 0.1 : parseInt(bulkText, 10);
      const propertiesText = weapon.querySelector('td:nth-child(4)')?.textContent?.trim() ?? '';
      const properties = propertiesText.split(',').map((prop: string) => prop.trim());
      const heftText = weapon.querySelector('td:nth-child(5)')?.textContent?.trim() ?? '0';
      const heft = heftText === '-' ? 0 : parseInt(heftText, 10);
      const special = slugify(
        weapon.querySelector('td:nth-child(6)')?.textContent?.trim().toLowerCase() ?? '',
      );
      const mastery = slugify(
        weapon.querySelector('td:nth-child(7)')?.textContent?.trim().toLowerCase() ?? '',
      );

      weapons.push({
        name,
        damage: {
          amount: die,
          type: type?.toLowerCase() as DamageTypes,
        },
        bulk,
        properties,
        heft,
        special,
        mastery,
      });
    }
    const outputPath = join(process.cwd(), 'src', 'data', 'weapons.json');
    await writeFile(outputPath, JSON.stringify(weapons, null, 2), 'utf-8');
    console.log(`Saved ${weapons.length} weapons to ${outputPath}`);
  }
}
