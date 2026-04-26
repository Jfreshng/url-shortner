import { Router } from "express";
import { deleteUrlByIdCont, getUrls, getUrlByIdCont, shortenUrController, updateUrlRecord, getUrlRecordByShortId, getRecordsCountsGTE, clickUrl, clickUrlCustomTimes } from "../controllers/url.controller.js";

const urlRouter = Router();


/**
 * @openapi
 * /api/url:
 *   get:
 *     summary: Get all shortened URLs
 *     description: Returns a list of all URL records in the system
 *     tags:
 *       - URL
 *
 *     responses:
 *       200:
 *         description: Successfully retrieved all URLs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: URLs retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Url'
 */
urlRouter.get('/', getUrls);

/**
 * @openapi
 * /api/url/{id}:
 *   get:
 *     summary: Get URL by ID
 *     description: Returns a single URL record by its database ID
 *     tags:
 *       - URL
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The URL record ID
 *         schema:
 *           type: integer
 *           example: 1
 *
 *     responses:
 *       200:
 *         description: URL retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: URL retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Url'
 *
 *       404:
 *         description: URL not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Record not found
 */
urlRouter.get('/:id', getUrlByIdCont);

/**
 * @openapi
 * /api/url/getByShortUrlId/{shortId}:
 *   get:
 *     summary: Get URL by Short ID
 *     description: Returns a URL record using its short ID/code
 *     tags:
 *       - URL
 *
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         description: The short URL identifier
 *         schema:
 *           type: string
 *           example: abc123
 *
 *     responses:
 *       200:
 *         description: URL retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: URL retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Url'
 *
 *       404:
 *         description: URL not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Short URL not found
 */
urlRouter.get('/getByShortUrlId/:shortId', getUrlRecordByShortId);

/**
 * @openapi
 * /api/url/clicks/{count}:
 *   get:
 *     summary: Get URLs with click count greater than or equal to a value
 *     description: Returns all shortened URLs where clickCount is >= the provided value
 *     tags:
 *       - URL
 *
 *     parameters:
 *       - in: path
 *         name: count
 *         required: true
 *         description: Minimum click count filter
 *         schema:
 *           type: integer
 *           example: 10
 *
 *     responses:
 *       200:
 *         description: Successfully retrieved records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Data retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Url'
 *
 *       400:
 *         description: Invalid parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid count parameter
 */
// urlRouter.get('/getUrlByCount/:count', getRecordsCountsGTE)
urlRouter.get('/clicks/:count', getRecordsCountsGTE)

/**
 * @openapi
 * /api/url/:
 *   post:
 *     summary: Create a short URL
 *     tags:
 *       - URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - originalUrl
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 example: https://x.com
 *     responses:
 *       201:
 *         description: URL created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
urlRouter.post('/', shortenUrController)

/**
 * @openapi
 * /api/url/:
 *   put:
 *     summary: Update a URL
 *     tags:
 *       - URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                type: number
 *               originalUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 */
// urlRouter.put('/:shortId', updateUrlRecord)
urlRouter.put('/', updateUrlRecord);

/**
 * @openapi
 * /api/url/{id}:
 *   delete:
 *     summary: Delete a URL
 *     tags:
 *       - URL
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
urlRouter.delete('/:id', deleteUrlByIdCont);

/**
 * @openapi
 * /api/url/click/{id}:
 *   put:
 *     summary: Increment click count for a URL
 *     tags:
 *       - URL
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the URL to increment clicks for
 *     responses:
 *       200:
 *         description: Click successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: Click Successful
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request
 */
urlRouter.put('/click/:id', clickUrl);

/**
 * @openapi
 * /api/url/click/custom:
 *   patch:
 *     summary: Increment click count by custom number of times
 *     tags:
 *       - URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               clicks:
 *                 type: integer
 *                 example: 5
 *             required:
 *               - id
 *               - clicks
 *     responses:
 *       200:
 *         description: Click successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: Click Successful
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request
 */
urlRouter.patch('/click/custom', clickUrlCustomTimes);

export default urlRouter;