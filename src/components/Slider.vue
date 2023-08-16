<script setup>
  import { computed, ref } from 'vue'
  import * as utils from '@/utils/utils.js'

  const props = defineProps({
    type: {
      type: String,
      default: ''
    },
    min: {
      type: String,
      default: '0'
    },
    max: {
      type: String,
      default: '100'
    },
    value: {
      type: String,
      default: '0'
    },
    step: {
      type: String,
      default: '1'
    },
    label: {
      type: String,
      default: 'slider'
    }
  })
  const emit = defineEmits(['updateValue'])
  const updateValue = (value) => {
    if (value < props.min) {
      value = props.min
    }
    else if (value > props.max) {
      value = props.max
    }

    emit('updateValue', value)
  }

  const rangeValues = computed(() => {
    switch(props.type) {
      case 'time':
        return {min: utils.getTimeInMinutes(props.value), max: utils.getTimeInMinutes(props.max)}
      default:
        return {min: `${props.min}%`, max: `${props.max}%`}
    }
  })

  const sliderToggle = ref(null)
  const mouseMove = ref(null) // in percent (0.12 example)
  const sliderInput = ref(null)

  const sliderToggleMove = computed(() => {
    if (mouseMove.value || mouseMove.value === 0) {
      return mouseMove.value * utils.percentValue
    }
    return ((utils.getValueFromPercents(props.value, utils.percentValue)) / props.max)
  })

  const stopToggleMove = () => {
    sliderInput.value.removeEventListener('mousemove', onMouseMove)
    sliderInput.value.removeEventListener('mouseup', onMouseUp)
    sliderInput.value.removeEventListener('mouseleave', onMouseLeave)
    updateValue(utils.getValueFromPercents(props.max, mouseMove.value))
    setTimeout(() => mouseMove.value = null, 4);
  }

  const setSliderTogglePosition = (mousePosition) => {
    const sliderInputWidth = sliderInput.value.getBoundingClientRect().width
    const sliderInputPosition = sliderInput.value.getBoundingClientRect().x
    const curPosition = (mousePosition - sliderInputPosition) / sliderInputWidth

    if (curPosition > 1) {
      mouseMove.value = 1
      return
    }
    else if (curPosition < 0) {
      mouseMove.value = 0
      return
    }

    mouseMove.value = curPosition
  }

  const onMouseMove = (event) => {
    setSliderTogglePosition(event.pageX)
  }
  const onMouseUp = (event) => {
    stopToggleMove(event)
  }
  const onMouseLeave = (event) => {
    stopToggleMove(event)
  }
  
  const moveSliderToggle = (event) => {
    setSliderTogglePosition(event.pageX)
    sliderInput.value.addEventListener('mousemove', onMouseMove)
    sliderInput.value.addEventListener('mouseup', onMouseUp)
    sliderInput.value.addEventListener('mouseleave', onMouseLeave)
  }

  const onKeyUpRight = () => {
    updateValue(parseInt(props.value) + utils.getValueFromPercents(parseInt(props.max), 0.05)) // 
  }
  const onKeyUpLeft = () => {
    updateValue(parseInt(props.value) - utils.getValueFromPercents(parseInt(props.max), 0.05))
  }
</script>

<template>
  <div class="slider">
    <div
      @keyup.left="onKeyUpLeft"
      @keyup.right="onKeyUpRight"
      @mousedown="moveSliderToggle"
      class="slider__input"
      ref="sliderInput"
      tabindex="0"
      :aria-label="label"
      >
      <span class="slider__toggle" :style="{left: `${sliderToggleMove}%`}" ref="sliderToggle"></span>
      <div class="slider__track"></div>
    </div>
    <span class="slider__min-value">{{ rangeValues.min }}</span>
    <span class="slider__max-value">{{ rangeValues.max }}</span>
  </div>
</template>

<style lang="scss" scoped>
  .slider {
    display: grid;
    grid-template-columns: auto 1fr auto;

    font-size: 12px;
  }
  .slider__input {
    grid-column: 1 / -1;
    display: flex;
    position: relative;
    padding: 10px 0;
    cursor: pointer;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 8px;
      background-image: linear-gradient(to right, $main-gradient);
      filter: blur(5px);
      transform: translateY(-50%);
      opacity: 0;

      transition: opacity 0.2s ease;
    }
    @include mix.hover {
      &:before {
        opacity: 0.2;
      }
    }
  }
  .slider__toggle {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #FFFFFF;
    transform: translateX(-50%) translateY(25%);
    transition: left 0.05s linear;
  }
  .slider__track {
    margin: 0;
    flex-grow: 1;
    height: 5px;
    cursor: pointer;
    border-radius: 2.5px;
    position: relative;
    background: linear-gradient(90deg, $main-gradient);
  }
  .slider__max-value {
    grid-column: 3 / 4;
  }
</style>