<template>
  <transition name="fade">
    <v-alert v-show="visible" v-bind="$attrs" v-on="listeners">
      <slot></slot>
    </v-alert>
  </transition>
</template>

<script>
export default {
  inheritAttrs: true,
  data() {
    return {
      visible: true,
      timer: null
    };
  },
  props: {
    duration: {
      required: true,
      type: Number
    }
  },
  methods: {
    fade() {
      let value = parseInt(Math.max(this.duration, 0));
      if (value != 0)
        this.timer = setTimeout(() => (this.visible = false), 1000 * value);
    }
  },
  mounted() {
    this.fade();
  }
};
</script>