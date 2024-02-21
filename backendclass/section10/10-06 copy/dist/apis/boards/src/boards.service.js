"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
let BoardsService = class BoardsService {
    findAll() {
        const result = [
            {
                number: 1,
                writer: '철수',
                title: '제목입니다',
                contents: '내용입니다',
            },
            {
                number: 2,
                writer: '영희',
                title: '영희입니다',
                contents: '내용입니다',
            },
            {
                number: 3,
                writer: '민지',
                title: '민지입니다',
                contents: '내용입니다',
            },
        ];
        return result;
    }
    create({ createBoardInput }) {
        console.log(createBoardInput.writer);
        console.log(createBoardInput.title);
        console.log(createBoardInput.contents);
        return '게시물 등록 성공';
    }
};
exports.BoardsService = BoardsService;
exports.BoardsService = BoardsService = __decorate([
    (0, common_1.Injectable)()
], BoardsService);
//# sourceMappingURL=boards.service.js.map