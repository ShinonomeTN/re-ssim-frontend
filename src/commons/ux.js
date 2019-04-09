import Vue from "vue";

const defaultPosition = "top-right";

export default {
    toastDefault(text) {
        Vue.toasted.show(text, {
            theme: "outline",
            position: defaultPosition,
            duration: 2000,
            // fullWidth: true
        });
    },

    toastPrimary(text) {
        Vue.toasted.show(text, {
            theme: "primary",
            position: defaultPosition,
            duration: 2000,
            // fullWidth: true
        });
    },

    toastWarning(text) {
        Vue.toasted.show(text, {
            theme: "bubble",
            position: defaultPosition,
            duration: 2000,
            // fullWidth: true
        });
    },

    toastWithOptions(text, options) {
        Vue.toasted.show(text, options);
    },

    toast : Vue.toasted.show
}
