<template>
  <q-card-section>
    <q-table
      :title="title"
      :columns="columns"
      :rows="data"
      row-key="name"
      class="base-table full-width"
      flat
      hide-bottom
      virtual-scroll
      :rows-per-page="10"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <th
            v-for="col in props.cols"
            :key="col.name"
            :class="[col.__thClass, 'base-th']"
            @click="props.sort(col.name)"
          >
            <div class="base-th-content">
              <span>{{ col.label }}</span>
              <q-icon
                v-if="col.sortable"
                :class="['base-th-sort-icon', col.__iconClass]"
                :name="sortIconName"
              />
            </div>
          </th>
        </q-tr>
      </template>
    </q-table>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { useQuasar } from "quasar";

type TableColumn = {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: string | ((row: any) => any);
  required?: boolean;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sort?: (a: any, b: any, rowA: any, rowB: any) => number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: (val: any, row: any) => any;
  classes?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: string | ((row: any) => string);
  headerClasses?: string;
};

export default defineComponent({
  name: "BaseTable",

  props: {
    title: {
      type: String,
      required: false,
    },
    columns: {
      type: Array as PropType<TableColumn[]>,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },

  computed: {
    sortIconName() {
      const $q = useQuasar();
      return $q.iconSet.table.arrowUp;
    },
  },
});
</script>

<style scoped>
:deep(.base-table thead th.base-th) {
  position: relative;
}

:deep(.base-table .base-th-content) {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: fit-content;
  white-space: nowrap;
}

:deep(.base-table .base-th-sort-icon) {
  position: absolute;
  right: -1.1em;
  margin: 0 !important;
}

:deep(.base-table .q-table__title) {
  font-size: 2rem;
  font-weight: 600;
}

:deep(.base-table thead th) {
  font-size: 1.3rem;
  font-weight: 600;
}

:deep(.base-table tbody td) {
  font-size: 1.2rem;
  padding: 16px 8px;
}
</style>
