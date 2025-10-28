import { AnswerRepository } from "../repositories/answer-repository"
import { Question } from "../../enterprise/entities/question"
import { QuestionRepository } from "../repositories/questions-repository"
import { Q } from "@faker-js/faker/dist/airline-CLphikKp"

interface ChooseQuestionBestAnswerUseCaseRequest {
   answerId: string
   authorId: string
}

interface ChooseQuestionBestAnswersUseCaseResponse {
    question: Question
}

export class ChooseQuestionBestAnswerUseCase{
    constructor(
        private answerRepository: AnswerRepository,
        private questionRepository: QuestionRepository
    ){}

    async execute({answerId, authorId}: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswersUseCaseResponse> {
     
        const answer = await this.answerRepository.findById(answerId)

        if(!answer) {
            throw new Error('Answer Not Found')
        }

        const question = await this.questionRepository.findById(answer.questionId.toValue())

        if(!question) {
            throw new Error('Question Not Found')
        }

        if(authorId !== question.authorId.toValue()){
             throw new Error('Not allowed.')
        }

        question.bestAnswerId = answer.id

        await this.questionRepository.save(question)

        return {
             question
        }
    }
}