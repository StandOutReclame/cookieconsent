# Cookieconsent    
----
## installation

Install npm package

````javascript
// npm way
npm install @strunkie/cookieconsent
	
// yarn way
yarn add @strunkie/cookieconsent
````

in project

````javascript
/* es module */
import Cookieconsent from '@strunkie/cookieconsent';
/* or */
const Cookieconsent = require('@strunkie/cookieconsent');
````

````html
<!-- native -->
<script src="/node_modules/@strunkie/cookieconsent/dist/js/cookieconsent.js"></script>
<link rel="stylesheet" href="/node_modules/@strunkie/cookieconsent/dist/js/cookieconsent.css">
````

## Constructor

````javascript
new Cookieconsent($element, options);
````

### $element
- Type: ````String```` or ````DOM element````
- Default: ````#cookieconsent````

### options
see options

## options

### styleType
- Type: ````String````
- Default: ````push-down````
- Options
	- ````push-down```` 
	- ````fixed-top```` stick to the window top
	- ````fixed-bottom```` stick to the window bottom

### autoConsent
- Type: ````Array````
- Default: ````[]````
- Options
    - ````pageload```` Accept cookies after pageload. Cookies are set when user refresh page
    - ````scroll```` Accept cookies on scroll

### language
- Type: ````String````
- Default: ````en````
- options
	- ````en````
	- ````nl````

### cookieConsentTypes
- Type: ````Array````
- Default: ````['marketing', 'statistics', 'essential']````
- Options: 
	- ````Marketing```` marketing cookies
	- ````statistics```` statistics cookies
	- ````essential```` essential cookies, always enabled

### messages
- Type: ````Object````
- Default: -
- Options: See ````examples/translations/en.js````

## functions

### showCookieSettings()
Reopen cookie popup

````html
<a href="javascript:showCookieSettings()">Show cookie settings</a>
````

## Events
### cookieconsent_change
Cookie preferences changed.

example:

````javascript
window.addEventListener('cookieconsent_change');
````


## Tagmanager implementation

Create in tagmanager a new tag and trigger this one on pageload

````javascript
<script>
function CookieconsentCallback(CookieConsent) {
    if (CookieConsent.preferences) {
        dataLayer.push({'event':'cookieconsent_preferences'});
    }
    if (CookieConsent.statistics) {
        dataLayer.push({'event':'cookieconsent_statistics'});
    }
    if (CookieConsent.marketing) {
        dataLayer.push({'event':'cookieconsent_marketing'});
    }
}
</script>
````

## tagmanager configuration

### tags

#### tags with event trigger
Use for tags with an event trigger the following configuration:

#### tags with page trigger
Use for tags with a page trigger the following configuration:


### variables

Create for every cookieconsent type a new variable in tagmanager, replace marketing with:
````preferences```` ````marketing```` ````statistics````

````javascript
function() {
  return Cookieconsent.marketing.toString()
}
````

And save them as:
````Cookieconsent.preferences```` ````Cookieconsent.marketing```` ````Cookieconsent.statistics````