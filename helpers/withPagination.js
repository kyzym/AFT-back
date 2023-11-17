import {
  DEFAULT_LIMIT_PER_PAGE,
  DEFAULT_PAGE,
  MAX_LIMIT_PER_PAGE,
} from '../constants/paginationSettings.js';

export const withPagination = async (findQuery, reqQuery) => {
  const { limit = DEFAULT_LIMIT_PER_PAGE, page = DEFAULT_PAGE } = reqQuery;
  const pageLimit =
    parseInt(limit) > MAX_LIMIT_PER_PAGE ? MAX_LIMIT_PER_PAGE : parseInt(limit);

  const [result, totalDocuments] = await Promise.all([
    findQuery
      .limit(pageLimit)
      .skip((page - 1) * pageLimit)
      .exec(),
    findQuery.model.countDocuments(findQuery.getFilter()).exec(),
  ]);

  return [
    result,
    {
      limit: pageLimit,
      page,
      totalPages: Math.ceil(totalDocuments / pageLimit),
    },
  ];
};
