<template>
  <q-card-section>
    <q-table
      :title="title"
      :columns="columns"
      :rows="filteredData"
      row-key="name"
      class="base-table full-width"
      flat
      hide-bottom
      virtual-scroll
      :rows-per-page="10"
    >
      <template v-slot:top-right>
        <div class="row" v-if="hasFilters">
          <q-btn size="md" flat icon="mdi-filter">
            <q-menu v-model="showFilter">
              <q-card flat bordered>
                <q-card-section class="row items-center justify-between">
                  <div class="text-h6">Filters</div>
                  <q-btn icon="close" flat dense @click="closeFilter" />
                </q-card-section>
                <q-card-section class="row justify-evenly q-gutter-y-md q-col-gutter-x-md">
                  <q-input
                    v-model="searchTerm"
                    class="col-12"
                    dense
                    outlined
                    placeholder="Search..."
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                  <q-select
                    v-for="(filter, idx) in selectFilters"
                    v-model="selectedFilters[filter]"
                    :key="idx"
                    :label="filter.unslugify().capitalize()"
                    :options="filterOptions[filter]"
                    dense
                    outlined
                    class="col-6"
                  />
                  <div class="col-12 row justify-end">
                    <q-btn color="primary" label="Reset" @click="resetFilters" />
                  </div>
                </q-card-section>
              </q-card>
            </q-menu>
          </q-btn>
        </div>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <th
            v-for="col in props.cols"
            :key="col.name"
            :class="[col.__thClass, 'base-th']"
            :style="{ width: `${100 / props.cols.length}%` }"
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
      type: Array as PropType<unknown[]>,
      required: true,
    },
    searchFilters: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => [],
    },
    selectFilters: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => [],
    },
  },

  data() {
    return {
      showFilter: false,
      searchTerm: "",
      selectedFilters: {} as Record<string, unknown>,
    };
  },

  computed: {
    sortIconName(): string {
      const $q = useQuasar();
      return $q.iconSet.table.arrowUp;
    },
    hasFilters(): boolean {
      return this.searchFilters.length > 0 || this.selectFilters.length > 0;
    },

    filteredData(): unknown[] {
      if (!this.searchTerm) {
        return this.data;
      }
      const lowerSearchTerm = this.searchTerm.toLowerCase();
      const searchableColumns = this.searchFilters.length
        ? this.columns.filter((col) => this.searchFilters.includes(col.name))
        : this.columns;
      const filteredData = this.data.filter((row) =>
        searchableColumns.some((col) => {
          const value =
            typeof col.field === "function"
              ? col.field(row)
              : (row as Record<string, unknown>)[col.field];
          return String(value).toLowerCase().includes(lowerSearchTerm);
        }),
      );
      return filteredData;
    },

    filterOptions(): Record<string, unknown[]> {
      const options: Record<string, unknown[]> = {};
      this.selectFilters.forEach((filter) => {
        options[filter] = Array.from(
          new Set(
            this.data.map((row) => {
              const col = this.columns.find((c) => c.name === filter);
              if (!col) return null;
              return typeof col.field === "function"
                ? col.field(row)
                : (row as Record<string, unknown>)[col.field];
            }),
          ),
        );
      });
      return options;
    },
  },

  methods: {
    openFilter() {
      console.log("Opening filter");
      this.showFilter = true;
    },
    closeFilter() {
      this.showFilter = false;
    },

    resetFilters() {
      this.searchTerm = "";
      this.selectedFilters = {};
    },
  },
});
</script>

<style scoped>
:deep(.base-table) {
  table-layout: fixed;
}

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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.filter-card {
  position: absolute;
  top: 70%;
  right: 0;
  z-index: 10;
}
</style>
