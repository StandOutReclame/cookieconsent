<template>
    <div class="cookieconsent">
        <CookiePopup
            @save="saveModal"
            @hide="hideSettings"
            :popupVisible="popupVisible"
            :cookieModal="cookieModal"
            v-if="popupVisible" />
        <CookieBar
            @hide="hideCookiebar"
            @showSettings="showSettings"
            @allow="allowAll"
            v-if="cookiebarVisible" />
    </div>
</template>

<script>
import CookieBar from './components/CookieBar.vue';
import CookiePopup from './components/CookiePopup.vue';
import Cookie from './libraries/cookie';
import './assets/scss/main.scss';

export default {
    name: 'app',
    components: {
        CookieBar,
        CookiePopup,
    },
    data() {
        return {
            cookiebarVisible: true,
            popupVisible: false,
            scrollTop: null,
            cookieModal: {
                marketing: false,
                statistics: false,
                preferences: true,
                essential: true,
            },
            tagmanagerActive: false,
            tagmanagerInterval: null,
        };
    },
    mounted() {
        this.detectOldCookiebot();

        const cookies = Cookie.get('CookieConsent', JSON);

        if (cookies) {
            this.cookieModal = Object.assign({}, this.cookieModal, cookies);
            this.cookiebarVisible = false;

            this.triggerCookieSettingsChange();
        }

        window.showCookieSettings = () => {
            this.showSettings();
        };

        this.escapeEvent();
    },
    methods: {
        escapeEvent() {
            window.addEventListener('keydown', (e) => {
                if (e.keyCode === 27) {
                    this.hideSettings();
                }
            });
        },
        getScrollTop() {
            return (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0);
        },
        detectOldCookiebot() {
            const cookie = Cookie.get('CookieConsent', String);

            if (cookie && cookie.indexOf('{stamp:') !== -1) {
                Cookie.delete('CookieConsent');
            }
        },
        hideCookiebar() {
            this.cookiebarVisible = false;
        },
        showSettings() {
            this.popupVisible = true;
        },
        hideSettings() {
            this.popupVisible = false;
        },
        saveModal(modal) {
            this.cookieModal = Object.assign({}, this.cookieModal, modal);
            this.savePreferences();
            this.hideSettings();
            this.hideCookiebar();
            this.triggerCookieSettingsChange();
        },
        allowAll() {
            Object.keys(this.cookieModal).forEach((key) => {
                this.cookieModal[key] = true;
            });

            this.savePreferences();
            this.hideSettings();
            this.hideCookiebar();
            this.triggerCookieSettingsChange();
        },
        savePreferences() {
            Cookie.set('CookieConsent', {
                value: this.cookieModal,
            });
        },
        triggerCookieSettingsChange() {
            if (!window.Cookieconsent) {
                window.Cookieconsent = {};
            }

            Object.keys(this.cookieModal).forEach((key) => {
                const categoryValue = this.cookieModal[key];

                window.Cookieconsent[key] = categoryValue;

                if (categoryValue === true) {
                    document.querySelector('body').classList.add(`cookieconsent-${key}-ok`);

                    const $iframeElements = document.querySelectorAll(`[cookieconsent="${key}"]`);

                    if ($iframeElements) {
                        [].forEach.call($iframeElements, ($iframeElement) => {
                            const src = $iframeElement.getAttribute('data-src');

                            if (src) {
                                $iframeElement.setAttribute('src', src);
                            }
                        });
                    }
                }
            });

            this.tagmanagerInterval = setInterval(() => {
                if (typeof window.CookieconsentCallback === 'function') {
                    clearInterval(this.tagmanagerInterval);
                    window.CookieconsentCallback(this.cookieModal);
                }
            }, 10);

            window.dispatchEvent(new CustomEvent('cookieconsent_change', {
                detail: {
                    ...this.cookieModal,
                },
            }));
        },
    },
};
</script>
