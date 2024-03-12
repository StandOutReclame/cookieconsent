<template>
    <button class="cookieconsent__tabs__tab" @click="setActiveContent" :class="{
        'cookieconsent__tabs__tab--active': isActive
    }">
        {{ title }}

        <div
            v-if="!hideToggleInfo"
            class="cookieconsent__dot"
            :class="{'cookieconsent__tabs__tab__dot--active': enabled}
        ">
            {{ onOff }}
        </div>
    </button>
</template>

<script>
export default {
    props: [
        'title',
        'activeName',
        'enabled',
        'hideToggleInfo',
    ],
    computed: {
        onOff() {
            return this.enabled ? this.$t('cookiepopup.on') : this.$t('cookiepopup.off');
        },
        isActive() {
            if (this.activeName === this.title) {
                return true;
            }

            return false;
        },
    },
    methods: {
        setActiveContent() {
            this.$emit('active', this.title);
        },
    },
};
</script>
