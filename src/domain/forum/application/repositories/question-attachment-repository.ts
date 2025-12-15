
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";

export interface QuestionAttachmentRepository {
  findManyByQuestionId(answerId: string): Promise<QuestionAttachment[]>
}
