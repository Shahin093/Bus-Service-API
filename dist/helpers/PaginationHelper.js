"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const calculatePagination = (options) => {
    const page = Number((options === null || options === void 0 ? void 0 : options.page) || 1);
    const limit = Number((options === null || options === void 0 ? void 0 : options.limit) || 10);
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || "createAt";
    const sortOrder = (options === null || options === void 0 ? void 0 : options.sortOrder) || "desc";
    const minPrice = options.minPrice;
    const maxPrice = options.maxPrice;
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
        minPrice,
        maxPrice,
    };
};
exports.paginationHelper = {
    calculatePagination,
};
