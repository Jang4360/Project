import { BoardsService } from './boards.service';
import { Board } from '../entities/board.entity';
import { CreateBoardInput } from '../dto/create-board.input';
export declare class BoardsResolver {
    private readonly boardService;
    constructor(boardService: BoardsService);
    fetchBoards(): Board[];
    createBoard(createBoardInput: CreateBoardInput): string;
}
