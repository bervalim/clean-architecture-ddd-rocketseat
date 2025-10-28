import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepository } from "../repositories/answer-repository";
import { QuestionRepository } from "../repositories/questions-repository";


interface EditAnswerUseCaseRequest {
  authorId: string
  content: string
  answerId: string
}

interface EditAnswerUseCaseResponse {
    answer: Answer
}
    
export class EditAnswerUseCase{
    constructor(private answerRepository: AnswerRepository){}

    async execute({ authorId, content, answerId}: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
        const answer = await this.answerRepository.findById(answerId)

        if(!answer){
            throw new Error('answer not found.')
        }

        if(authorId !== answer.authorId.toString()){
            throw new Error('Not allowed.')
        }

        answer.content = content

        await this.answerRepository.save(answer)

        return {
            answer
        }
    }
}