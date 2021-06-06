const joi = require('@hapi/joi');

// llamamos join.string para indicar que es un string
/**
 * llamamos regex porque los ids de mongodb tienen cierta estructura y es una muy buena
 * forma de validarlo mediante un regex, porque son una collection de caracteres alphanumericos
 * que tienen un minimo de 24 caracteres.
 * 
 * /^[0-9]: inicia con cualquiera de los caracteres alphanumericos del 0 al 9
 * /^[0-9a-fA-F]: de la a minuscula a la f minuscula, y de la A mayuscula a la F mayúscula
 * /^[0-9a-fA-F]{24}$/: puede tener un tamaño de 24 y así es com debe terminar.
 */

const itemIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const itemTitleSchema = joi.string().max(80);
const itemYeartSchema = joi.number().min(1888).max(2077);
const itemImageSchema = joi.string().uri();
const itemDescriptionSchema = joi.string().max(300);
const itemSourceSchema = joi.string().uri();
const itemTagsSchema = joi.array().items(joi.string().max(50))

const createItemSchema = {
  title: itemTitleSchema.required(),
  year: itemYeartSchema.required(),
  image: itemImageSchema.required(),
  description: itemDescriptionSchema.required(),
  source: itemSourceSchema.required(),
  tags: itemTagsSchema
};

// Solo vamos a actualizar una parte de la pelicula
const updateItemSchema = {
  title: itemTitleSchema,
  year: itemYeartSchema,
  image: itemImageSchema,
  description: itemDescriptionSchema,
  source: itemSourceSchema,
  tags: itemTagsSchema
};

module.exports = {
  itemIdSchema,
  createItemSchema,
  updateItemSchema
}