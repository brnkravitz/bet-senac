const paginate = async (
    model,
    page = 1,
    pageSize = 10,
    where = {},
    order = [['createdAt', 'ASC']]
) => {
    const offset = (page - 1) * pageSize;

    // Query the database
    const { count, rows } = await model.findAndCountAll({
        where,
        limit: pageSize,
        offset,
        order,
    });

    const totalPages = Math.ceil(count / pageSize);

    // Return the data and pagination metadata
    return {
        data: rows,
        pagination: {
            currentPage: page,
            pageSize,
            totalItems: count,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        },
    };
}

module.exports = { paginate }