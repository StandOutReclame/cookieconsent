<template>
    <div
        class="cookieconsent__content__item"
        :class="{'cookieconsent__content__item--active': title == activeName}"
    >
        <div class="cookieconsent__content__top" @click="setActiveContent">
            <div
                v-if="!hideToggleInfo"
                class="cookieconsent__dot"
                :class="{'cookieconsent__tabs__tab__dot--active': enabled}
            ">
                {{ onOff }}
            </div>

            <div class="cookieconsent__content__top__title">
                {{ title }}
                <i class="cookieconsent__icon cookieconsent__icon--arrow-right"></i>
            </div>
        </div>

        <div class="cookieconsent__content__wrap">
            <div class="cookieconsent__content__text">
                <div v-html="content"></div>

                <div class="cookieconsent__content__check" v-if="toggle">
                    <label class="cookieconsent__checkbox" >
                        <input
                            type="checkbox"
                            class="cookieconsent__checkbox"
                            :disabled="disabled"
                            v-model="value"
                        >

                        <div class="cookieconsent__checkbox__slider">
                            <span class="cookieconsent__checkbox__slider__on">
                                {{ $t('cookiepopup.on') }}
                            </span>
                            <span class="cookieconsent__checkbox__slider__off">
                                {{ $t('cookiepopup.off') }}
                            </span>
                        </div>
                    </label>
                    <div
                        class="cookieconsent__alwayson"
                        v-if="disabled && value"
                    >
                        {{ $t('cookiepopup.alwaysOn') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'title',
        'content',
        'change',
        'toggle',
        'name',
        'activeName',
        'model',
        'disabled',
        'hideToggleInfo',
    ],
    computed: {
        isActive() {
            if (this.activeName === this.title) {
                return true;
            }

            return false;
        },
        onOff() {
            return this.model ? this.$t('cookiepopup.on') : this.$t('cookiepopup.off');
        },
        enabled() {
            return this.model;
        },
    },
    data() {
        return {
            visible: false,
            activeTab: 'whyCookies',
            value: false,
            mobileContentOpen: false,
        };
    },
    watch: {
        value() {
            this.$emit('change', this.value);
        },
    },
    created() {
        this.value = this.model;
    },
    methods: {
        setActiveContent() {
            this.$emit('active', this.title);
        },
    },
};
</script>
