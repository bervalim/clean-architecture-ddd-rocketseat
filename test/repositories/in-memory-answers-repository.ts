import { DomainEvents } from "@/core/events/domain-events";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerAttachmentRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = [];

  constructor(private answerAttachmentesRepository: AnswerAttachmentRepository){}
  

  async create(answer: Answer) {
    this.items.push(answer);
    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id);

    if (index !== -1) {
      this.items.splice(index, 1);
    }

    this.answerAttachmentesRepository.deleteManyByAnswerId(answer.id.toString())
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

      DomainEvents.dispatchEventsForAggregate(answer.id)

    
  }
}
    
