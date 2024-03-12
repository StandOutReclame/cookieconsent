<template>
    <div class="cookieconsent__popup">
        <div class="cookieconsent__popup__background" @click="hide"></div>
        <div class="cookieconsent__popup__modal">
            <div class="cookieconsent__popup__title">
                {{ $t('cookiepopup.title') }}
            </div>

            <div class="cookieconsent__popup__wrapper">

                <div class="cookieconsent__tabs">
                    <Tab
                        ref="firstButton"
                        :title="$t('cookiepopup.tabs.why')"
                        :activeName="activeTab"
                        @active="(value) => activeTab = value"
                        :hideToggleInfo="true"
                        class="cookieconsent__textbold"
                    />

                    <Tab
                        :title="$t('cookiepopup.tabs.essential')"
                        :activeName="activeTab"
                        @active="(value) => activeTab = value"
                        :enabled="modal.essential"
                        v-if="checkEnabled('essential')"
                    />

                    <Tab
                        :title="$t('cookiepopup.tabs.preferences')"
                        :activeName="activeTab"
                        @active="(value) => activeTab = value"
                        :enabled="modal.preferences"
                        v-if="checkEnabled('preferences')"
                    />

                    <Tab
                        :title="$t('cookiepopup.tabs.statistics')"
                        :activeName="activeTab"
                        @active="(value) => activeTab = value"
                        :enabled="modal.statistics"
                        v-if="checkEnabled('statistics')"
                    />

                    <Tab :title="$t('cookiepopup.tabs.marketing')"
                        :activeName="activeTab"
                        @active="(value) => activeTab = value"
                        :enabled="modal.marketing"
                        v-if="checkEnabled('marketing')"
                    />
                </div>

                <div class="cookieconsent__content">
                    <Content
                        :title="$t('cookiepopup.tabs.why')"
                        :content="$t('cookiepopup.content.why')"
                        :activeName="activeTab"
                        @active="(value) => activeTab = value"
                        :hideToggleInfo="true"
                    />

                    <Content
                        :title="$t('cookiepopup.tabs.essential')"
                        :content="$t('cookiepopup.content.essential')"
                        :toggle="true"
                        :disabled="true"
                        :activeName="activeTab"
                        :model="modal.essential"
                        @active="(value) => activeTab = value"
                        v-if="checkEnabled('essential')"
                    />

                    <Content
                        :title="$t('cookiepopup.tabs.preferences')"
                        :content="$t('cookiepopup.content.preferences')"
                        :toggle="true"
                        :activeName="activeTab"
                        :model="modal.preferences"
                        @change="(value) => modal.preferences = value"
                        @active="(value) => activeTab = value"
                        v-if="checkEnabled('preferences')"
                    />

                    <Content
                        :title="$t('cookiepopup.tabs.statistics')"
                        :content="$t('cookiepopup.content.statistics')"
                        :toggle="true"
                        :activeName="activeTab"
                        :model="modal.statistics"
                        @change="(value) => modal.statistics = value"
                        @active="(value) => activeTab = value"
                        v-if="checkEnabled('statistics')"
                    />

                    <Content
                        :title="$t('cookiepopup.tabs.marketing')"
                        :content="$t('cookiepopup.content.marketing')"
                        :toggle="true"
                        :activeName="activeTab"
                        :model="modal.marketing"
                        @change="(value) => modal.marketing = value"
                        @active="(value) => activeTab = value"
                        v-if="checkEnabled('marketing')"
                    />
                </div>

                <div class="cookieconsent__popup__bottom">
                    <button
                        @click="save"
                        class="cookieconsent__button cookieconsent__button--refuse"
                    >
                        {{ $t('cookiepopup.save') }}
                    </button>
                    <button
                        @click="allowAll"
                        class="cookieconsent__button cookieconsent__button--accept"
                    >
                        {{ $t('cookiepopup.acceptAll') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import Cookie from '../libraries/cookie';
import Content from './Content.vue';
import Tab from './Tab.vue';

export default {
    props: ['cookieModal'],
    data() {
        return {
            activeTab: this.$t('cookiepopup.tabs.why'),
            modal: {},
        };
    },
    components: {
        Content,
        Tab,
    },
    created() {
        this.modal = Object.assign({}, this.modal, this.cookieModal);
    },
    mounted() {
        this.$refs.firstButton.$el.focus();
    },
    methods: {
        setActiveContent(value) {
            this.activeTab = value;
        },
        save() {
            this.$emit('save', this.modal);
        },
        allowAll() {
            Object.keys(this.modal).forEach((key) => {
                this.modal[key] = true;
            });

            this.save();
        },
        hide() {
            this.$emit('hide');
        },
        checkEnabled(type) {
            if (this.cookieconsent.cookieConsentTypes) {
                return this.cookieconsent.cookieConsentTypes.indexOf(type) !== -1;
            }

            return true;
        },
    },
};
</script>
