<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>pm2 Monitoring</h1>
      </b-col>
      <b-col>
        <b-spinner
          v-show="$fetchState.pending"
          variant="primary"
          label="Spinning"
        ></b-spinner>
      </b-col>
    </b-row>

    <b-row>
      <b-tabs content-class="mt-3">
        <b-tab v-for="server in servers" :key="server.id" :title="server.name">
          <b-card-group deck :columns="true">
            <b-card
              v-for="process in server.processes"
              :key="process.id"
              :header="process.name"
              class="mb-3"
              style="min-width: 18rem;"
              :header-bg-variant="
                process.status === 'online' ? 'success' : 'danger'
              "
              header-text-variant="white"
            >
              <b-card-text class="mb-2">
                <b-list-group>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center p-2"
                  >
                    Status
                    <b-badge variant="primary">{{ process.status }}</b-badge>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center p-2"
                  >
                    Mode
                    <b-badge variant="primary">{{ process.mode }}</b-badge>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center p-2"
                  >
                    Aktualizováno
                    <b-badge variant="primary" class="ml-3">
                      {{
                        $moment(process.timestamp).format('Y-MM-DD HH:mm:ss')
                      }}
                    </b-badge>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center p-2"
                  >
                    Počet instancí
                    <b-badge variant="primary">{{ process.instances }}</b-badge>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center p-2"
                  >
                    Poslední restart
                    <b-badge variant="primary">
                      {{
                        $moment()
                          .subtract(process.runningFor, 'milliseconds')
                          .fromNow()
                      }}
                    </b-badge>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center p-2"
                  >
                    Počet restartů
                    <b-badge variant="primary">{{ process.restart }}</b-badge>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center p-2"
                  >
                    CPU vytížení
                    <b-badge variant="primary">{{ process.cpu }}</b-badge>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center p-2"
                  >
                    Paměť
                    <b-badge variant="primary">
                      {{ readableBytes(process.memory) }}
                    </b-badge>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center p-2"
                  >
                    Latence:
                    <b-badge v-show="process.httpMeanLatency" variant="primary">
                      {{ process.httpMeanLatency }} ms
                    </b-badge>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center p-2"
                  >
                    Requesty:
                    <b-badge
                      v-show="process.requestsPerMinute"
                      variant="primary"
                    >
                      {{ process.requestsPerMinute }} reg/min
                    </b-badge>
                  </b-list-group-item>
                </b-list-group>
              </b-card-text>
            </b-card>
          </b-card-group>
        </b-tab>
      </b-tabs>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async fetch() {
    this.servers = await this.$axios.$get(
      'http://localhost:3000/servers/process-list'
    )
  },
  data() {
    return {
      servers: []
    }
  },
  mounted(): void {
    setInterval(() => {
      this.$fetch()
    }, 5000)
  },
  methods: {
    readableBytes(bytes: number) {
      if (bytes === 0) {
        return '0 MB'
      }

      const i: number = Math.floor(Math.log(bytes) / Math.log(1024))
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

      return parseFloat((bytes / 1024 ** i).toFixed(2)) * 1 + ' ' + sizes[i]
    }
  },
  fetchOnServer: false
})
</script>

<style></style>
