'use strict';

/**
 * poem-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::poem-page.poem-page');
