import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionAttachmentRepository } from "@/domain/forum/application/repositories/question-attachment-repository";
import { QuestionRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepository implements QuestionRepository {
    public items: Question[] = [];

    constructor(private questionAttachmentsRepository: QuestionAttachmentRepository){}

    async create(question: Question) {
        this.items.push(question);
    }

      async findBySlug(slug: string) {
        const question = this.items.find((item) => item.slug.value === slug);

        if (!question) {
            return null
        }
        
        return question 
    }

    async findManyRecent({page} : PaginationParams) {
        const questions = this.items
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice((page - 1) * 20, page * 20)

            return questions

    }


    async findById(id: string) {
        const question = this.items.find((item) => item.id.toString() === id);

        if(!question){
            return null
        }

        return question
    }

    async delete(question: Question) {
        const index = this.items.findIndex((item) => item.id === question.id);
        
        if (index !== -1) {
            this.items.splice(index, 1);
        }
        console.log('index',index)

         this.questionAttachmentsRepository.deleteManyByQuestionId(question.id.toString())
    }

     async save(question: Question) {
        const index = this.items.findIndex((item) => item.id === question.id);
        
        this.items[index] = question
    }
}
    
