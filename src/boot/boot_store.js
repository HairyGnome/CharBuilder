import { boot } from 'quasar/wrappers';
import { useDataStore } from 'src/stores/data-store';
import classData from 'src/data/classes.json';
import ancestryData from 'src/data/ancestries.json';
import weaponData from 'src/data/weapons.json';

export default boot(() => {
  const dataStore = useDataStore();

  dataStore.setClasses(classData);
  dataStore.setAncestries(ancestryData);
  dataStore.setWeapons(weaponData);
});
