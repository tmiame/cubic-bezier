import Vue from 'vue'
import { IStore } from '@/types'

declare module 'vue/types/vue' {
  interface Vue {
    $store: IStore
  }
}
