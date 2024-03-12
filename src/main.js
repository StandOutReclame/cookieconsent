import 'custom-event-polyfill/polyfill';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(VueI18n);

export default class Cookieconsent {
    constructor(options) {
        Vue.prototype.cookieconsent = Object.assign({
            styleType: 'push-down',
            showbar: true,
            cookieConsentTypes: ['marketing', 'statistics', 'preferences', 'essential'],
            autoConsent: [], // 'scroll', 'pageload'
            language: 'nl',
            messages: {
                en: require('./translations/en').default,
                nl: require('./translations/nl').default,
            },
        }, options);

        const i18n = new VueI18n({
            locale: Vue.prototype.cookieconsent.language, // set locale
            messages: Vue.prototype.cookieconsent.messages, // set locale messages
        });

        new Vue({
            i18n,
            render: h => h(App),
        }).$mount('#cookieconsent');
    }
}
