import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepository implements AnswerRepository {
    public items: Answer[] = [];

    async create(Answer: Answer) {
        this.items.push(Answer);
    }
}
    
