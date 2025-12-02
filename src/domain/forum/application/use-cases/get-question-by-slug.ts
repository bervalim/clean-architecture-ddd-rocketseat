
import { Either, left, right } from "@/core/either";
import { QuestionRepository } from "../repositories/questions-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { Question } from "../../enterprise/entities/question";


interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<ResourceNotFoundError, { question: Question }>
export class GetQuestionBySlugUseCase{
    constructor(private questionsRepository: QuestionRepository){}

    async execute({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
        const question = await this.questionsRepository.findBySlug(slug)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        return right({ question })
    }
}