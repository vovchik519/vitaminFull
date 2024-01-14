'use strict';

/**
 * first-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::first-page.first-page');
