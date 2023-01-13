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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const author_entity_1 = __importDefault(require("../../entities/author.entity"));
const errors_1 = require("../../errors");
const author_1 = require("../../schemas/author");
const createAuthorService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const authorRepo = data_source_1.default.getRepository(author_entity_1.default);
    if (yield authorRepo.findOne({ where: { email: payload.email } })) {
        throw new errors_1.AppError("Author already exists", 409);
    }
    const author = authorRepo.create(payload);
    yield authorRepo.save(author);
    const authorWithoutPassword = yield author_1.createAuthorReturnSchema.validate(author, {
        stripUnknown: true,
    });
    return authorWithoutPassword;
});
exports.default = createAuthorService;
//# sourceMappingURL=createAuthor.service.js.map