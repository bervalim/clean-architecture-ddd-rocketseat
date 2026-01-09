import { UniqueEntityId } from "@/core/entities/unique-entity-id" 
import { AnswerRepository } from "../repositories/answer-repository"
import { Answer } from "../../enterprise/entities/answer"
import { Either, right } from "@/core/either"
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment"
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachements-list"

interface AnswerQuestionUseCaseRequest {
    instructorId: string
    questionId: string,
    content: string,
    attachmentsIds: string[]
}

type AnswerQuestionUseCaseResponse = Either<null, {answer: Answer}>


export class AnswerQuestionsUseCase{
    constructor(private answerRepository: AnswerRepository){}

    async execute({ instructorId, questionId, content, attachmentsIds}: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
        const answer =  Answer.create({content, authorId: new UniqueEntityId(instructorId), questionId: new UniqueEntityId(questionId)})

         const anserAttachments = attachmentsIds.map(id => {
            return AnswerAttachment.create({
                attachmentId: new UniqueEntityId(id),
                answerId: answer.id
            })
        })

        answer.attachments = new AnswerAttachmentList(anserAttachments)
        

        await this.answerRepository.create(answer)

        return right({
            answer
        })
    }
}