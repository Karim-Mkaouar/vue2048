import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import GameControls from '~/components/GameControls.vue'

describe('gameControls score tests', () => {
  it('score higher than 128 should be orange', () => {
    const wrapper = mount(GameControls, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
      props: {
        score: 130,
      },
    })

    const div = wrapper.get('[data-test="score"]').element
    expect(div.classList).toContain('text-orange-500')
  })

  it('score lower than 128 should be light', () => {
    const wrapper = mount(GameControls, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
      props: {
        score: 127,
      },
    })

    const div = wrapper.get('[data-test="score"]').element
    expect(div.classList).toContain('text-light-800')
  })
})
