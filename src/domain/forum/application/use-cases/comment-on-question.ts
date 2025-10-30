
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionRepository } from "../repositories/questions-repository";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentRepository } from "../repositories/question-comment-repository";


interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
    questionComment: QuestionComment
}

export class CommentOnQuestionUseCase{
    constructor(
        private questionsRepository: QuestionRepository,
        private questionCommentsRepository: QuestionCommentRepository
    ){}

    async execute({ authorId, questionId, content}: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
        const question = await this.questionsRepository.findById(questionId)

        if(!question){
            throw new Error('Question not found.')
        }

        const questionComment = QuestionComment.create({
            authorId: new UniqueEntityId(authorId),
            questionId: new UniqueEntityId(questionId),
            content
        })

        await this.questionCommentsRepository.create(questionComment)

        return {
            questionComment
        }

    }
}