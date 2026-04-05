import * as productService from '../service/index.js';
export const getProducts = (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 10;
    productService.getProduct(page, limit).then(products => {
        res.json(products);
    }).catch(err => {
        res.status(404).json({ error: err.message });
    }); 
}