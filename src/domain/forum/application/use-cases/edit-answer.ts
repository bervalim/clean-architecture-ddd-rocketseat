import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepository } from "../repositories/answer-repository";
import { AnswerAttachmentRepository } from "../repositories/answer-attachments-repository";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachements-list";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";


interface EditAnswerUseCaseRequest {
  authorId: string
  content: string
  answerId: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { answer: Answer}>
    
export class EditAnswerUseCase{
    constructor(
        private answerRepository: AnswerRepository,
        private answerAttachmentRepository: AnswerAttachmentRepository
    ){}

    async execute({ authorId, content, answerId, attachmentsIds}: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
        const answer = await this.answerRepository.findById(answerId)

        if(!answer){
            return left(new ResourceNotFoundError())
        }

        if(authorId !== answer.authorId.toString()){
            return left(new NotAllowedError())
        }

        const currentAnswerAttachment = 
        await this.answerAttachmentRepository.findManyByAnswerId(answerId)

        const answerAttachmentList = new AnswerAttachmentList(currentAnswerAttachment)

        const answerAttachments = attachmentsIds.map(id => {
            return AnswerAttachment.create({
                attachmentId: new UniqueEntityId(id),
                answerId: answer.id
            })
        })
                
        answerAttachmentList.update(answerAttachments)

        answer.content = content
        answer.attachments = answerAttachmentList

        await this.answerRepository.save(answer)

        return right({ answer })
    }
}