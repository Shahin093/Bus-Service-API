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
exports.BusBookingService = void 0;
const PaginationHelper_1 = require("../../../helpers/PaginationHelper");
const busBooking_model_1 = __importDefault(require("./busBooking.model"));
const busBooking_constant_1 = require("./busBooking.constant");
const busSlot_model_1 = __importDefault(require("../busSlot/busSlot.model"));
// bus - 655f1baf055ea2f8c1f1b8a8
// user -
const createBusBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    console.log("today", today.toISOString().slice(0, 10).slice(0, 10));
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const todayBookingSeat = yield busSlot_model_1.default.find({
        slot: payload.destination,
        todayDate: today.toISOString().slice(0, 10).slice(0, 10),
    });
    const busSeatData = {
        bus: payload.bus,
        seat: payload.seat,
        slot: payload.destination,
        todayDate: today.toISOString().slice(0, 10).slice(0, 10),
    };
    if (todayBookingSeat.length > 0) {
        // if you already booking , so you can update
        const oldSeat = todayBookingSeat[0].seat;
        const newSeat = payload.seat;
        yield busSlot_model_1.default.findByIdAndUpdate({ _id: todayBookingSeat[0]._id }, { seat: [...oldSeat, ...newSeat] }, {
            new: true,
        });
    }
    else {
        // if you already booking , so you can create
        yield busSlot_model_1.default.create(busSeatData);
    }
    const result = (yield (yield busBooking_model_1.default.create(payload)).populate("user")).populate("bus");
    return result;
});
const getAllBusesBooking = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: busBooking_constant_1.busBookingSearchableFields.map((field) => ({
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
    const result = yield busBooking_model_1.default.find(whereConditions)
        .populate("manager")
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield busBooking_model_1.default.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBusBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield busBooking_model_1.default.findById({ _id: id }).populate("manager");
    return result;
});
const updateBusBooking = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield busBooking_model_1.default.findByIdAndUpdate({ _id: id }, payload);
    return result;
});
const deleteBusBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield busBooking_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.BusBookingService = {
    createBusBooking,
    getAllBusesBooking,
    getSingleBusBooking,
    updateBusBooking,
    deleteBusBooking,
};
