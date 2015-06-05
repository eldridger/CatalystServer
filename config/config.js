import _ from 'lodash';

import dev from './development.js';
import prod from './production.js';
import def from './default.js';

export default {
    development: _.extend(def, dev),
    production: _.extend(def, prod)
}