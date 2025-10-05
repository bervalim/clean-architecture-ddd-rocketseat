import { UniqueEntityId } from "@/core/entities/unique-entity-id" 
import { AnswerRepository } from "../repositories/answer-repository"
import { Answer } from "../../enterprise/entities/answer"

interface AnswerQuestionUseCaseRequest {
    instructorId: string
    questionId: string,
    content: string
}

export class AnswerQuestionsUseCase{
    constructor(private answerRepository: AnswerRepository){}

    async execute({ instructorId, questionId, content}: AnswerQuestionUseCaseRequest) {
        const answer =  Answer.create({content, authorId: new UniqueEntityId(instructorId), questionId: new UniqueEntityId(questionId)})

        await this.answerRepository.create(answer)

        return answer
    }
}