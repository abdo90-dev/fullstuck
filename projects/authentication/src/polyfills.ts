/***************************************************************************************************
 * BROWSER POLYFILLS
 */

// IE9, IE10, and IE11 require all of the following polyfills.
import 'core-js/es/object';
import 'core-js/es/array';
import 'core-js/es/string';

// IE10 and IE11 require the following for NgClass support on SVG elements.
import 'classlist.js';  // Run `npm install classlist.js`.

// Evergreen browsers require these.
import 'core-js/es/reflect';
import 'core-js/es/regexp';

// Zone JS is required by Angular itself.
import 'zone.js/dist/zone';  // Included with Angular CLI.

/***************************************************************************************************
 * APPLICATION POLYFILLS
 */

// Add your application-specific polyfills here.

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone';  // Included with Angular CLI.
(window as any).process = { env: { DEBUG: undefined }, };