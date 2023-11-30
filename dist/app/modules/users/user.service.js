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
exports.UserService = void 0;
const PaginationHelper_1 = require("../../../helpers/PaginationHelper");
const user_model_1 = __importDefault(require("./user.model"));
const user_constant_1 = require("./user.constant");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(payload);
    return result;
});
const getAllUser = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: user_constant_1.userSearchableFields.map((field) => ({
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
    const result = yield user_model_1.default.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield user_model_1.default.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findById(id);
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.default.findOne({ _id: id });
    if (!isExist) {
        console.log("User not found!");
    }
    const { name } = payload, userData = __rest(payload, ["name"]);
    const updateUserData = Object.assign({}, userData);
    // dynamically handle
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updateUserData[nameKey] = name[key];
        });
    }
    const result = yield user_model_1.default.findOneAndUpdate({ _id: id }, updateUserData, {
        new: true,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findByIdAndDelete(id);
    return result;
});
const getMyProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findById({ _id: id });
    return result;
});
const updateMyProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.default.findOne({ _id: id });
    if (!isExist) {
        console.log("User not found!");
    }
    const { name } = payload, userData = __rest(payload, ["name"]);
    const updateUserData = Object.assign({}, userData);
    // dynamically handle
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updateUserData[nameKey] = name[key];
        });
    }
    const result = yield user_model_1.default.findOneAndUpdate({ _id: id }, updateUserData, {
        new: true,
    });
    return result;
});
exports.UserService = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    getMyProfile,
    updateMyProfile,
};
