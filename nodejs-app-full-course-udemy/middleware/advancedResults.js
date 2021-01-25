const advancedResults = (model, populate) => async (req, res, next) => {

	// Filterting by - advacned querying.
    // e.g. {{URL}}/api/v1/bootcamps?location.city=Boston&avgCost[lte]=10000&careers[in]=Business
    const reqQuery = {...req.query}; // Copy req.query in obj.
    const removeFileds = ['select','sort','page','limit']; // Use these keywords but don't match data.
          removeFileds.forEach(param => delete reqQuery[param]); // Loop over removeFields and delete them from reqQuery.

    let query,
        queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)/g, match => `$${match}`);
        query = model.find(JSON.parse(queryStr));

    // Selecting fields - advacned querying.
    // e.g. {{URL}}/api/v1/bootcamps?select=name,desription
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // Sorting - advacned querying.
    // e.g. {{URL}}/api/v1/bootcamps?select=name&sort=name
    // e.g. {{URL}}/api/v1/bootcamps?select=name&sort=-name (reverse)
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else { // Default sort.
        query = query.sort('-createdAt');
    }

    // Pagination - advacned querying.
    // e.g. {{URL}}/api/v1/bootcamps?select=name&page=2&limit=2
    const total = await model.countDocuments();
    const page = parseInt(req.query.page, 10) || 1; // or page 1 by default
    const limit = parseInt(req.query.limit, 10) || 10 // or 10 by default 
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    query = query.skip(startIndex).limit(limit);

    const pagination = {}

    if (endIndex < total) { // Previous page linkage.
        pagination.next = {
            page: page + 1,
            limit: limit
        }
    } 

    if (startIndex > 0) { // Next page linkage.
        pagination.prev = {
            page: page - 1,
            limit: limit
        }
    }

    if (populate) {
    	query = query.populate(populate);
    }

    const results = await query;

    res.advancedResults = {
    	succcess: true,
    	count: results.length,
    	pagination: pagination,
    	data: results
    }

    next();
};

module.exports = advancedResults;