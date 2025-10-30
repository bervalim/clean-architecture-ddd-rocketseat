
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerRepository } from "../repositories/answer-repository";
import { AnswerCommentRepository } from "../repositories/answer-comment-repository";


interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
    answerComment: AnswerComment
}

export class CommentOnAnswerUseCase{
    constructor(
        private answerRepository: AnswerRepository,
        private answerCommentsRepository: AnswerCommentRepository
    ){}

    async execute({ authorId, answerId, content}: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
        const answer = await this.answerRepository.findById(answerId)

        if(!answer){
            throw new Error('Question not found.')
        }

        const answerComment = AnswerComment.create({
            authorId: new UniqueEntityId(authorId),
            answerId: new UniqueEntityId(answerId),
            content
        })

        await this.answerCommentsRepository.create(answerComment)

        return {
            answerComment
        }

    }
}