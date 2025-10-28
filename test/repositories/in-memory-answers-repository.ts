import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = [];

  async create(Answer: Answer) {
    this.items.push(Answer);
  }

  async delete(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id);

    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) {
      return null;
    }

    return answer;
  }

   async findManyByQuestionId(questionId: string, {page}: PaginationParams) {
      const answers = this.items
        .filter(item => item.questionId.toString() === questionId )
        .slice((page - 1) * 20, page * 20);

      return answers;
  }

  async save(answer: Answer) {
     const index = this.items.findIndex((item) => item.id === answer.id);
        
      this.items[index] = answer
  }
}
    
