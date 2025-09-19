import { boot } from 'quasar/wrappers';
import { useDataStore } from 'src/stores/data-store';
import classData from 'src/data/classes.json';

export default boot(() => {
  const dataStore = useDataStore();

  dataStore.setClasses(classData);
});
