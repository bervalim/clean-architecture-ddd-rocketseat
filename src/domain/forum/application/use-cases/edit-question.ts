import { Either, left, right } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import { QuestionRepository } from "../repositories/questions-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { QuestionAttachmentRepository } from "../repositories/question-attachment-repository";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";


interface EditQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  questionId: string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse  = Either<ResourceNotFoundError | NotAllowedError, { question: Question}>
    
export class EditQuestionUseCase{
    constructor(
      private questionsRepository: QuestionRepository,
      private questionAtachmentRepository: QuestionAttachmentRepository
    ){}

    async execute({ authorId, title, content, questionId, attachmentsIds}: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
        const question = await this.questionsRepository.findById(questionId)

        if(!question){
             return left(new ResourceNotFoundError())
        }

        if(authorId !== question.authorId.toString()){
              return left(new NotAllowedError())
        }

        const currentQuestionAttachment = 
        await this.questionAtachmentRepository.findManyByQuestionId(questionId)

        const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachment)

        const questionAttachments = attachmentsIds.map(id => {
            return QuestionAttachment.create({
                attachmentId: new UniqueEntityId(id),
                questionId: question.id
            })
        })
        
        questionAttachmentList.update(questionAttachments)

        question.title = title
        question.content = content
        question.attachments = questionAttachmentList

        await this.questionsRepository.save(question)

        return right({ question })
    }
}