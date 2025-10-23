import { QuestionRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepository implements QuestionRepository {
    public items: Question[] = [];

    async create(question: Question) {
        this.items.push(question);
    }

      async findBySlug(slug: string): Promise<Question | null> {
        const question = this.items.find((item) => item.slug.value === slug);

        if (!question) {
            return null
        }
        
        return question 
    }

    async findById(id: string): Promise<Question | null> {
        const question = this.items.find((item) => item.id.toString() === id);

        if(!question){
            return null
        }

        return question
    }

    async delete(question: Question): Promise<void> {
        const index = this.items.findIndex((item) => item.id === question.id);
        
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }
}
    
