<template>
    <div class="cookieconsent__cookiebar" :class="cookiebarPosition">
        <div class="cookieconsent__cookiebar__inner">
            <div class="cookieconsent__cookiebar__description">
                {{ $t('cookiebar.description') }}
            </div>

            <div class="cookieconsent__cookiebar__buttons">
                <a
                    href="#"
                    @click.prevent="showSettings"
                    class="cookieconsent__cookiebar__link">
                        {{ $t('cookiebar.settings') }}
                </a>

                <button
                    @click="accept"
                    class="cookieconsent__button
                    cookieconsent__button--accept
                    cookieconsent__cookiebar__button"
                >
                    {{ $t('cookiebar.accept') }}
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        cookiebarPosition() {
            return `cookieconsent__cookiebar--${this.cookieconsent.styleType}`;
        },
    },
    methods: {
        accept() {
            this.$emit('allow');
        },
        showSettings() {
            this.$emit('showSettings');
        },
        hide() {
            this.$emit('hide');
        },
    },
};
</script>
