import { boot } from 'quasar/wrappers';
import { useDataStore } from 'src/stores/data-store';
import classData from 'src/data/classes.json';
import ancestryData from 'src/data/ancestries.json';
import lineageData from 'src/data/lineages.json';
import regionData from 'src/data/regions.json';
import weaponData from 'src/data/weapons.json';
import hyperlinks from 'src/data/hyperlinks.json';

export default boot(() => {
  const dataStore = useDataStore();

  dataStore.setClasses(classData);
  dataStore.setAncestries(ancestryData);
  dataStore.setLineages(lineageData);
  dataStore.setRegions(regionData);
  dataStore.setWeapons(weaponData);
  dataStore.setHyperlinks(hyperlinks);
});
