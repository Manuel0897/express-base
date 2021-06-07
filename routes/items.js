const express = require('express');
const ItemsServices = require('../services/items');
const joi = require('@hapi/joi');

const {
  itemIdSchema,
  createItemSchema,
  updateItemSchema
} = require('../utils/schemas/items');

const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require('../utils/constants/time');

function itemsApi(app) {
  const router = express.Router();
  app.use('/api/items', router);

  const itemsService = new ItemsServices();

  router.get('/', async function (req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    const { tags } = req.query;
    try {
      const items = await itemsService.getItems({ tags });
      // throw new Error("Error getting items");
      res.status(200).json({
        data: items,
        message: 'items listed'
      });
    } catch (error) {
      next(error);
    }
  });

  // Obtener item por id
  router.get(
    '/:itemId',
    validationHandler(joi.object({ itemId: itemIdSchema }), 'params'),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { itemId } = req.params;
      try {
        const items = await itemsService.getItem({ itemId });
        res.status(200).json({
          data: items,
          message: 'items retrieved'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  // create
  router.post('/', validationHandler(joi.object(createItemSchema)), async function(
    req,
    res,
    next
  ) {
    const { body: item } = req;
    try {
      const createdItemId = await itemsService.createItem({ item });
      res.status(201).json({
        data: createdItemId,
        message: 'item created'
      });
    } catch (error) {
      next(error);
    }
  });

  // PUT - actualizar
  router.put(
    '/:itemId',
    validationHandler(joi.object({ itemId: itemIdSchema }), 'params'),
    validationHandler(joi.object(updateItemSchema)),
    async function(req, res, next) {
      const { itemId } = req.params;
      const { body: item } = req;
      try {
        const updatedItemId = await itemsService.updateItem({
          itemId,
          item
        });
        res.status(200).json({
          data: updatedItemId,
          message: 'item updated'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  // delete
  router.delete(
    '/:itemId',
    validationHandler(joi.object({ itemId: itemIdSchema }), 'params'),
    async function(req, res, next) {
      const { itemId } = req.params;
      try {
        const deleteItemId = await itemsService.deletedItem({ itemId });
        res.status(200).json({
          data: deleteItemId,
          message: 'items deleted'
        });
      } catch (error) {
        next(error);
      }
    }
  );
}
// Ahora tenemos que exportarla, porque aquí estamos definiendo la ruta pero no la estamos usando
// en nuestra aplicación de express

module.exports = itemsApi;
