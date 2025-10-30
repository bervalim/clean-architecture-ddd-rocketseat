import { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comment-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentRepository implements QuestionCommentRepository {
  public items: QuestionComment[] = [];

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment);
  }

  async findById(id: string) {
    const questionComment = this.items.find(
      (item) => item.id.toString() === id
    );

    if (!questionComment) {
      return null;
    }

    return questionComment;
  }

  async delete(questionComment: QuestionComment) {
    const index = this.items.findIndex((item) => item.id === questionComment.id);

    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
    
