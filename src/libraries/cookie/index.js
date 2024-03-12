export default {
    set(name, data = {}) {
        const cookieData = Object.assign({
            expiration: 365, // in days
            domain: this.getCookieDomain(),
            path: '/',
        }, data);

        const date = new Date();
        date.setTime(date.getTime() + (cookieData.expiration * 24 * 60 * 60 * 1000));

        if (typeof cookieData.value === 'object') {
            cookieData.value = JSON.stringify(cookieData.value);
        }

        document.cookie = `${name}=${cookieData.value};expires=${date.toUTCString()};path=${cookieData.path};domain=${cookieData.domain};`;
    },

    get(name, dataType) {
        const cookieString = `${name}=`;
        const ca = document.cookie.split(';');

        for (let i = 0; i < ca.length; i += 1) {
            let c = ca[i];

            while (c.charAt(0) === ' ') c = c.substring(1);

            if (c.indexOf(cookieString) !== -1) {
                let cookieValue = c.substring(cookieString.length, c.length);

                const nrOfSplits = ((cookieValue.match(/\|\|/g) || []).length);

                if (nrOfSplits > 0) {
                    cookieValue = cookieValue.split('||');
                }

                switch (dataType) {
                case Number:
                    cookieValue = parseFloat(cookieValue);
                    break;
                case Boolean:
                    cookieValue = !!cookieValue;
                    break;
                case JSON:
                    cookieValue = JSON.parse(cookieValue);
                    break;
                default:
                    cookieValue = cookieValue.toString();
                    break;
                }


                return cookieValue;
            }
        }

        return null;
    },

    delete(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;`;
    },

    getCookieDomain() {
        let domain = '';
        const hostnameArray = window.location.hostname.split('.').reverse();

        if (hostnameArray[1] && hostnameArray[0]) {
            domain += `.${hostnameArray[1]}`;
            domain += `.${hostnameArray[0]}`;
        } else {
            domain = `${hostnameArray[0]}`;
        }

        return domain;
    },
};
