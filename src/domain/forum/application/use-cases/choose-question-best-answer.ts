import { AnswerRepository } from "../repositories/answer-repository"
import { Question } from "../../enterprise/entities/question"
import { QuestionRepository } from "../repositories/questions-repository"
import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"


interface ChooseQuestionBestAnswerUseCaseRequest {
   answerId: string
   authorId: string
}

type ChooseQuestionBestAnswersUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question } >

export class ChooseQuestionBestAnswerUseCase{
    constructor(
        private answerRepository: AnswerRepository,
        private questionRepository: QuestionRepository
    ){}

    async execute({answerId, authorId}: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswersUseCaseResponse> {
     
        const answer = await this.answerRepository.findById(answerId)

        if(!answer) {
           return left(new ResourceNotFoundError())
        }

        const question = await this.questionRepository.findById(answer.questionId.toValue())

        if(!question) {
             return left(new ResourceNotFoundError())
        }

        if(authorId !== question.authorId.toValue()){
              return left(new NotAllowedError())
        }

        question.bestAnswerId = answer.id

        await this.questionRepository.save(question)

        return right({
             question
        })
    }
}