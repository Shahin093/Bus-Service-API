"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusService = void 0;
const PaginationHelper_1 = require("../../../helpers/PaginationHelper");
const manageBus_constant_1 = require("./manageBus.constant");
const manageBus_model_1 = __importDefault(require("./manageBus.model"));
const createBus = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield manageBus_model_1.default.create(payload)).populate("manager");
    return result;
});
const getAllBuses = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: manageBus_constant_1.busSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = PaginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = (andCondition === null || andCondition === void 0 ? void 0 : andCondition.length) > 0 ? { $and: andCondition } : {};
    const result = yield manageBus_model_1.default.find(whereConditions)
        .populate("manager")
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield manageBus_model_1.default.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield manageBus_model_1.default.findById({ _id: id }).populate("manager");
    return result;
});
const updateBus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield manageBus_model_1.default.findByIdAndUpdate({ _id: id }, payload);
    return result;
});
const deleteBus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield manageBus_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.BusService = {
    createBus,
    getAllBuses,
    getSingleBus,
    updateBus,
    deleteBus,
};
